export interface Challenge {
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  description: string;
  testCases: TestCase[];
  starterCode?: Record<string, string>;
}

export interface TestCase {
  input: string;
  expectedOutput: string;
  isHidden: false;
}