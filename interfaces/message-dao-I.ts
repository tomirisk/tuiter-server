import Message from "../models/messages/message";

/**
 * @file Declares API for Messages related data access object methods
 */
export default interface MessageDaoI {
    findAllMessages (): Promise<Message[]>;
    userSendsMessage (uidSender: string, uidRecipient: string, message: Message): Promise<Message>;
    userDeletesMessage (mid: string): Promise<any>;
    userUpdatesMessage (mid: string, message: Message): Promise<any>;
    findMessageById (mid: string): Promise<any>;
    findAllMessagesBetweenSpecificUsers (uidSender: string, uidRecipient: string): Promise<Message[]>;
    findMostRecentMessage (uidSender:string, uidRecipient: string) : Promise<any>;
};
