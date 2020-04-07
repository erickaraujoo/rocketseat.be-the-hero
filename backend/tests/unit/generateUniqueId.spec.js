const generateUniqueId = require('./../../src/utils/generateUniqueId');

// Inserimos uma categoria, uma arrowfunction para os testes
describe('Generate Unique ID', () => {
    // Para ser legível o título, deve ser formal e em inglês
    it('should generate an unique ID', () => {
        const id = generateUniqueId();

        expect(id).toHaveLength(8);
    });
});