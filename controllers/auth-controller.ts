import {Request, Response, Express} from "express";
import UserDao from "../daos/user-dao";
const bcrypt = require('bcrypt');
const saltRounds = 10;

/**
 * @class AuthenticationController Implements RESTful Web service API for authenticating users.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>POST /api/auth/signup to sign up a user</li>
 *     <li>POST /api/auth/logout to logout a user</li>
 *     <li>POST /api/auth/login to login a user</li>
 *     <li>POST /api/auth/profile to fetch the profile of a user</li>
 * </ul>
 * @property {UserDao} userDao Singleton DAO implementing users CRUD operations
 * RESTful Web service API
 */
const AuthenticationController = (app: Express) => {
    const userDao: UserDao = UserDao.getInstance();

    /**
     * Signs up in a user
     * @param {Request} req Represents request from client
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON object containing the user object
     */
    const signup = async (req: Request, res: Response) => {
        const newUser = req.body;
        const password = newUser.password;
        const hash = await bcrypt.hash(password, saltRounds);
        newUser.password = hash;

        const existingUser = await userDao.findUserByUsername(req.body.username);
        if (existingUser) {
            res.sendStatus(403);
            return;
        } else {
            const insertedUser = await userDao.createUser(newUser);
            insertedUser.password = '';
            // @ts-ignore
            req.session['profile'] = insertedUser;
            res.json(insertedUser);
        }
    }

    /**
     * Logs in a user
     * @param {Request} req Represents request from client
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON object containing the user object
     */
    const login = async (req: Request, res: Response) => {
        const user = req.body;
        const username = user.username;
        const password = user.password;
        const existingUser = await userDao.findUserByUsername(username);

        if (!existingUser) {
            res.sendStatus(403);
            return;
        }

        const match = await bcrypt.compare(password, existingUser.password);

        if (match) {
            existingUser.password = '*****';
            // @ts-ignore
            req.session['profile'] = existingUser;
            res.json(existingUser);
        } else {
            res.sendStatus(403);
        }
    };

    /**
     * Logs out a user
     * @param {Request} req Represents request from client
     * @param {Response} res Represents response to client
     */
    const logout = (req: Request, res: Response) => {
        // @ts-ignore
        req.session.destroy();
        res.sendStatus(200);
    }

    /**
     * Retrieves the profile of a user.
     * @param {Request} req Represents request from client
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON object containing the user object
     */
    const profile = (req: Request, res: Response) => {
        // @ts-ignore
        const profile = req.session['profile'];
        if (profile) {
            profile.password = "";
            res.json(profile);
        } else {
            res.sendStatus(403);
        }
    }

    app.post("/api/auth/signup", signup);
    app.post("/api/auth/logout", logout);
    app.post("/api/auth/login", login);
    app.post("/api/auth/profile", profile);
}

export default AuthenticationController;

