import { Request, Response } from 'express';
import { executeCode } from '../services/judgeService';
import Challenge from '../models/Challenge';

export const runCode = async (req: Request, res: Response) => {
  try {
    const { challengeId, code, language } = req.body;
    
    if (!challengeId || !code || !language) {
      return res.status(400).json({ 
        success: false, 
        message: 'Missing required fields' 
      });
    }
    
    // Get the challenge to access test cases
    const challenge = await Challenge.findById(challengeId);
    if (!challenge) {
      return res.status(404).json({ 
        success: false, 
        message: 'Challenge not found' 
      });
    }
    
    // Get the visible test cases
    const testCases = challenge.testCases.filter(test => !test.isHidden);
    
    // Run the code against each test case
    const results = await Promise.all(
      testCases.map(async (testCase, index) => {
        try {
          const result = await executeCode(
            code,
            language,
            testCase.input
          );
          
          // Determine if the test passed
          const output = result.stdout ? result.stdout.trim() : '';
          const passed = output === testCase.expectedOutput.trim();
          
          return {
            testCase: index + 1,
            input: testCase.input,
            expectedOutput: testCase.expectedOutput,
            actualOutput: output,
            passed,
            status: result.status,
            error: result.stderr || result.compile_output || null
          };
        } catch (error) {
          return {
            testCase: index + 1,
            input: testCase.input,
            expectedOutput: testCase.expectedOutput,
            actualOutput: null,
            passed: false,
            status: { id: -1, description: 'Error' },
            error: error instanceof Error ? error.message : 'Unknown error'
          };
        }
      })
    );

    const allPassed = results.every(result => result.passed);
    
    res.json({
      success: allPassed,
      results,
      message: allPassed ? 'All test cases passed!' : 'Some test cases failed'
    });
    
  } catch (error) {
    console.error('Error running code:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error while running code' 
    });
  }
};