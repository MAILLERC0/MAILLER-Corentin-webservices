import redisClient from '#src/db/redisConnect';

const deleteCacheIfExist = (keyname) => {
    redisClient.exists(keyname, function(err, exists) {
        if (err) {
            console.error('Erreur lors de la vérification de l\'existence de la clé : ', err);
            return;
        }
    
        if (exists) {
            redisClient.del(key, function(err, response) {
                if (err) {
                    console.error('Erreur lors de la suppression de la clé : ', err);
                    return;
                }
                console.log('Clé de cache supprimée avec succès');
            });
        }
    });
}

export default deleteCacheIfExist;