import { AuthenticationError } from 'apollo-server-express';
import { User } from './models';

export const attemptSignIn =  async (email, password) => {
    const user = await User.findById({ email });

    if(!user) {
        throw new AuthenticationError('Incorrect email or password.');
    }

    if(!await user.matchesPassword(user.password)) {
        throw new AuthenticationError('Password is incorrect');
    }

    return user;
};

export const checkSignIn = req => {
    if(!req.session.userId) { 
        throw new AuthenticationError('You must be signed in.');
    }
};

export const checkSignOut = req => {
    if(req.session.userId) {
        throw new AuthenticationError('You are already signed in');
    }
};

export const signOut = () => {
    req.session.destroy(err => {
        
    });
};
