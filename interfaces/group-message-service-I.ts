/**
 * @file Declares API for groupMessages resource
 */

import {Request, Response} from "express";
import {Server} from "socket.io";

export default interface GroupMessageServiceI {
    userSendsGroupMessage (req: Request, res: Response, socketIoServer: Server): void;
    userDeletesGroupMessage (req: Request, res: Response): void;
    findGroupMessageById (req: Request, res: Response): void;
    findAllMessagesBetweenGroup (req: Request, res: Response): void;
};