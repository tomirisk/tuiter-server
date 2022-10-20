import Follow from "../models/follows/follow";

/**
 * @file Declares API for Follows related data access object methods
 */
export default interface FollowDaoI {
    findAllUsersThatFollowUser (uid: string): Promise<Follow[]>;
    findAllUsersFollowedByUser (uid: string): Promise<Follow[]>;
    userFollowsUser (uid: string, followedById: string): Promise<Follow>;
    userUnfollowsUser (uid: string, followedById: string): Promise<any>;
};
