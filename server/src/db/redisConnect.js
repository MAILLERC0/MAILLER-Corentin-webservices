import redis from'redis';

const redisClient = redis.createClient({
    host: 'localhost',
    port: 6379
});

// On vérifie si la connexion à Redis est établie correctement
redisClient.on('connect', function() {
    console.log('Connecté à Redis');
});

redisClient.on('error', function(err) {
    console.error('Erreur de connexion à Redis : ' + err);
});

export default redisClient;