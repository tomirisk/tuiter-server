/**
 * @file GroupMessageController RESTful Web service API for group messages resource
 */
import {Express, Request, Response} from "express";
import GroupMessageService from "../services/group-message-service";
import {Server} from "socket.io";

/**
 * @class GroupMessageController Implements RESTful Web service API for group messages resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>POST /api/groups/:gid/users/:uid/messages to create a new group message instance sent by the user</li>
 *     <li>DELETE /api/groups/:gid/messages/:mid to delete a group message</li>
 *     <li>GET /api/groups/:gid/messages to retrieve all the messages sent in a group</li>
 *     <li>GET /api/groups/:gid/messages/:mid to retrieve a group message</li>
 * </ul>
 * @property {GroupMessageService} groupMessageService Singleton service object implementing follows CRUD operations
 * @property {GroupMessageController} groupMessageController Singleton controller implementing
 * RESTful Web service API
 */
export default class GroupMessageController {
    private static groupMessageService: GroupMessageService = GroupMessageService.getInstance();
    private static groupMessageController: GroupMessageController | null = null;

    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service API
     * @param {Server} socketIoServer socket io instance
     * @return GroupMessageController
     */
    public static getInstance = (app: Express, socketIoServer: Server): GroupMessageController => {
        if(GroupMessageController.groupMessageController === null) {
            GroupMessageController.groupMessageController = new GroupMessageController();

            app.post("/api/groups/:gid/users/:uid/messages", (req: Request, res: Response) =>
                GroupMessageController.groupMessageService.userSendsGroupMessage(req, res, socketIoServer));
            app.delete("/api/groups/:gid/messages/:mid", GroupMessageController.groupMessageService.userDeletesGroupMessage);
            app.get("/api/groups/:gid/messages", GroupMessageController.groupMessageService.findAllMessagesBetweenGroup);
            app.get("/api/groups/:gid/messages/:mid", GroupMessageController.groupMessageService.findGroupMessageById);

        }
        return GroupMessageController.groupMessageController;
    }

    private constructor() {}

};