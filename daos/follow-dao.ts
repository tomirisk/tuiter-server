/**
 * @file Implements DAO managing data storage of follows. Uses mongoose FollowModel
 * to integrate with MongoDB
 */
import FollowDaoI from "../interfaces/FollowDaoI";
import FollowModel from "../mongoose/follows/follow-model";
import Follow from "../models/follows/follow";

/**
 * @class FollowDao Implements Data Access Object managing data storage
 * of Follows
 * @property {FollowDao} followDao Private single instance of FollowDao
 */
export default class FollowDao implements FollowDaoI {
    private static followDao: FollowDao | null = null;

    /**
     * Creates singleton DAO instance
     * @returns FollowDao
     */
    public static getInstance = (): FollowDao => {
        if(FollowDao.followDao === null) {
            FollowDao.followDao = new FollowDao();
        }
        return FollowDao.followDao;
    }

    private constructor() {}

    /**
     * Uses FollowModel to retrieve all follow documents with all users that follow a user from follows collection
     * @param {string} uid User's primary key
     * @returns Promise To be notified when the follows are retrieved from database
     */
    findAllUsersThatFollowUser = async (uid: string): Promise<Follow[]> => {
        return FollowModel.find({user: uid}).populate("followedBy");
    }

    /**
     * Uses FollowModel to retrieve all follow documents with all users
     * that are followed by a user from follows collection
     * @param {string} followedBy Follower user's primary key
     * @returns Promise To be notified when the follows are retrieved from database
     */
    findAllUsersFollowedByUser = async (followedBy: string): Promise<Follow[]> => {
        return FollowModel.find({followedBy: followedBy}).populate("user");
    }

    /**
     * Inserts follow instance into the database
     * @param {string} uid User's primary key
     * @param {string} followedBy Follower user's primary key
     * @returns Promise To be notified when follow is inserted into the database
     */
    userFollowsUser = async (uid: string, followedBy: string): Promise<any> => {
        return FollowModel.create({user: uid, followedBy: followedBy});
    }

    /**
     * Removes follow instance into the database
     * @param {string} uid User's primary key
     * @param {string} followedBy Follower user's primary key
     * @returns Promise To be notified when follow is removed into the database
     */
    userUnfollowsUser = async (uid: string, followedBy: string): Promise<any> => {
        return FollowModel.deleteOne({user: uid, followedBy: followedBy});
    }
}
