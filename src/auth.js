import { AuthenticationError } from 'apollo-server-express';
import { User } from './models';
import { SESS_NAME } from './config';

export const attemptSignIn =  async (email, password) => {
    const user = await User.findById({ email });

    if(!user) {
        throw new AuthenticationError('Incorrect email or password.');
    }

    if(!await user.matchesPassword(password)) {
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

export const signOut = (req, res) => new Promise(
    (resolve, reject) => {
        req.session.destroy(err => {
            if(err) {
                reject(err);
            }

            res.clearCookie(SESS_NAME);
            resolve(true)
        });
    }
);
