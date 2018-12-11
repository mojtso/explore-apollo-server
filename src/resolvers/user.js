import mongoose from 'mongoose';
import Joi from 'joi';
import { UserInputError } from 'apollo-server-express';
import { User } from '../models';
import { SignUp } from '../schemas';

export default {
    Query: {
        user: (root, args, context, info) => {
            if(mongoose.Types.ObjectId.isValid(args.id)) {
                throw new UserInputError(`${args.id} is not a valid user ID.`);
            }

            return User.findById(args.id);
        },
        users: (root, args, context, info) => {
            // TODO: auth, projection, pagination
            return User.find({});
        }
    },
    Mutation: {
        signUp: async (root, args, context, info) => {

            await Joi.validate(args, SignUp, {abortEarly: false })

            return User.create(args);
        }
    }
}