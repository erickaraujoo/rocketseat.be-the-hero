const request = require('supertest');
const app = require('./../../src/app');

const connection = require('./../../src/database/connection');

describe('ONG', () => {

    // Antes de cada um dos testes
    beforeEach(async () => {
        // Desfaz as migrates para evitar a população no banco de dados
        await connection.migrate.rollback();
        // Executa as migrates 
        await connection.migrate.latest();
    });

    // Depois de todos os testes
    // Utilizamos para fechar a conexão com o banco de dados e evitar erros
    afterAll(async () => {
        await connection.destroy();
    })
    
    // Testando se é possivel a criação de uma nova ONG
    it('should be able to create a new ONG', async () => {
        const response = await request(app)
            .post('/ongs')
            .send({
                name: "APAD2",
                email: "contato@teste.com",
                whatsapp: "5512331122",
                city: "Rio do Sul",
                uf: "SC"
            })

        // Espera que o retorno da requisiçao seja uma propriedade chamada 'id'
        // e que tenha 8 caracteres
        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);


        // CONTINUA COM OS TESTES PARA TODOS OS RECURSOS
    });

    it('should be able to create a new incident', async () => {

        const response = await request(app)
            .post('/incidents')
            .set({ authorization: 'd161b260' })
            .send({
                title: "Cachorros bebês",
                description: "Descrição teste",
                value: 450
        })

        expect(response.body).toHaveProperty('id');
    })

    // it('should be able to consult all incidents', async () => {

    //     const response = await request(app)
    //         .get('/profile')
    //         .set({ 'Authorization': 'd161b260' })

    //     console.log(response);
    // })
})