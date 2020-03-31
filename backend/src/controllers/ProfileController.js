const connection = require('./../database/connection');

module.exports = {

    // Listando os casos específicos de uma ONG
    async index(request, response) {

        // Pegando o id da ong pelo HEADER
        const ong_id = request.headers.authorization;

        // Pegando os casos onde o id da ONG seja o id passado no Authorization
        const incidents = await connection('incidents').where('ong_id', ong_id).select('*');

        // Retornando os casos em formato JSON
        return response.json(incidents);
    }
}