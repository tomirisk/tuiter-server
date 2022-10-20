/**
 * @file GroupController RESTful Web service API for group resource
 */
import {Express} from "express";
import GroupService from "../services/group-service";

/**
 * @class GroupController Implements RESTful Web service API for group resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>POST /api/users/:uid/groups to create a new group instance </li>
 *     <li>DELETE /api/groups/:gid to delete a group </li>
 *     <li>GET /api/groups/:gid/users/:uid to find if user is in a group </li>
 *     <li>GET /api/groups/:gid to retrieve a group </li>
 *     <li>GET /api/user/:uid/groups retrieve all user's groups <li>
 * </ul>
 * @property {GroupService} groupService Singleton service object implementing follows CRUD operations
 * @property {GroupMessageController} groupController Singleton controller implementing
 * RESTful Web service API
 */
export default class GroupController {
    private static groupService: GroupService = GroupService.getInstance();
    private static groupController: GroupController | null = null;

    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @return GroupController
     */
    public static getInstance = (app: Express): GroupController => {
        if(GroupController.groupController === null) {
            GroupController.groupController = new GroupController();

            app.post("/api/users/:uid/groups", GroupController.groupService.createGroup);
            app.delete("/api/groups/:gid", GroupController.groupService.deleteGroup);
            app.get("/api/groups/:gid", GroupController.groupService.findGroupById);
            app.get("/api/users/:uid/groups", GroupController.groupService.findAllUserGroups);
            app.put("/api/groups/:gid", GroupController.groupService.updateGroup);
        }
        return GroupController.groupController;
    }

    private constructor() {}

};