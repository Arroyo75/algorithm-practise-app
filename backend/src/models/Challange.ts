import mongoose, { Document } from 'mongoose';
import { Challange } from '../types/challange';

export interface ChallangeDocument extends Challange, Document {}

const challangeSchema = new mongoose.Schema<ChallangeDocument>({
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

export default mongoose.model<ChallangeDocument>('Challange', challangeSchema);