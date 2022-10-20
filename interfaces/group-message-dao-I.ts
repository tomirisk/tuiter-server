import GroupMessage from "../models/messages/group-message";

/**
 * @file Declares API for GroupMessages related data access object methods
 */
export default interface GroupMessageDaoI {
    userSendsGroupMessage (uidSender: string, groupId: string, message: GroupMessage): Promise<GroupMessage>;
    userDeletesGroupMessage (mid: string): Promise<any>;
    findGroupMessageById (mid: string): Promise<any>;
    findAllMessagesBetweenGroup (groupId: string): Promise<GroupMessage[]>;
    findMostRecentMessage (groupId: string) : Promise<any>;
};
