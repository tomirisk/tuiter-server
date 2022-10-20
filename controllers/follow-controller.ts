/**
 * @file Controller RESTful Web service API for follows resource
 */
import {Express, Request, Response} from "express";
import FollowDao from "../daos/follow-dao";
import FollowControllerI from "../interfaces/FollowControllerI";
import Follow from "../models/follows/follow";

/**
 * @class FollowController Implements RESTful Web service API for likes resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>GET /api/users/:uid/followed-by to retrieve all users that followed a user</li>
 *     <li>GET /api/users/:uid/follows to retrieve all the users followed by a user</li>
 *     <li>POST /api/users/:uid/follows/:userFollowed to record that a user follows a user</li>
 *     <li>DELETE /api/users/:uid/unfollows/:userFollowed to record that a user no longer follows a user</li>
 * </ul>
 * @property {FollowDao} followDao Singleton DAO implementing follows CRUD operations
 * @property {FollowController} followController Singleton controller implementing
 * RESTful Web service API
 */
export default class FollowController implements FollowControllerI {
    private static followDao: FollowDao = FollowDao.getInstance();
    private static followController: FollowController | null = null;
    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @return FollowController
     */
    public static getInstance = (app: Express): FollowController => {
        if(FollowController.followController === null) {
            FollowController.followController = new FollowController();
            app.get("/api/users/:uid/followed-by", FollowController.followController.findAllUsersThatFollowUser);
            app.get("/api/users/:uid/follows", FollowController.followController.findAllUsersFollowedByUser);
            app.post("/api/users/:uid/follows/:userFollowed", FollowController.followController.userFollowsUser);
            app.delete("/api/users/:uid/unfollows/:userFollowed", FollowController.followController.userUnfollowsUser);
        }
        return FollowController.followController;
    }

    private constructor() {}

    /**
     * Retrieves all users that followed a user from the database
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the followed user
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the user objects that follow
     */
    findAllUsersThatFollowUser = (req: Request, res: Response) =>
        FollowController.followDao.findAllUsersThatFollowUser(req.params.uid).then((follows: Follow[]) => res.json(follows));

    /**
     * Retrieves all users followed by a user from the database
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the user that follows
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the user objects that are followed
     */
    findAllUsersFollowedByUser = (req: Request, res: Response) =>
        FollowController.followDao.findAllUsersFollowedByUser(req.params.uid).then((follows: Follow[]) => res.json(follows));

    /**
     * Creates a new follow instance representing a user following another user
     * @param {Request} req Represents request from client, including the
     * path parameters uid and userFollowed representing the user that follows and the user that is followed
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new follows that was inserted in the
     * database
     */
    userFollowsUser = (req: Request, res: Response) =>
        FollowController.followDao.userFollowsUser(req.params.userFollowed, req.params.uid).then((follow: Follow) => res.json(follow));

    /**
     * Removes a like instance from the database
     * @param {Request} req Represents request from client, including the
     * path parameters uid and userFollowed representing the user that unfollows and the user that is unfollowed
     * @param {Response} res Represents response to client, including status
     * on whether deleting the follow was successful or not
     */
    userUnfollowsUser = (req: Request, res: Response) =>
        FollowController.followDao.userUnfollowsUser(req.params.userFollowed, req.params.uid).then(status => res.send(status));
};