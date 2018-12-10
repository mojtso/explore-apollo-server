import mongoose from 'mongoose';
import { UserInputError } from 'apollo-server-express';
import { User } from '../models';

export default {
    Query: {
        user: (root, args, context, info) => {
            if(mongoose.Types.ObjectId.isValid(args.id)) {
                throw new UserInputError(`${args.id} is not a valid user ID.`);
            }

            return User.findById(args.id);
        },
        users: (root, args, context, info) => {
            return User.find({});
        }
    },
    Mutation: {
        signUp: (root, args, context, info) => {

            return User.create(args);
        }
    }
}