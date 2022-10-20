/**
 * @file Implements DAO managing data storage of messages. Uses mongoose MessageModel
 * to integrate with MongoDB
 */

import MessageDaoI from "../interfaces/message-dao-I";
import MessageModel from "../mongoose/messages/message-model";
import Message from "../models/messages/message";

/**
 * @class MessageDao Implements Data Access Object managing data storage
 * of messages
 * @property {MessageDao} messageDao Private single instance of MessageDao
 */
export default class MessageDao implements MessageDaoI {
  private static messageDao: MessageDao | null = null;

  /**
   * Creates singleton DAO instance
   * @returns MessageDao
   */
  public static getInstance = (): MessageDao => {
    if (MessageDao.messageDao === null) {
      MessageDao.messageDao = new MessageDao();
    }
    return MessageDao.messageDao;
  };
  private constructor() {}

  /**
   * Uses MessageModel to retrieve all message documents
   * @returns Promise To be notified when the messages are retrieved from database
   */
  findAllMessages = async (): Promise<Message[]> =>
    MessageModel.find().populate("sender").populate("recipient").exec();

  /**
   * Inserts message instance into the database
   * @param {string} uidSender sender's primary key
   * @param {string} uidRecipient recipient's primary key
   * @param {Message} message Instance to be inserted into the database
   * @returns Promise To be notified when message is inserted into the database
   */
  userSendsMessage = async (
    uidSender: string,
    uidRecipient: string,
    message: Message
  ): Promise<Message> =>
    MessageModel.create({
      ...message,
      sender: uidSender,
      recipient: uidRecipient,
    });

  /**
   * Uses MessageModel to retrieve all a single message document with the given mid
   * from message collection
   * @param {string} mid message's primary key
   * @returns Promise To be notified when the message is retrieved from database
   */
  findMessageById = async (mid: string): Promise<any> =>
    MessageModel.findOne({ _id: mid })
      .populate("sender")
      .populate("recipient")
      .exec();

  /**
   * Removes message from the database.
   * @param {string} mid Primary key of message to be removed
   * @returns Promise To be notified when message is removed from the database
   */
  userDeletesMessage = async (mid: string): Promise<any> =>
    MessageModel.deleteOne({ _id: mid });

  /**
   * Updates message with new values in database
   * @param {string} mid Primary key of message to be modified
   * @param {Message} message Message object containing properties and their new values
   * @returns Promise To be notified when message is updated in the database
   */
  userUpdatesMessage = async (mid: string, message: Message): Promise<any> =>
    MessageModel.updateOne({ _id: mid }, { $set: message });

  /**
   * Uses MessageModel to retrieve all message documents sent between specified users
   * from mess age collection
   * @param {string} uidSender sender's primary key
   * @param {string} uidRecipient recipient's primary key
   * @returns Promise To be notified when the messages are retrieved from database
   */
  findAllMessagesBetweenSpecificUsers = async (
    uidSender: string,
    uidRecipient: string
  ): Promise<Message[]> =>
    MessageModel.find({ sender: uidSender, recipient: uidRecipient }).exec();

  /**
   * Get the latest message sent by a user to another user
   * @param uidSender sender's uid
   * @param uidRecipient recipient's uid
   */
  findMostRecentMessage = async (uidSender: string, uidRecipient: string): Promise<any> =>
    MessageModel.findOne({sender: uidSender, recipient: uidRecipient}).sort({sentOn: -1}).exec();
}
