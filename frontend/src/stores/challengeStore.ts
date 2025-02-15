import { create } from 'zustand';
import { ChallengeStore, Challenge, ApiResponse } from '../types/challenge';

export const useChallengeStore = create<ChallengeStore>((set, get) => ({
  challenges: [],
  search: '',
  difficulty: '',
  currentChallenge: null,
  code: '',
  isLoading: false,
  error: null,
  fetchChallenges: async () => {
    set({ isLoading: true });
    try {
      const { search, difficulty } = get();
      const params =  new URLSearchParams();
      if(search) params.append('search', search);
      if(difficulty) params.append('difficulty', difficulty);
      
      const response = await fetch(`http://localhost:5000/api/challenges?${params}`);
      if(!response.ok) {
        throw new Error('Server response not ok');
      }
      
      const data: ApiResponse<Challenge[]> = await response.json();
      set({ challenges: data.data, isLoading: false, error: null});
    } catch (error) {
      set({
        error: error instanceof Error ? error.message: 'Failed to fetch challenges',
        isLoading: false
      });
    }
  },
  fetchChallenge: async (id) => {
    set({ isLoading: true });
    try {
      const response = await fetch(`http://localhost:5000/api/challenges/${id}`);
      const data = await response.json();
      set({ currentChallenge: data.data, isLoading: false })
    } catch (error) {
      set({ isLoading: false });
      console.error('Error fetching challenges: ', error);
    }
  },
  setSearch: (search) => set({ search }),
  setDifficulty: (difficulty) => set({ difficulty }),
  setCode: (code) => set({ code }),
  submitCode: async (challengeId: string, code: string) => {
    set({ isLoading: true });
    try {
      const response = await fetch('http://localhost:5000/api/submissions/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ challengeId, code })
      });
      const result = await response.json();
      set({ isLoading: false });
      return result;
    } catch (error) {
      set({ error: 'Failed to submit code', isLoading: false });
      throw error;
    }
  }
}));