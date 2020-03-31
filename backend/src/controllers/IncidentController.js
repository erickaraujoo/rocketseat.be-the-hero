const connection = require('./../database/connection');

module.exports = {

    async index(request, response) {

        // Pegando os argumentos passados na url depois do ?
        // Caso não tenha paginação, o mesmo retorna como padrão 1
        const { page = 1 } = request.query;

        // Retorna o tamanho total de casos que existem
        const [count] = await connection('incidents').count();

        // Insere no HEADER o tamanho total de casos
        response.header('X-Total-Count', count['count(*)'])

        /**
         * Pegando todos os casos e limitando 5 casos por página
         * 
         * limit() - limite de casos
         * offset() - a cada página passada, retorna +5 casos (0~5;5~10;10~15...) 
        */
        const incidents = await connection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
            .limit(5)
            .offset((page - 1) * 5)
            .select([
                'incidents.*', 
                'ongs.name', 
                'ongs.email', 
                'ongs.whatsapp', 
                'ongs.city', 
                'ongs.uf'
            ]);

        // Retornando os casos em formato JSON
        return response.json(incidents);
    },

    async create(request, response) {

        // Pegando os dados do corpo da requisição
        const { title, description, value } = request.body;

        // Pegando o id da ong que está criando o caso pelo HEADER
        const ong_id = request.headers.authorization;

        // Pegando a primeira chave do array será armazenado numa variável chamada id
        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id
        });

        return response.json({ id });
    },

    async delete(request, response) {

        // Pegando o id pelo parâmetro com Route Params
        const { id } = request.params;

        // Pegando o id da ong pelo HEADER
        const ong_id = request.headers.authorization;

        // Fazendo um SELECT na tabela incidents onde o id seja o id passado no parametro, e pegando o primeiro dado
        const incident = await connection('incidents').where('id', id).select('ong_id').first();

        // Apenas deleta caso o id da ONG retornado do banco seja igual o id da ONG que quer deletar o caso 
        if(incident.ong_id != ong_id)
            return response.status(401).json({ error: 'Operation not permitted.' })

        // Deletando o caso 
        await connection('incidents').where('id', id).delete();

        // Retornando status 204 'No Content'
        return response.status(204).send();
    }
}