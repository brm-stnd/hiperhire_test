import { config } from 'dotenv';
config();

export default () => ({
  NODE_ENV: process.env.NODE_ENV,
  RABBITMQ_URL: process.env.RABBITMQ_URL,
});
