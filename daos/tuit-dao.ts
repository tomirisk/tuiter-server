/**
 * @file Implements DAO managing data storage of tuits. Uses mongoose TuitModel
 * to integrate with MongoDB
 */
import TuitModel from "../mongoose/tuits/tuit-model";
import Tuit from "../models/tuits/tuit";
import TuitDaoI from "../interfaces/TuitDaoI";
import Stats from "../models/tuits/stats";

/**
 * @class TuitDao Implements Data Access Object managing data storage
 * of Tuits
 * @property {TuitDao} tuitDao Private single instance of TuitDao
 */
export default class TuitDao implements TuitDaoI {
    private static tuitDao: TuitDao | null = null;

    /**
     * Creates singleton DAO instance
     * @returns TuitDao
     */
    public static getInstance = (): TuitDao => {
        if(TuitDao.tuitDao === null) {
            TuitDao.tuitDao = new TuitDao();
        }
        return TuitDao.tuitDao;
    }

    private constructor() {}

    /**
     * Uses TuitModel to retrieve all tuit documents from tuits collection
     * @returns Promise To be notified when the tuits are retrieved from database
     */
    findTuits = async (): Promise<Tuit[]> => {
        return TuitModel.find().populate("postedBy");
    }

    /**
     * Uses TuitModel to retrieve all tuit documents created by a user from tuits collection
     * @param {string} uid User's primary key
     * @returns Promise To be notified when the tuits are retrieved from database
     */
    findTuitsByUser = async (uid: string): Promise<Tuit[]> => {
        return TuitModel.find({postedBy : uid}).populate("postedBy");
    }

    /**
     * Uses TuitModel to retrieve single tuit document from tuits collection
     * @param {string} tid Tuit's primary key
     * @returns Promise To be notified when tuit is retrieved from the database
     */
    findTuitById = async (tid: string): Promise<any> => {
        return TuitModel.findById(tid).populate("postedBy");
    }

    /**
     * Inserts tuit instance into the database
     * @param {string} uid User's primary key
     * @param {Tuit} tuit Instance to be inserted into the database
     * @returns Promise To be notified when tuit is inserted into the database
     */
    createTuitByUser = async (uid: string, tuit: Tuit): Promise<Tuit> => {
        return TuitModel.create({...tuit, postedBy: uid});
    }

    /**
     * Updates tuit with new values in database
     * @param {string} tid Primary key of tuit to be modified
     * @param {Tuit} tuit Tuit object containing properties and their new values
     * @returns Promise To be notified when tuit is updated in the database
     */
    updateTuit = async (tid: string, tuit: Tuit):  Promise<any> => {
        return TuitModel.updateOne({_id: tid}, {$set: tuit});
    }

    /**
     * Removes tuit from the database
     * @param {string} tid Primary key of tuit to be removed
     * @returns Promise To be notified when tuit is removed from the database
     */
    deleteTuit = async (tid: string): Promise<any> => {
        return TuitModel.deleteOne({_id: tid});
    }

    /**
     * Updates stats of a tuit in database
     * @param {string} tid Primary key of tuit to be modified
     * @param {Stats} newStats Stats object containing properties and their new values
     * @returns Promise To be notified when tuit is updated in the database
     */
    updateLikes = async (tid: string, newStats: Stats): Promise<any> =>
        TuitModel.updateOne({_id: tid}, {$set: {stats: newStats}});
}

