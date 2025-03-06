import axios from 'axios';

type LanguageId = 63 | 71 | 62 | 54 | 51 | 50;

interface JudgeSubmission {
  source_code: string;
  language_id: LanguageId;
  stdin?: string;
  expected_output?: string;
}

interface JudgeResponse {
  token: string;
}

interface JudgeResult {
  status: {
    id: number;
    description: string;
  };
  stdout: string | null;
  stderr: string | null;
  compile_output: string | null;
  message: string | null;
  time: string;
  memory: number;
}

// Constants
const JUDGE_API_URL = process.env.JUDGE0_API_URL || 'https://judge0-ce.p.rapidapi.com';
const JUDGE_API_KEY = process.env.JUDGE0_API_KEY || '';
const JUDGE_HEADERS = {
  'Content-Type': 'application/json',
  'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
  'X-RapidAPI-Key': JUDGE_API_KEY
};

const LANGUAGE_MAP: Record<string, LanguageId> = {
  javascript: 63,
  python: 71,
  java: 62,
  cpp: 54,
  csharp: 51,
  c: 50
};

const encodeBase64 = (str: string): string => Buffer.from(str).toString('base64');

const decodeBase64 = (str: string | null): string | null => 
  str ? Buffer.from(str, 'base64').toString() : null;

export const createSubmission = async (code: string, language: string, input?: string): Promise<string> => {
  const languageId = LANGUAGE_MAP[language];
  
  if (!languageId) {
    throw new Error(`Unsupported language: ${language}`);
  }

  const submission: JudgeSubmission = {
    source_code: encodeBase64(code),
    language_id: languageId
  };

  if (input) {
    submission.stdin = encodeBase64(input);
  }

  try {
    const response = await axios.post<JudgeResponse>(
      `${JUDGE_API_URL}/submissions?base64_encoded=true&wait=false`, 
      submission,
      { headers: JUDGE_HEADERS }
    );
    
    return response.data.token;
  } catch (error) {
    console.error('Error creating submission:', error);
    throw new Error('Failed to submit code for execution');
  }
};

export const getSubmissionResult = async (token: string): Promise<JudgeResult> => {
  try {
    const response = await axios.get<JudgeResult>(
      `${JUDGE_API_URL}/submissions/${token}?base64_encoded=true`,
      { headers: JUDGE_HEADERS }
    );
    
    const result = response.data;
    
    return {
      ...result,
      stdout: decodeBase64(result.stdout),
      stderr: decodeBase64(result.stderr),
      compile_output: decodeBase64(result.compile_output)
    };
  } catch (error) {
    console.error('Error getting submission result:', error);
    throw new Error('Failed to get code execution result');
  }
};

export const executeCode = async (code: string, language: string, input: string): Promise<JudgeResult> => {
  
  const token = await createSubmission(code, language, input);
  
  let result: JudgeResult | null = null;
  let attempts = 0;
  const maxAttempts = 10;
  
  while (!result && attempts < maxAttempts) {

    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const submissionResult = await getSubmissionResult(token);
    
    if (submissionResult.status.id <= 2) {
      attempts++;
      continue;
    }
    
    result = submissionResult;
  }
  
  if (!result) {
    throw new Error('Timed out waiting for code execution result');
  }
  
  return result;
};

export const testCode = async (
  code: string, 
  language: string, 
  testCases: Array<{ input: string, expectedOutput: string }>
): Promise<Array<{ passed: boolean, output: string | null, error: string | null }>> => {
  return Promise.all(
    testCases.map(async (testCase) => {
      try {
        const result = await executeCode(code, language, testCase.input);
        
        const output = result.stdout?.trim() || '';
        const passed = output === testCase.expectedOutput.trim();
        
        return {
          passed,
          output,
          error: result.stderr || result.compile_output || null
        };
      } catch (error) {
        return {
          passed: false,
          output: null,
          error: error instanceof Error ? error.message : 'Unknown error'
        };
      }
    })
  );
};