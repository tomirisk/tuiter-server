/**
 * @file Implements DAO managing data storage of GroupMessages. Uses mongoose GroupMessageModel
 * to integrate with MongoDB
 */

import GroupMessageDaoI from "../interfaces/group-message-dao-I";
import GroupMessageModel from "../mongoose/messages/group-message-model";
import GroupMessage from "../models/messages/group-message";

/**
 * @class GroupMessageDao Implements Data Access Object managing data storage
 * of group messages
 * @property {GroupMessageDao} groupMessageDao Private single instance of GroupMessageDao
 */
export default class GroupMessageDao implements GroupMessageDaoI {
    private static groupMessageDao: GroupMessageDao | null = null;

    /**
     * Creates singleton DAO instance
     * @returns GroupMessageDao
     */
    public static getInstance = (): GroupMessageDao => {
        if(GroupMessageDao.groupMessageDao === null) {
            GroupMessageDao.groupMessageDao = new GroupMessageDao();
        }
        return GroupMessageDao.groupMessageDao;
    }
    private constructor() {}

    /**
     * Inserts group message instance into the database
     * @param {string} uidSender sender's primary key
     * @param {string} groupId group's primary key
     * @param {GroupMessage} groupMessage Instance to be inserted into the database
     * @returns Promise To be notified when group message is inserted into the database
     */
    userSendsGroupMessage = async (uidSender: string, groupId: string, groupMessage: GroupMessage): Promise<GroupMessage> =>
        GroupMessageModel.create({ ...groupMessage, sender: uidSender, group: groupId});

    /**
     * Uses GroupMessageModel to retrieve a single group message document with the given mid
     * from group message collection
     * @param {string} mid group message's primary key
     * @returns Promise To be notified when the group message is retrieved from database
     */
    findGroupMessageById = async (mid: string): Promise<any> =>
        GroupMessageModel.findOne({_id: mid})
            .populate("sender")
            .populate("group")
            .exec();

    /**
     * Removes group message from the database.
     * @param {string} mid Primary key of group message to be removed
     * @returns Promise To be notified when group message is removed from the database
     */
    userDeletesGroupMessage = async (mid: string): Promise<any> =>
        GroupMessageModel.deleteOne({_id: mid});

    /**
     * Uses GroupMessageModel to retrieve all group message documents sent between group
     * from group message collection
     * @param {string} groupId group's primary key
     * @returns Promise To be notified when the group messages are retrieved from database
     */
    findAllMessagesBetweenGroup = async (groupId: string): Promise<GroupMessage[]> =>
        GroupMessageModel.find({group: groupId}).populate("sender").exec();

    /**
     * Get the latest message sent in the group
     * @param groupId group id
     */
    findMostRecentMessage = async (groupId: string): Promise<any> =>
        GroupMessageModel.findOne({group: groupId}).sort({sentOn: -1}).exec();
}
