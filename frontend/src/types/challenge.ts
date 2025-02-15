export interface Challenge {
  _id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  description: string;
  testCases: {
    input: string;
    expectedOutput: string;
    isHidden: boolean;
  }[];
  starterCode?: Record<string, string>;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface ChallengeStore {
  challenges: Challenge[];
  search: string;
  difficulty: string;
  currentChallenge: Challenge | null;
  code: string;
  isLoading: boolean;
  error: string | null;
  fetchChallenges: () => Promise<void>;
  fetchChallenge: (id: string) => Promise<void>;
  setSearch: (search: string) => void;
  setDifficulty: (difficulty: string) => void;
  setCode: (code: string) => void;
  submitCode: (challengeId: string, code: string) => Promise<void>;
}