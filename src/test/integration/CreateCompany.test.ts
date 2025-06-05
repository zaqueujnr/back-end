import axios from "axios";
import pgPromiseConnection from "../../infra/database/pgPromiseConnection";

axios.defaults.validateStatus = function () {
    return true;
  }

beforeEach(async () => {
    await pgPromiseConnection.query("DELETE FROM company", []);
})
afterAll(async () => {
    await pgPromiseConnection.query("DELETE FROM company", []);
    await pgPromiseConnection.end();
});

it("Deve salvar uma empresa com sucesso", async () => {

    const input = {
        name: 'Brazil Sistem',
        cnpj: '11484189000151',
        email: 'brazilsis@gmail.com',
        endereco: 'Rua Altamiro Guimaraes, Revoredo',
    }

    const response = await axios.post("http://app-node:3000/company", input)

    expect(response.status).toBe(201)
    const output = response.data;

    expect(output.id).toBeDefined()
    expect(typeof output.id).toBe('string');
    expect(output.id).toMatch(/[a-z0-9\-]{36}/);

})

it("deve lançar um erro ao salvar uma empresa com nome vazio", async () => {

    const input = {
        name: '',
        cnpj: '11484189000151',
        email: 'brazilsis@gmail.com',
        endereco: 'Rua Altamiro Guimaraes, Revoredo',
    }

    const response = await axios.post("http://app-node:3000/company", input)

    expect(response.status).toBe(422)
    const output = response.data

    expect(Object.keys(output)).toEqual(['message']);
    expect(output.message).toBe('O nome é obrigatório')

})

it("deve lançar um erro ao salvar uma empresa com cnpj inválido", async () => {

    const input = {
        name: 'Brazil sistem',
        cnpj: '1148410051',
        email: 'brazilsis@gmail.com',
        endereco: 'Rua Altamiro Guimaraes, Revoredo',
    }

    const response = await axios.post("http://app-node:3000/company", input)

    expect(response.status).toBe(422)
    const output = response.data

    expect(Object.keys(output)).toEqual(['message']);
    expect(output.message).toBe('O CNPJ é inválido')

})

it("deve lançar um erro ao salvar uma empresa com cnpj duplicado", async () => {

    const input = [{
        name: 'Brazil Sistem',
        cnpj: '11484189000151',
        email: 'brazilsis@gmail.com',
        endereco: 'Rua Altamiro Guimaraes, Revoredo',
    }, {
        name: 'Brazil Sistem',
        cnpj: '11484189000151',
        email: 'brazilsis2@gmail.com',
        endereco: 'Rua Altamiro Guimaraes, Revoredo',
    }]

    const response1 = await axios.post("http://app-node:3000/company", input[0])

    expect(response1.status).toBe(201)
    const output1 = response1.data;

    expect(output1.id).toBeDefined()
    expect(typeof output1.id).toBe('string');
    expect(output1.id).toMatch(/[a-z0-9\-]{36}/);

    const response2 = await axios.post("http://app-node:3000/company", input[1])

    expect(response2.status).toBe(422)
    const output = response2.data

    expect(Object.keys(output)).toEqual(['message']);
    expect(output.message).toBe('CNPJ já está cadastrado')

})

it("deve lançar um erro ao salvar uma empresa com email inválido", async () => {

    const input = {
        name: 'Brazil Sistem',
        cnpj: '11484189000151',
        email: 'brazils isgmail.com',
        endereco: 'Rua Altamiro Guimaraes, Revoredo',
    }

    const response = await axios.post("http://app-node:3000/company", input)


    expect(response.status).toBe(422)
    const output = response.data

    expect(Object.keys(output)).toEqual(['message']);
    expect(output.message).toBe('O email é inválido')
    

})

it("deve lançar um erro ao salvar uma empresa com email duplicado", async () => {
    const input = [{
        name: 'Brazil Sistem',
        cnpj: '11484189000151',
        email: 'brazilsis@gmail.com',
        endereco: 'Rua Altamiro Guimaraes, Revoredo',
    }, {
        name: 'Brazil Sistem',
        cnpj: '11484189000155',
        email: 'brazilsis@gmail.com',
        endereco: 'Rua Altamiro Guimaraes, Revoredo',
    }]

    const response1 = await axios.post("http://app-node:3000/company", input[0])
    const output1 = response1.data
    expect(response1.status).toBe(201)

    expect(output1.id).toBeDefined()
    expect(typeof output1.id).toBe('string');
    expect(output1.id).toMatch(/[a-z0-9\-]{36}/);

    const response2 = await axios.post("http://app-node:3000/company", input[1])
    const output2 = response2.data
    expect(response2.status).toBe(422)

    expect(Object.keys(output2)).toEqual(['message']);
    expect(output2.message).toBe('Email já está cadastrado')

})

it("deve lançar um erro ao salvar uma empresa com email vazio", async () => {

    const input = {
        name: 'Brazil Sistem',
        cnpj: '11484189000151',
        email: '',
        endereco: 'Rua Altamiro Guimaraes, Revoredo',
    }

    const response = await axios.post("http://app-node:3000/company", input)

    expect(response.status).toBe(422)
    const output = response.data

    expect(Object.keys(output)).toEqual(['message']);
    expect(output.message).toBe('O email é obrigatório')
    

})

it("deve lançar um erro ao salvar uma empresa endereco vazio", async () => {

    const input = {
        name: 'Brazil Sistem',
        cnpj: '11484189000151',
        email: 'brazilsis@gmail.com',
        endereco: '',
    }

    const response = await axios.post("http://app-node:3000/company", input)

    const output = response.data
    expect(response.status).toBe(422)

    expect(Object.keys(output)).toEqual(['message']);
    expect(output.message).toBe('O endereço é obrigatório')

})
