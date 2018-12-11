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

    REDIS_HOST='localhost',
    REDIS_PORT=6379,
    REDIS_PASSWORD='secret',

} = process.env;
  
export const IN_PROD = NODE_ENV === 'production';