import mongoose, { Document } from 'mongoose';
import { Challenge } from '../types/challenge';

export interface ChallengeDocument extends Challenge, Document {}

const challangeSchema = new mongoose.Schema<ChallengeDocument>({
  title: { type: String, requried: true },
  difficulty: {
    type: String ,
    enum: ['Easy', 'Medium', 'Hard'],
    required: true
  },
  description: { type: String, required: true },
  testCases: [{
    input: String,
    expectedOutput: String,
    isHidden: { type: Boolean, default: false }
  }],
  starterCode: {
    type: Map,
    of: String
  }
})

export default mongoose.model<ChallengeDocument>('Challange', challangeSchema);