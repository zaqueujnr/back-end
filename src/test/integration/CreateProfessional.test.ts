import axios from "axios";
import { pgPromiseConnection } from "../../infra/database/DatabaseConnection";

axios.defaults.validateStatus = function () {
    return true;
  }

beforeEach(async () => {
    await pgPromiseConnection.query("DELETE FROM professional", []);
})
afterAll(async () => {
    await pgPromiseConnection.query("DELETE FROM professional", []);
    await pgPromiseConnection.end();
});

it("Deve salvar um profissional com sucesso", async () => {

    const input = {
        name: 'Zaqueu Junior',
        email: 'zaqueujunior1998@gmail.com',
        position: 'Programador',
        salary: 40000.0
    }

    const response = await axios.post("http://localhost:3000/professional", input)

    expect(response.status).toBe(201)
    const output = response.data;

    expect(output.id).toBeDefined()
    expect(typeof output.id).toBe('string');
    expect(output.id).toMatch(/[a-z0-9\-]{36}/);

})

it("deve lançar um erro ao salvar um profissional com nome vazio", async () => {

    const input = {
        name: '',
        email: 'zaqueujunior1998@gmail.com',
        position: 'programador',
        salary: 9000.0,
    }

    const response = await axios.post("http://localhost:3000/professional", input)

    expect(response.status).toBe(422)
    const output = response.data

    expect(Object.keys(output)).toEqual(['message']);
    expect(output.message).toBe('O nome é obrigatório')

})

it("deve lançar um erro ao salvar um profissional com nome inválido", async () => {

    const input = {
        name: '454jaus#',
        email: 'zaqueujunior1998@gmail.com',
        position: 'programador',
        salary: 9000.0,
    }

    const response = await axios.post("http://localhost:3000/professional", input)

    expect(response.status).toBe(422)
    const output = response.data

    expect(Object.keys(output)).toEqual(['message']);
    expect(output.message).toBe('O nome é inválido')

})

it("deve lançar um erro ao salvar um profissional com email vazio", async () => {

    const input = {
        name: 'Zaqueu Junior',
        email: '',
        position: 'programador',
        salary: 9000.0,
    }

    const response = await axios.post("http://localhost:3000/professional", input)

    expect(response.status).toBe(422)
    const output = response.data

    expect(Object.keys(output)).toEqual(['message']);
    expect(output.message).toBe('O email é obrigatório')

})

it("deve lançar um erro ao salvar um profissional com email inválido", async () => {

    const input = {
        name: 'Zaqueu Junior',
        email: 'joao@ email.com',
        position: 'programador',
        salary: 9000.0,
    }

    const response = await axios.post("http://localhost:3000/professional", input)

    expect(response.status).toBe(422)
    const output = response.data

    expect(Object.keys(output)).toEqual(['message']);
    expect(output.message).toBe('O email é inválido')
    

})

it("deve lançar um erro ao salvar um profissional com email duplicado", async () => {
    const input = {
        name: 'Zaqueu Junior',
        email: 'joao@email.com',
        position: 'programador',
        salary: 9000.0,
    }

    const response1 = await axios.post("http://localhost:3000/professional", input)
    const output1 = response1.data
    expect(response1.status).toBe(201)

    expect(output1.id).toBeDefined()
    expect(typeof output1.id).toBe('string');
    expect(output1.id).toMatch(/[a-z0-9\-]{36}/);

    const response2 = await axios.post("http://localhost:3000/professional", input)
    const output2 = response2.data
    expect(response2.status).toBe(422)

    expect(Object.keys(output2)).toEqual(['message']);
    expect(output2.message).toBe('O email já está cadastrado')

})

it("deve lançar um erro ao salvar um profissional com ocupação vazia", async () => {

    const input = {
        name: 'Zaqueu Junior',
        email: 'zaqueujunior1998@gmail.com',
        position: '',
        salary: 90000,
    }

    const response = await axios.post("http://localhost:3000/professional", input)
    const output = response.data
    expect(response.status).toBe(422)

    expect(Object.keys(output)).toEqual(['message']);
    expect(output.message).toBe('A ocupação é obrigatório')

})

it("deve lançar um erro ao salvar um profissional com salario vazio", async () => {

    const input = {
        name: 'Zaqueu Junior',
        email: 'zaqueujunior1998@gmail.com',
        position: 'programador',
        salary: 0,
    }

    const response = await axios.post("http://localhost:3000/professional", input)
    const output = response.data
    expect(response.status).toBe(422)

    expect(Object.keys(output)).toEqual(['message']);
    expect(output.message).toBe('O salario é obrigatório')

})