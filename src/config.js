export const { 
    APP_PORT = 4000,
    NODE_ENV = 'development',

    DB_USERNAME = 'admin',
    DB_PASSWORD = '',
    DB_PORT = 27017,
    DB_NAME = 'chat_db'
} = process.env;
  
export const IN_PROD = NODE_ENV === 'production';