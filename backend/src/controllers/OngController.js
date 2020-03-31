const crypto = require('crypto');
const connection = require('./../database/connection');

module.exports = {

    async index(request, response) {

        // Selecionando todos '*' os dados da tabela ongs
        const ongs = await connection('ongs').select('*');
    
        // Retornando em forma de JSON
        return response.json(ongs);
    },

    async create(request, response) {
        
        // Pegando todos os campos do corpo da requisição
        const { name, email, whatsapp, city, uf } = request.body;
    
        // Criando um id com 4 bytes hexadecimal
        const id = crypto.randomBytes(4).toString('HEX');
    
        // Inserindo os dados na tabela ongs 
        await connection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf
        });
    
        // Retornando o id criado em formato JSON
        return response.json({ id });
    }
};