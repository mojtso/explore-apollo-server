export const { 
    APP_PORT = 4000,
    NODE_ENV = 'development',

    DB_USERNAME = 'admin',
    DB_PASSWORD = '',
    DB_PORT = 27017,
    DB_NAME = 'chat_db',

    SESS_NAME='sid',
    SESS_SECRET='ssh!pass!',
    SESS_LIFETIME=1000 * 60 * 60 * 2,

    REDIS_HOST='127.0.0.1',
    REDIS_PORT=6379,
    REDIS_PASSWORD='',

} = process.env;
  
export const IN_PROD = NODE_ENV === 'production';