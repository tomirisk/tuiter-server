/**
 * @file Controller RESTful Web service API for users resource
 */
import UserDao from "../daos/user-dao";
import User from "../models/users/user";
import {Express, Request, Response} from "express";
import UserControllerI from "../interfaces/UserControllerI";
import MessageDao from "../daos/message-dao";

/**
 * @class UserController Implements RESTful Web service API for users resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>POST /api/users to create a new user instance</li>
 *     <li>GET /api/users to retrieve all the user instances</li>
 *     <li>GET /api/users/:uid to retrieve an individual user instance </li>
 *     <li>PUT /api/users/:uid to modify an individual user instance </li>
 *     <li>DELETE /api/users/:uid to remove a particular user instance</li>
 *     <li>DELETE /api/users to remove all the user instances</li>
 * </ul>
 * @property {UserDao} userDao Singleton DAO implementing user CRUD operations
 * @property {UserController} userController Singleton controller implementing
 * RESTful Web service API
 */
export default class UserController implements UserControllerI {
    private static userDao: UserDao = UserDao.getInstance();
    private static messageDao: MessageDao = MessageDao.getInstance();
    private static userController: UserController | null = null;

    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @returns UserController
     */
    public static getInstance = (app: Express): UserController => {
        if(UserController.userController === null) {
            UserController.userController = new UserController();

            app.post("/api/users", UserController.userController.createUser);
            app.get("/api/users", UserController.userController.findAllUsers);
            app.get("/api/users/:uid", UserController.userController.findUserById);
            app.put("/api/users/:uid", UserController.userController.updateUser);
            app.delete("/api/users/:uid", UserController.userController.deleteUser);
            app.delete("/api/users", UserController.userController.deleteAllUsers);
            app.get("/api/users/username/:username/delete", UserController.userController.deleteUsersByUsername);
        }

        return UserController.userController;
    }

    private constructor() {}

    /**
     * Retrieves all users from the database and returns an array of users.
     * @param {Request} req Represents request from client
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the user objects
     */
    findAllUsers = async (req: Request, res: Response) => {
        const users: User[] = await UserController.userDao.findAllUsers();

        if (req.query.metadata && req.query.uid && req.query.metadata === "latest-message") {
            // @ts-ignore
            const uid = req.query.uid === "me" && req.session['profile'] ? req.session['profile']._id : req.query.uid;
            if(uid === "me"){
                res.sendStatus(503);
                return;
            }

            const metadata : any[] = [];
            await Promise.all(users.map(async (user: User) => {
                if (user._id) {
                    const sentMessage = await UserController.messageDao.findMostRecentMessage(uid, String(user._id));
                    const receivedMessage = await UserController.messageDao.findMostRecentMessage(String(user._id), uid);
                    if (sentMessage || receivedMessage) {
                        metadata.push({_id: user._id, latestMessage: !sentMessage ? receivedMessage : !receivedMessage ? sentMessage
                            : sentMessage.sentOn > receivedMessage.sentOn ? sentMessage : receivedMessage});
                    }
                }
            }));
            res.json({users, metadata});
        } else {
            res.json(users);
        }
    }

    /**
     * Retrieves the user by their primary key
     * @param {Request} req Represents request from client, including path
     * parameter uid identifying the primary key of the user to be retrieved
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the user that matches the user ID
     */
    findUserById = (req: Request, res: Response) =>
        UserController.userDao.findUserById(req.params.uid).then((user: User) => res.json(user));

    /**
     * Creates a new user instance
     * @param {Request} req Represents request from client, including body
     * containing the JSON object for the new user to be inserted in the
     * database
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new user that was inserted in the
     * database
     */
    createUser = (req: Request, res: Response) =>
        UserController.userDao.createUser(req.body).then((user: User) => res.json(user));

    /**
     * Modifies an existing user instance
     * @param {Request} req Represents request from client, including path
     * parameter uid identifying the primary key of the user to be modified
     * @param {Response} res Represents response to client, including status
     * on whether updating a user was successful or not
     */
    updateUser = (req: Request, res: Response) =>
        UserController.userDao.updateUser(req.params.uid, req.body).then(status => res.json(status));

    /**
     * Removes a user instance from the database
     * @param {Request} req Represents request from client, including path
     * parameter uid identifying the primary key of the user to be removed
     * @param {Response} res Represents response to client, including status
     * on whether deleting a user was successful or not
     */
    deleteUser = (req: Request, res: Response) =>
        UserController.userDao.deleteUser(req.params.uid).then(status => res.json(status));

    /**
     * Removes all user instances from the database. Useful for testing
     * @param {Request} req Represents request from client
     * @param {Response} res Represents response to client, including status
     * on whether deleting all users was successful or not
     */
    deleteAllUsers = (req: Request, res: Response) =>
        UserController.userDao.deleteAllUsers().then((status) => res.send(status));

    /**
     * Removes a user instance from the database by username
     * @param {Request} req Represents request from client, including path
     * parameter username identifying the username of the user to be removed
     * @param {Response} res Represents response to client, including status
     * on whether deleting a user was successful or not
     */
    deleteUsersByUsername = (req: Request, res: Response) => {
        UserController.userDao.deleteUsersByUsername(req.params.username).then(status => res.send(status));
    }
}

