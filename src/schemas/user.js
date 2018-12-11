import Joi from 'joi';

export default Joi.object().keys({
   email: Joi.string().email().required().label('Email'),
   username: Joi.string().alphanum().alphanum().min(4).max(30).required().label('Username'),
   name: Joi.string().max(256).required().label('Name'),
   password: Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,30})/).label('Password')
    .options({
        language: {
            string: {
                regex: {
                    base: 'must have atleast one lowercase letterm one uppercase letter, one digit and one special character'
                }
            }
        }
    }),
});