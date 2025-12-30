import { createClient } from 'redis';
const redisHost = process.env.REDIS_Host;
const redisPORT = process.env.REDIS_PORT;
const redisPassword = process.env.REDIS_PASSWORD;
const redisUser = process.env.REDIS_USER;

const redisClient = createClient({
    username: redisUser,
    password: redisPassword,
    socket: {
        host: redisHost,
        port: redisPORT
    }
});

redisClient.on('error', err => console.log('Redis Client Error', err));

await redisClient.connect();

await redisClient.set('foo', 'bar');
const result = await redisClient.get('foo');
console.log(result)  

export default redisClient;