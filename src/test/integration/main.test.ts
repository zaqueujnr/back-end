import axios from "axios";

axios.defaults.validateStatus = function () {
    return true;
}

// ############# COMPANY #############

test("Deve salvar uma empresa com sucesso", async () => {
    const input = {
        name: "DIAMANTE",
        email: "diamante@gmail.com",
        cnpj: "11152461000104",
        endereco: "Capivari de Baixo - SC"
    }

    const response = await axios.post("http://localhost:3000/company", input)
    expect(response.status).toBe(200)

    const output = response.data
    expect(output).toBe('')
})

test("Deve lançar um erro ao tentar salvar uma empresa CNPJ duplicado", async () => {
    const input = {
        name: "TRACTEBEL",
        email: "trc@gmail.com",
        cnpj: "64020385000131",
        endereco: "Capivari de Baixo - SC"
    }

    const response = await axios.post("http://localhost:3000/company", input)

    expect(response.status).toBe(200)
    const output = response.data
    expect(output).toBe('')

    const nextResponse = await axios.post("http://localhost:3000/company", input)

    expect(nextResponse.status).toBe(422)
    const nextOutput = nextResponse.data

    expect(nextOutput.message).toBe('CNPJ já está cadastrado')

})

test("Deve lançar um erro ao tentar salvar uma empresa com email inválido", async () => {
    const input = {
        name: "TRACTEBEL",
        email: "trcgmail.com",
        cnpj: "38162942000149",
        endereco: "Capivari de Baixo - SC"
    }

    const response = await axios.post("http://localhost:3000/company", input)

    expect(response.status).toBe(422)
    const output = response.data

    expect(output.message).toBe('O email é inválido')
})

// ############# PROFESSIONAL #############


test("Deve salvar um profissional com sucesso", async () => {
    const input = {
        professionalId: '550e8400-e29b-41d4-a716-446655440000',
        name: 'Zaqueu Junior',
        email: 'zaqueujunior1998@gmail.com',
        position: 'Programador',
        salary: 40000.00
    }

    const response = await axios.post("http://localhost:3000/professional", input)

    expect(response.status).toBe(200)
    const output = response.data;
    expect(output).toBe('')

})


// ############# WORK ###############

test("Deve salvar um trabalho com sucesso", async () => {
    const input = {
        description: "TRABALHO ACESSO A CORDA...",
        dateInit: new Date(2025, 4 , 10),
        dateEnd: new Date(2025, 6, 10),
        typeContract:  'teste',
        time:  'teste',
        // companyId: '',
    }

    const response = await axios.post("http://localhost:3000/work", input)

    expect(response.status).toBe(200)
    
    const output = response.data;
    expect(output).toBe('')
})
