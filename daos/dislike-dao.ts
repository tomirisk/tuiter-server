/**
 * @file Implements DAO managing data storage of dislikes. Uses mongoose DislikeModel
 * to integrate with MongoDB
 */
import DislikeDaoI from "../interfaces/DislikeDaoI";
import DislikeModel from "../mongoose/dislikes/dislike-model";
import Dislike from "../models/dislikes/dislike";

/**
 * @class LikeDao Implements Data Access Object managing data storage of Dislikes
 * @property {DislikeDao} dislikeDao Private single instance of DislikeDao
 */
export default class DislikeDao implements DislikeDaoI {
    private static dislikeDao: DislikeDao | null = null;

    /**
     * Creates singleton DAO instance
     * @returns DislikeDao
     */
    public static getInstance = (): DislikeDao => {
        if(DislikeDao.dislikeDao === null) {
            DislikeDao.dislikeDao = new DislikeDao();
        }
        return DislikeDao.dislikeDao;
    }

    private constructor() {}

    /**
     * Uses DislikeModel to retrieve all dislike documents with all users that disliked a tuit from dislikes collection
     * @param {string} tid Tuit's primary key
     * @returns Promise To be notified when the dislikes are retrieved from database
     */
    findAllUsersThatDislikedTuit = async (tid: string): Promise<Dislike[]> => {
        return DislikeModel.find({tuit: tid}).populate("dislikedBy").exec();
    }

    /**
     * Uses DislikeModel to retrieve all dislike documents with all tuits disliked by a user from dislikes collection
     * @param {string} uid User's primary key
     * @returns Promise To be notified when the dislikes are retrieved from database
     */
    findAllTuitsDislikedByUser = async (uid: string): Promise<Dislike[]> => {
        return DislikeModel.find({dislikedBy: uid}).populate({
            path: "tuit",
            populate: {
                path: "postedBy"
            }
        }).exec();
    }

    /**
     * Inserts dislike instance into the database
     * @param {string} uid User's primary key
     * @param {string} tid Tuit's primary key
     * @returns Promise To be notified when dislike is inserted into the database
     */
    userDislikesTuit = async (uid: string, tid: string): Promise<Dislike> => {
        return DislikeModel.create({tuit: tid, dislikedBy: uid});
    }

    /**
     * Removes dislike instance into the database
     * @param {string} uid User's primary key
     * @param {string} tid Tuit's primary key
     * @returns Promise To be notified when dislike is removed into the database
     */
    userRemovesDislikeTuit = async (uid: string, tid: string): Promise<any> => {
        return DislikeModel.deleteOne({tuit: tid, dislikedBy: uid});
    }

    /**
     * Finds if a user has disliked a tuit
     * @param {string} uid User's primary key
     * @param {string} tid Tuit's primary key
     * @returns Promise To be notified when dislike is retrieved from database
     */
    findUserDislikesTuit = async (uid: string, tid: string): Promise<any> =>
        DislikeModel.findOne({tuit: tid, dislikedBy: uid});

    /**
     * Uses DislikeModel to retrieve count of users that disliked a tuit from dislikes collection
     * @param {string} tid Tuit's primary key
     * @returns Promise To be notified when the dislikes are retrieved from database
     */
    countHowManyDislikedTuit = async (tid: string): Promise<any> =>
        DislikeModel.count({tuit: tid});
}
