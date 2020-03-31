const connection = require('./../database/connection');

module.exports = {

    // Verifica se existe a ONG no momento do Login
    async create(request, response) {

        // Pegando o id pelo corpo da requisição
        const { id } = request.body;
        
        // Retornando o nome da ong caso o id seja o mesmo que o id da ONG no banco de dados, pegando o primeiro dado
        const ong = await connection('ongs').where('id', id).select('name').first();

        // Retorna um erro caso não exista a ONG
        if(!ong)
            return response.status(400).json({ error: 'No ONG found with this ID' })

        // Retornando o nome da ONG logada!
        return response.json(ong);
    }
}