import {Request, Response} from "express";
import Story from "../models/stories/story";
import User from "../models/users/user";

/**
 * @file Declares API for Stories resource
 */
export default interface StoryControllerI {
  findStories (req: Request, res: Response): void;
  findStoryById (req: Request, res: Response): void;
  findStoriesByUser (req: Request, res: Response): void;
  findStoriesVisibleToUser (req: Request, res: Response): void;
  createStory (req: Request, res: Response): void;
  deleteStoryByID (req: Request, res: Response): void;
  userDeletesTheirStories (req: Request, res: Response): void;
};