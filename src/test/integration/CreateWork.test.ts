import axios from "axios";
import { pgPromiseConnection } from "../../infra/database/DatabaseConnection";

axios.defaults.validateStatus = function () {
    return true;
}

const now = new Date()

beforeEach(async () => {
    await pgPromiseConnection.query("DELETE FROM work", []);
})
afterAll(async () => {
    await pgPromiseConnection.query("DELETE FROM work", []);
    await pgPromiseConnection.end();
});

it("Deve salvar um trabalho com sucesso", async () => {

    const input = {
        description: 'Operador em usina de oleo e gas',
        dateInit: now,
        dateEnd: now,
        typeContract: 'TEMPORARIO',
        time: 'DIA',
    }


    const response = await axios.post("http://localhost:3000/work", input)

    expect(response.status).toBe(201)
    const output = response.data;

    expect(output.id).toBeDefined()
    expect(typeof output.id).toBe('string');
    expect(output.id).toMatch(/[a-z0-9\-]{36}/);

})

it("deve lançar um erro ao salvar um trabalho com descrição vazia", async () => {

    const input = {
        description: '',
        dateInit: now,
        dateEnd: now,
        typeContract: 'TEMPORARIO',
        time: 'DIA',
    }

    const response = await axios.post("http://localhost:3000/work", input)

    expect(response.status).toBe(422)
    const output = response.data

    expect(Object.keys(output)).toEqual(['message']);
    expect(output.message).toBe('A descrição é obrigatório')

})

it("deve lançar um erro ao salvar um trabalho com data vazia", async () => {

    const input = {
        description: 'Operador em usina de oleo e gas',
        dateInit: null,
        dateEnd: now,
        typeContract: 'TEMPORARIO',
        time: 'DIA',
        companyId: '0000000000000'
    }

    const response = await axios.post("http://localhost:3000/work", input)

    expect(response.status).toBe(422)
    const output = response.data

    expect(Object.keys(output)).toEqual(['message']);
    expect(output.message).toBe('A data é obrigatório')

})

it("deve lançar um erro ao salvar um trabalho com data inválida", async () => {

    const input = {
        description: 'Operador em usina de oleo e gas',
        dateInit: 'now',
        dateEnd: now,
        typeContract: 'TEMPORARIO',
        time: 'DIA',
    }

    const response = await axios.post("http://localhost:3000/work", input)

    expect(response.status).toBe(422)
    const output = response.data

    expect(Object.keys(output)).toEqual(['message']);
    expect(output.message).toBe('A data é inválida')

})

it("deve lançar um erro ao salvar um trabalho com tipo de contrato vazio", async () => {

    const input = {
        description: 'Operador em usina de oleo e gas',
        dateInit: now,
        dateEnd: now,
        typeContract: '',
        time: 'DIA',
    }

    const response = await axios.post("http://localhost:3000/work", input)

    expect(response.status).toBe(422)
    const output = response.data

    expect(Object.keys(output)).toEqual(['message']);
    expect(output.message).toBe('O tipo de contrato é obrigatório')

})

it("deve lançar um erro ao salvar um trabalho com periodo vazio", async () => {

    const input = {
        description: 'Operador em usina de oleo e gas',
        dateInit: now,
        dateEnd: now,
        typeContract: 'teste',
        time: '',
    }

    const response = await axios.post("http://localhost:3000/work", input)

    expect(response.status).toBe(422)
    const output = response.data

    expect(Object.keys(output)).toEqual(['message']);
    expect(output.message).toBe('O periodo é obrigatório')

})