import {Request, Response} from "express";

/**
 * @file Declares API for groups resource
 */
export default interface GroupServiceI {
    findAllUserGroups (req: Request, res: Response): void;
    createGroup (req: Request, res: Response): void;
    deleteGroup (req: Request, res: Response): void;
    findGroupById (req: Request, res: Response): void;
    updateGroup (req: Request, res: Response): void;
};
