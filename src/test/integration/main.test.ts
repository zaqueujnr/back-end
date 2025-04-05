import axios from "axios";
import { pgPromiseConnection } from "../../infra/database/DatabaseConnection";

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
describe.only("Testes works", () => {
  const now = new Date().toISOString();
  let input: any;

  beforeAll(() => {
    input = [
      {
        description: 'ACESSO A CORDA',
        dateInit: now,
        dateEnd: now,
        typeContract: 'Indeterminado',
        time: 'Integral'
      },
      {
        description: 'PINTOR',
        dateInit: now,
        dateEnd: now,
        typeContract: 'Temporario',
        time: 'Noturno'
      },
      {
        description: 'ACESSO ESPACO CONFINADO',
        dateInit: now,
        dateEnd: now,
        typeContract: 'Temporario',
        time: 'Noturno'
      }
    ];
  })
  beforeEach(async () => {
    await pgPromiseConnection.query("DELETE FROM work", []);
  })
  afterAll(async () => {
    await pgPromiseConnection.query("DELETE FROM work", []);
    await pgPromiseConnection.end();
  });

  it("Deve salvar um trabalho com sucesso", async () => {
    const input = {
      description: "TRABALHO CA...",
      dateInit: new Date(2025, 4, 10),
      dateEnd: new Date(2025, 6, 10),
      typeContract: 'teste3',
      time: 'teste3',
    }

    const response = await axios.post("http://localhost:3000/work", input)

    expect(response.status).toBe(201)

    const output = response.data;
    // implementar return id banco
    expect(output).toStrictEqual({})
  })

  it("Deve buscar todos os trabalhos com sucesso", async () => {
    const res1 = await axios.post("http://localhost:3000/work", input[0]);
    const res2 = await axios.post("http://localhost:3000/work", input[1]);
    const res3 = await axios.post("http://localhost:3000/work", input[2]);

    expect(res1.status).toBe(201)
    expect(res2.status).toBe(201)
    expect(res3.status).toBe(201)

    const response = await axios.get("http://localhost:3000/work")

    expect(response.status).toBe(200)

    const { works: output } = response.data;

    expect(Array.isArray(output)).toBe(true)

    expect(output.length).toBe(3)

    output.forEach((item: any) => {
      expect(item).toMatchObject({
        description: expect.any(String),
        dateInit: expect.any(String),
        dateEnd: expect.any(String),
        typeContract: expect.any(String),
        time: expect.any(String),
      })
    });
  })

  it("Deve retornar os trabalhos com a palavra chave na descrição", async () => {
    const res1 = await axios.post("http://localhost:3000/work", input[0]);
    const res2 = await axios.post("http://localhost:3000/work", input[1]);
    const res3 = await axios.post("http://localhost:3000/work", input[2]);

    expect(res1.status).toBe(201)
    expect(res2.status).toBe(201)
    expect(res3.status).toBe(201)

    const params = {
      filters: {
        keywords: 'ace'
      }
    }

    const response = await axios.get("http://localhost:3000/work", { params });

    expect(response.status).toBe(200);

    const output = response.data.works;

    expect(output.length).toBe(2);
    expect(output.every((w: any) => w.description.toLowerCase().includes("ace"))).toBe(true);
  });

  it("Deve retornar os trabalhos com a palavra chave no tipo de contrato", async () => {
    const res1 = await axios.post("http://localhost:3000/work", input[0]);
    const res2 = await axios.post("http://localhost:3000/work", input[1]);
    const res3 = await axios.post("http://localhost:3000/work", input[2]);

    expect(res1.status).toBe(201)
    expect(res2.status).toBe(201)
    expect(res3.status).toBe(201)

    const params = {
      filters: {
        keywords: 'temp'
      }
    }

    const response = await axios.get("http://localhost:3000/work", { params });

    expect(response.status).toBe(200);

    const output = response.data.works;

    expect(output.length).toBe(2);
    expect(output.every((w: any) => w.typeContract.toLowerCase().includes("temp"))).toBe(true);
  });

  it("Deve retornar os trabalhos com a palavra chave no periodo", async () => {
    const res1 = await axios.post("http://localhost:3000/work", input[0]);
    const res2 = await axios.post("http://localhost:3000/work", input[1]);
    const res3 = await axios.post("http://localhost:3000/work", input[2]);

    expect(res1.status).toBe(201)
    expect(res2.status).toBe(201)
    expect(res3.status).toBe(201)

    const params = {
      filters: {
        keywords: 'not'
      }
    }

    const response = await axios.get("http://localhost:3000/work", { params });

    expect(response.status).toBe(200);

    const output = response.data.works;

    expect(output.length).toBe(2);
    expect(output.every((w: any) => w.time.toLowerCase().includes("not"))).toBe(true);
  });

  it("Deve ignorar os trabalhos sem a palavra-chave na descrição", async () => {
    const res1 = await axios.post("http://localhost:3000/work", input[0]);
    const res2 = await axios.post("http://localhost:3000/work", input[1]);
    const res3 = await axios.post("http://localhost:3000/work", input[2]);

    expect(res1.status).toBe(201)
    expect(res2.status).toBe(201)
    expect(res3.status).toBe(201)

    const params = {
      filters: {
        keywords: 'ape'
      }
    }

    const response = await axios.get("http://localhost:3000/work", { params });

    expect(response.status).toBe(200);

    const output = response.data.works;
    expect(Array.isArray(output)).toBe(true);
    expect(output.length).toBe(0);
    expect(output.every((w: any) => !w.description.toLowerCase().includes("ape"))).toBe(true);
  })

  it("Deve ignorar os trabalhos sem a palavra-chave no tipo de contrato", async () => {
    const res1 = await axios.post("http://localhost:3000/work", input[0]);
    const res2 = await axios.post("http://localhost:3000/work", input[1]);
    const res3 = await axios.post("http://localhost:3000/work", input[2]);

    expect(res1.status).toBe(201)
    expect(res2.status).toBe(201)
    expect(res3.status).toBe(201)

    const params = {
      filters: {
        keywords: 'ape'
      }
    }

    const response = await axios.get("http://localhost:3000/work", { params });

    expect(response.status).toBe(200);

    const output = response.data.works;

    expect(Array.isArray(output)).toBe(true);
    expect(output.length).toBe(0);
    expect(output.every((w: any) => !w.typeContract.toLowerCase().includes("ape"))).toBe(true);
  })

  it("Deve ignorar os trabalhos sem a palavra-chave no periodo", async () => {
    const res1 = await axios.post("http://localhost:3000/work", input[0]);
    const res2 = await axios.post("http://localhost:3000/work", input[1]);
    const res3 = await axios.post("http://localhost:3000/work", input[2]);

    expect(res1.status).toBe(201)
    expect(res2.status).toBe(201)
    expect(res3.status).toBe(201)

    const params = {
      filters: {
        keywords: 'ape'
      }
    }

    const response = await axios.get("http://localhost:3000/work", { params });

    expect(response.status).toBe(200);

    const output = response.data.works;
    expect(Array.isArray(output)).toBe(true);
    expect(output.length).toBe(0);
    expect(output.every((w: any) => !w.time.toLowerCase().includes("ape"))).toBe(true);
  })

  it("Deve paginar corretamente os resultados", async () => {
    const works = Array.from({ length: 8 }, (_, i) => ({
      description: `Trabalho ${i + 1}`,
      dateInit: now,
      dateEnd: now,
      typeContract: 'Temporário',
      time: 'Integral',
    }))

    for (const work of works) {
      const response = await axios.post("http://localhost:3000/work", work);
      expect(response.status).toBe(201);
    }

    const resPage1 = await axios.get("http://localhost:3000/work", {
      params: {
        keywords: 'temporario',
        limit: 5,
        page: 1,
      },
    })

    const resPage2 = await axios.get("http://localhost:3000/work", {
      params: {
        keywords: 'temporario',
        limit: 5,
        page: 2,
      },
    })
    
    expect(resPage1.status).toBe(200)
    expect(resPage2.status).toBe(200)

    const page1 = resPage1.data.works;
    const page2 = resPage2.data.works;

    expect(page1.length).toBe(5)
    expect(page2.length).toBe(3)
  })

})
