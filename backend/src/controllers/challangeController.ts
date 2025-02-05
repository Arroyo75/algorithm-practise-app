import { Request, Response } from 'express';
import Challange from '../models/Challange';

export const createChallange = async( req: Request, res: Response) => {
  try {
    const challange = await Challange.create(req.body);
    res.status(201).json({ success: true, data: challange});
  } catch (error) {
    if(error instanceof Error) {
      res.status(400).json({ success: false, message: error.message});
    } else {
      res.status(400).json({ success: false, message: "Unknown error creating challange"});
    }
  }
};

export const getChallanges = async (req: Request, res: Response) => {
  try {
    const { difficulty, search } = req.query;

    const query: any = {};

    if(difficulty) {
      query.difficulty = difficulty;
    }

    if(search) {
      query.title = { $regex: search as string, $options: 'i' };
    }

    const challanges = await Challange.find(query)
      .select('title difficulty')
      .sort({ title: 1 });

    res.status(200).json({success: true, data: challanges});
  } catch (error) {
    if(error instanceof Error) {
      console.log("Error fetching challanges: ", error.message);
    } else {
      console.log("Unknown error fetching challanges.");
    }
    res.status(500).json({ success: false, message: "Server error"})
  }
}