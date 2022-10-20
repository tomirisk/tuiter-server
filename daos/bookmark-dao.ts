/**
 * @file Implements DAO managing data storage of bookmarks. Uses mongoose BookmarkModel
 * to integrate with MongoDB
 */
import BookmarkDaoI from "../interfaces/BookmarkDaoI";
import BookmarkModel from "../mongoose/bookmarks/bookmark-model";
import Bookmark from "../models/bookmarks/bookmark";

/**
 * @class BookmarkDao Implements Data Access Object managing data storage
 * of Bookmarks
 * @property {BookmarkDao} bookmarkDao Private single instance of BookmarkDao
 */
export default class BookmarkDao implements BookmarkDaoI {
    private static bookmarkDao: BookmarkDao | null = null;

    /**
     * Creates singleton DAO instance
     * @returns BookmarkDao
     */
    public static getInstance = (): BookmarkDao => {
        if(BookmarkDao.bookmarkDao === null) {
            BookmarkDao.bookmarkDao = new BookmarkDao();
        }
        return BookmarkDao.bookmarkDao;
    }

    private constructor() {}

    /**
     * Uses BookmarkModel to retrieve all bookmark documents with all tuits
     * bookmarked by a user from bookmarks collection
     * @param {string} uid User's primary key
     * @returns Promise To be notified when the bookmarks are retrieved from database
     */
    findAllTuitsBookmarkedByUser = async (uid: string): Promise<Bookmark[]> => {
        return BookmarkModel.find({bookmarkedBy: uid}).populate("tuit");
    }

    /**
     * Uses BookmarkModel to retrieve all bookmark documents with all users
     * that bookmarked a tuit from bookmarks collection
     * @param {string} tid Tuit's primary key
     * @returns Promise To be notified when the bookmarks are retrieved from database
     */
    findAllUsersThatBookmarkedTuit = async (tid: string): Promise<Bookmark[]> => {
        return BookmarkModel.find({tuit: tid}).populate("bookmarkedBy");
    }

    /**
     * Inserts bookmark instance into the database
     * @param {string} uid User's primary key
     * @param {string} tid Tuit's primary key
     * @returns Promise To be notified when bookmark is inserted into the database
     */
    userBookmarksTuit = async (uid: string, tid: string): Promise<any> => {
        return BookmarkModel.create({tuit: tid, bookmarkedBy: uid});
    }

    /**
     * Removes bookmark instance into the database
     * @param {string} uid User's primary key
     * @param {string} tid Tuit's primary key
     * @returns Promise To be notified when bookmark is removed into the database
     */
    userUnbookmarksTuit = async (uid: string, tid: string): Promise<any> => {
        return BookmarkModel.deleteOne({tuit: tid, bookmarkedBy: uid});
    }
}