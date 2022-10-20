import {Request, Response} from "express";

/**
 * @file Declares API for tuits resource
 */
export default interface TuitControllerI {
    findTuits (req: Request, res: Response): void;
    findTuitsByUser (req: Request, res: Response): void;
    findTuitById (req: Request, res: Response): void;
    createTuitByUser (req: Request, res: Response): void;
    updateTuit (req: Request, res: Response): void;
    deleteTuit (req: Request, res: Response): void;
};