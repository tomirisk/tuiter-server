/**
 * @file Implements DAO managing data storage of Groups. Uses mongoose GroupModel
 * to integrate with MongoDB
 */

import GroupDaoI from "../interfaces/group-dao-I";
import GroupModel from "../mongoose/messages/group-model";
import Group from "../models/messages/group";

/**
 * @class GroupDao Implements Data Access Object managing data storage
 * of groups
 * @property {GroupDao} GroupDao Private single instance of GroupDao
 */
export default class GroupDao implements GroupDaoI {
    private static groupDao: GroupDao | null = null;

    /**
     * Creates singleton DAO instance
     * @returns GroupDao
     */
    public static getInstance = (): GroupDao => {
        if(GroupDao.groupDao === null) {
            GroupDao.groupDao = new GroupDao();
        }
        return GroupDao.groupDao;
    }
    private constructor() {}

    /**
     * Uses GroupModel to retrieve all user's group documents
     * @returns Promise To be notified when the groups are retrieved from database
     */
    findAllUserGroups = async (uid: string): Promise<Group[]> => {
        const groups = await GroupModel.find().populate("users");
        return groups.filter(group => group.users.filter(user => String(user._id) === uid).length > 0);
    }

    /**
     * Inserts group instance into the database
     * @param {string} creatorUid owners uid
     * @param {string} uids users' primary key
     * @param {Group} group Instance to be inserted into the database
     * @returns Promise To be notified when group is inserted into the database
     */
    createGroup = async (creatorUid: string, uids: string[], group: Group): Promise<Group> =>
        GroupModel.create({ ...group, users: uids, owner: creatorUid});

    /**
     * Uses GroupModel to retrieve a single group document with the given gid
     * from group collection
     * @param {string} gid group's primary key
     * @returns Promise To be notified when the group is retrieved from database
     */
    findGroupById = async (gid: string): Promise<any> =>
        GroupModel.findOne({_id: gid})
            .populate("users")
            .exec();

    /**
     * Removes group from the database.
     * @param {string} gid Primary key of group to be removed
     * @returns Promise To be notified when group is removed from the database
     */
    deleteGroup = async (gid: string): Promise<any> => {
        GroupModel.deleteOne({_id: gid});
    }

    /**
     * Updates group with new values in database
     * @param {string} uid Primary key of group to be modified
     * @param {Group} group Group object containing properties and their new values
     * @returns Promise To be notified when group is updated in the database
     */
    updateGroup = async (uid: string, group: Group): Promise<any> => {
        return GroupModel.updateOne({_id: uid}, {$set: group});
    }
}
