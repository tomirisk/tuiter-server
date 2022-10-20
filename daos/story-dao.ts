/**
 * @file Implements DAO managing data storage of stories. Uses mongoose StoryModel
 * to integrate with MongoDB
 */
import StoryDaoI from "../interfaces/story-dao-I";
import Story from "../models/stories/story";
import StoryModel from "../mongoose/stories/story-model";

/**
 * @class StoryDao Implements Data Access Object managing data storage
 * of Stories
 * @property {StoryDao} storyDao Private single instance of StoryDao
 */
export default class StoryDao implements StoryDaoI {
  private static storyDao: StoryDao | null = null;

  /**
   * Creates singleton DAO instance
   * @returns StoryDao
   */
  public static getInstance = (): StoryDao => {
    if(StoryDao.storyDao === null) {
      StoryDao.storyDao = new StoryDao();
    }
    return StoryDao.storyDao;
  }

  private constructor() {}


  /**
   * Inserts story instance into the database
   * @param {string} uid User's primary key
   * @param {Story} story Instance to be inserted into the database
   * @returns Promise To be notified when story is inserted into the database
   */
  createStory = async (uid: string, story: Story): Promise<Story> => {
    return StoryModel.create({...story, postedBy: uid});
  }

  /**
   * Removes story from the database
   * @param {string} sid Primary key of story to be removed
   * @returns Promise To be notified when story is removed from the database
   */
  deleteStoryByID = async (sid: string): Promise<any> => {
    return StoryModel.deleteOne({_id: sid});
  }

  /**
   * Removes all stories from the database related to the specific user
   * @returns Promise To be notified when all stories are removed from the
   * database
   */
  userDeletesTheirStories = async (uid: string): Promise<any> => {
    return StoryModel.deleteMany({postedBy: uid});
  }

  /**
   * Uses StoryModel to retrieve single story document from stories collection
   * @param {string} sid Story's primary key
   * @returns Promise To be notified when story is retrieved from the database
   */
  findStoryById = async (sid: string): Promise<any> => {
    return StoryModel.findById(sid).populate("viewers").populate("postedBy").exec();
  }

  /**
   * Uses StoryModel to retrieve all story documents created by a user from stories collection
   * @param {string} uid User's primary key
   * @returns Promise To be notified when the stories are retrieved from database
   */
  findStoriesByUser = async (uid: string): Promise<Story[]> => {
    return StoryModel.find({postedBy: uid});
  }

  /**
   * Uses StoryModel to retrieve all story documents from stories collection
   * @returns Promise To be notified when the stories are retrieved from
   * database
   */
  findStories = async (): Promise<Story[]> => {
    return StoryModel.find().populate("viewers").populate("postedBy").exec();
}

  /**
   * Retrieves all stories visible to specific user, as stories can be visible to public or
   * only to some selected users
   * @param {string} uid User's primary key
   */
  findStoriesVisibleToUser = async (uid: string): Promise<Story[]> => {
    const stories = await this.findStories();
    return stories.filter((story) => (story.viewers.length < 1 ||
        story.viewers.find(viewer => String(viewer._id)===uid)));
  }
}