import {Request, Response} from "express";
import {Server} from "socket.io";

/**
 * @file Declares API for messages resource
 */
export default interface MessageServiceI {
    findAllMessages (req: Request, res: Response): void;
    userSendsMessage (req: Request, res: Response, io: Server): void;
    userDeletesMessage (req: Request, res: Response): void;
    userUpdatesMessage (req: Request, res: Response): void;
    findMessageById (req: Request, res: Response): void;
    findAllMessagesBetweenSpecificUsers (req: Request, res: Response): void;
    userSendsBroadcastMessage (req: Request, res: Response, socketIoServer: Server): void;
};

