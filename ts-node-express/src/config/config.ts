import dotenv from 'dotenv';

dotenv.config();

type Config = {
    PORT: number;
    NODE_ENV: string;
    MONGO_URI:string
    JWT_SECRET: string;
    REFRESH_TOKEN_SECRET :string
}

const config: Config = {
    PORT: parseInt(process.env.PORT || '5000', 10),
    NODE_ENV: process.env.NODE_ENV || 'development',
    MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost:27017/test',
    JWT_SECRET: process.env.JWT_SECRET || "secret",
    REFRESH_TOKEN_SECRET:process.env.REFRESH_TOKEN_SECRET ||'sadjfh'
}


export default config