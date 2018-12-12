import mongoose from 'mongoose';
import Joi from 'joi';
import { UserInputError } from 'apollo-server-express';
import { User } from '../models';
import { signUp, signIn } from '../schemas';
import * as Auth  from '../auth';

export default {
    Query: {
        me: (root,args, { req }, info) => {
            Auth.checkSignIn(req);

            return User.findById(req.session.userId);
        },
        user: (root, args, context, info) => {
            if(mongoose.Types.ObjectId.isValid(args.id)) {
                throw new UserInputError(`${args.id} is not a valid user ID.`);
            }
            

            return User.findById(args.id);
        },
        users: (root, args, { req }, info) => {
            // TODO: auth, projection, pagination
            Auth.checkSignIn(req);

            return User.find({});
        }
    },
    Mutation: {
        signUp: async (root, args, { req }, info) => {

            await Joi.validate(args, signUp, {abortEarly: false })

            const user = await User.create(args);

            req.session.userId = user.id;
            console.log(req);
            return user;
        },
        signIn: async (root, args, { req }, info) => {
            const { userId } = req.session;

            if(userId) {
                return User.findById(userId);
            }

            await Joi.validate(args, signIn, { abortEarly: false });

            const user = await Auth.attemptSignIn(args.email, args.password);

            req.session.userId = user.id;

            return user;
        },
        signOut: async (root, args, { req, res }, info) => {
            await Auth.checkSignIn(req);

            return await Auth.signOut(req, res)
        }
    }
}