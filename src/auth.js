import { AuthenticationError } from 'apollo-server-express';



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
