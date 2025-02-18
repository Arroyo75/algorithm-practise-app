import { Request, Response } from 'express';
import Challenge from '../models/Challenge';

export const createChallenge = async( req: Request, res: Response) => {
  try {
    const challange = await Challenge.create(req.body);
    res.status(201).json({ success: true, data: challange});
  } catch (error) {
    if(error instanceof Error) {
      res.status(400).json({ success: false, message: error.message});
    } else {
      res.status(400).json({ success: false, message: "Unknown error creating challange"});
    }
  }
};

export const getChallenges = async (req: Request, res: Response) => {
  try {
    const { difficulty, search } = req.query;

    const query: any = {};

    if(difficulty) {
      query.difficulty = difficulty;
    }

    if(search) {
      query.title = { $regex: search as string, $options: 'i' };
    }

    const challanges = await Challenge.find(query)
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

export const deleteChallenge = async (req: Request, res: Response) => {
  try {
    const challange = await Challenge.findByIdAndDelete(req.params.id);
    if(!challange)
      return res.status(404).json({ success: false, message: "Challange not found"})
    res.json({ success: true, message: "Challange deleted" });
  } catch (error) {
    if(error instanceof Error) {
      console.log("Error deleting challange: ", error.message);
    } else {
      console.log("Unknown error while deleting messages.");
    }
    res.status(400).json({success: false, message: "Server error"});
  }
}

export const updateChallenge = async (req: Request, res: Response) => {
  try {
    const challange = await Challenge.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if(!challange)
      return res.status(404).json({ success: false, message: "Challange not found"});
    res.status(200).json({ success: true, message: "Challange updated successfully", data: challange });
  } catch (error) {
    if(error instanceof Error) {
      console.log("Error updating Challange: ", error.message);
    } else {
      console.log("Unknown error updating challanges.");
    }
    res.status(400).json({ success: false, message: "Server error"});
  }
}

export const getChallenge = async ( req: Request, res: Response) => {
  try{
    const challenge = await Challenge.findById(req.params.id);
    if(!challenge) {
      return res.status(404).json({ success: false, message: "Challenge not found"});
    }
    res.json({ success: true, data: challenge });
  } catch (error) {
    if(error instanceof Error) {
      console.log("Error fetching challanges: ", error.message);
    } else {
      console.log("Unknown error fetching challanges.");
    }
    res.status(500).json({ success: false, message: "Server error"})
  }
}