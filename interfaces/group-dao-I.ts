import Group from "../models/messages/group";

/**
 * @file Declares API for Group related data access object methods
 */
export default interface GroupDaoI {
    findAllUserGroups (uid: string): Promise<Group[]>;
    createGroup (creatorUid: string, uids: string[], group: Group): Promise<Group>;
    deleteGroup (gid: string): Promise<any>;
    findGroupById (gid: string): Promise<any>;
    updateGroup (uid: string, group: Group): Promise<any>;
};
