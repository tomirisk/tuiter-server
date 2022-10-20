/**
 * @file Message service RESTful Web service API for messages resource
 * and firebase connection services
 */
import {Request, Response} from "express";
import MessageDao from "../daos/message-dao";
import Message from "../models/messages/message";
import MessageServiceI from "../interfaces/message-service-I";
import {Server} from "socket.io";

/**
 * @class MessageService Implements RESTful Web service API for messages resource and firebase
 * connection.
 *
 * @property {MessageDao} messageDao Singleton DAO implementing follows CRUD operations
 * @property {MessageService} messageService Singleton controller implementing
 * RESTful Web service API
 */
export default class MessageService implements MessageServiceI{
    private static messageDao: MessageDao = MessageDao.getInstance();
    private static messageService: MessageService | null = null;

    /**
     * Creates singleton service instance
     * @return MessageService
     */
    public static getInstance = (): MessageService => {
        if(MessageService.messageService === null) {
            MessageService.messageService = new MessageService();
        }
        return MessageService.messageService;
    }

    private constructor() {}


    /**
     * Creates a new message instance representing a message sent by a user to another user
     * @param {Request} req Represents request from client, including the
     * body containing the JSON object for the new message to be inserted in the database
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new message that was inserted in the
     * database
     * @param socketIoServer Socket.io server instance to emit update event
     */
    userSendsMessage = (req: Request, res: Response, socketIoServer: Server) => {
        // @ts-ignore
        const senderUid = req.params.uid1 === "me" && req.session['profile'] ? req.session['profile']._id : req.params.uid1;
        const recipientUid = req.params.uid2;
        if(senderUid === "me" || recipientUid === "me"){
            res.sendStatus(503);
            return;
        }
        try {
            MessageService.messageDao.userSendsMessage(senderUid, recipientUid, req.body)
                .then((message: Message) => res.json(message));

            socketIoServer.emit(recipientUid, {type: 'NEW_MESSAGE'});
        } catch (e) {
            console.log(e);
        }
    }


    /**
     * Removes a message instance from the database
     * @param {Request} req Represents request from client, including the
     * path parameters mid identifying the primary key of the message to be removed
     * @param {Response} res Represents response to client, including status
     * on whether deleting the message was successful or not
     */
    userDeletesMessage = (req: Request, res: Response) =>
        MessageService.messageDao.userDeletesMessage(req.params.mid)
            .then(status => res.send(status));

    /**
     * Modifies an existing message instance
     * @param {Request} req Represents request from client, including path
     * parameter mid identifying the primary key of the message to be modified
     * @param {Response} res Represents response to client, including status
     * on whether updating a message was successful or not
     */
    userUpdatesMessage = (req: Request, res: Response) => 
        MessageService.messageDao.userUpdatesMessage(req.params.mid, req.body)
        .then(status => res.send(status));
    
        




    /**
     * Retrieves all messages sent between users from the database
     * @param {Request} req Represents request from client, including the path
     * parameter uid1, uid2 representing the users messaging each other
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the message objects
     */
    findAllMessagesBetweenSpecificUsers = (req: Request, res: Response) => {
        // @ts-ignore
        const senderUid = req.params.uid1 === "me" && req.session['profile'] ? req.session['profile']._id : req.params.uid1;
        // @ts-ignore
        const recipientUid = req.params.uid2 === "me" && req.session['profile'] ? req.session['profile']._id : req.params.uid2;

        if(senderUid === "me" || recipientUid === "me"){
            res.sendStatus(503);
            return;
        }
        try {
            MessageService.messageDao.findAllMessagesBetweenSpecificUsers(senderUid, recipientUid)
                .then((messages: Message[]) => res.json(messages));
        } catch (e) {
            console.log(e);
        }
    }

    /**
     * Retrieves one message with its id from the database
     * @param {Request} req Represents request from client
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the message objects
     */
    findMessageById = (req: Request, res: Response) =>
        MessageService.messageDao.findMessageById(req.params.mid)
            .then((message: Message) => res.json(message));

    /**
     * Retrieves all messages from the database
     * @param {Request} req Represents request from client
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the message objects
     */
    findAllMessages = (req: Request, res: Response) =>
        MessageService.messageDao.findAllMessages()
            .then((messages: Message[]) => res.json(messages));

    /**
     * Creates new message instances representing broadcast messages sent by a user to a list of users
     * @param {Request} req Represents request from client, including the
     * body containing the JSON object for the new message to be inserted in the database
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new message that was inserted in the database
     * @param socketIoServer Socket.io server instance to emit update event
     */
    userSendsBroadcastMessage = async (req: Request, res: Response, socketIoServer: Server) => {
        // @ts-ignore
        const senderUid = req.params.uid === "me" && req.session['profile'] ? req.session['profile']._id : req.params.uid;
        const recipientIds = req.body.recipientIds;
        if(senderUid === "me" || !recipientIds){
            res.sendStatus(503);
            return;
        }
        try {
            const messages: Message[] = [];
            await Promise.all(await recipientIds.map(async (recipientUid: string) => {
                const message = await MessageService.messageDao.userSendsMessage(senderUid, recipientUid, req.body);
                messages.push(message);

                socketIoServer.emit(recipientUid, {type: 'NEW_MESSAGE'});
            }));

            res.json(messages);
        } catch (e) {
            console.log(e);
        }
    }
};