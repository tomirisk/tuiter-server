/**
 * @file MessageController RESTful Web service API for messages resource
 */
import {Express, Request, Response} from "express";
import MessageService from "../services/message-service";
import {Server} from "socket.io";

/**
 * @class MessageController Implements RESTful Web service API for messages resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>POST /api/users/:uid1/messages/:uid2 to create a new message instance sent by the user</li>
 *     <li>DELETE /api/messages/:mid to delete a message</li>
 *     <li>PUT /api/messages/:mid to modify a message</li>
 *     <li>GET /api/users/:uid1/messages/:uid2 to get all messages sent between users</li>
 *     <li>GET /api/messages/:mid to get single message</li>
 *     <li>POST /api/users/:uid/messages to create a new broadcast message instance sent by the user</li>
 * </ul>
 * @property {MessageService} messageService Singleton service object implementing follows CRUD operations
 * @property {MessageController} messageController Singleton controller implementing
 * RESTful Web service API
 */
export default class MessageController {
    private static messageService: MessageService = MessageService.getInstance();
    private static messageController: MessageController | null = null;

    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service API
     * @param {Server} socketIoServer socket io instance
     * @return MessageController
     */
    public static getInstance = (app: Express, socketIoServer: Server): MessageController => {
        if(MessageController.messageController === null) {
            MessageController.messageController = new MessageController();

            app.post("/api/users/:uid1/messages/:uid2", (req: Request, res: Response) =>
                MessageController.messageService.userSendsMessage(req, res, socketIoServer));
            app.delete("/api/messages/:mid", MessageController.messageService.userDeletesMessage);
            app.put("/api/messages/:mid", MessageController.messageService.userUpdatesMessage);
            app.get("/api/users/:uid1/messages/:uid2", MessageController.messageService.findAllMessagesBetweenSpecificUsers);
            app.get("/api/messages/:mid", MessageController.messageService.findMessageById);
            app.post("/api/users/:uid/messages", (req: Request, res: Response) =>
                MessageController.messageService.userSendsBroadcastMessage(req, res, socketIoServer));
        }
        return MessageController.messageController;
    }

    private constructor() {}

};