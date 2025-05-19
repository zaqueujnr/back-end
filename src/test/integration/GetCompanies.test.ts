import axios from "axios";
// import { PgPromiseAdapter } from "../../infra/database/DatabaseConnection";
import pgPromiseConnection from "../../infra/database/pgPromiseConnection";

axios.defaults.validateStatus = function () {
    return true;
}
let input: any;
let db: any

beforeAll(() => {
    // db = new PgPromiseAdapter()

    input = [
        {
            name: 'Diamante Energia Brasil',
            cnpj: '59595247000140',
            email: 'diamante@gmail.com',
            endereco: 'Av. Altamiro Guimarães, Centro - SC',
        }, {
            name: 'Brasil ao Cubo',
            cnpj: '66604308000154',
            email: 'aocubo@gmail.com',
            endereco: 'Av. Altamiro Guimarães, Centro - SC',
        }, {
            name: 'Express',
            cnpj: '90377252000127',
            email: 'express@hotmail.com',
            endereco: 'Rua Altamiro Guimarães, Centro - SC',
        }, {
            name: 'TechNova Solutions',
            cnpj: '12345678000190',
            email: 'contato@technova.com.br',
            endereco: 'Av. Paulista, 1000 - Bela Vista, São Paulo - SC'
        },
        {
            name: 'Verde Campo Orgânicos',
            cnpj: '09876543000155',
            email: 'sac@verdecampo.com.br',
            endereco: 'Rodovia BR-116, km 123 - Zona Rural, Curitiba - SC'
        },
        {
            name: 'Blue Ocean TI',
            cnpj: '45678912000133',
            email: 'suporte@blueocean.com',
            endereco: 'Rua das Palmeiras, 250 - Centro, Florianópolis - SC'
        },
        {
            name: 'Alvo Logística',
            cnpj: '33445566000122',
            email: 'logistica@alvo.com.br',
            endereco: 'Rua Miguel Sutil, 750 - Porto, Cuiabá - SC'
        },
        {
            name: 'Lumina Educacional',
            cnpj: '77889900000144',
            email: 'atendimento@luminaedu.com',
            endereco: 'Rua das Acácias, 45 - Jardim Botânico, Rio de Janeiro - RJ'
        }
    ];
})

beforeEach(async () => {
    await pgPromiseConnection.query("DELETE FROM company", []);
})
afterAll(async () => {
    await pgPromiseConnection.query("DELETE FROM company", []);
    await pgPromiseConnection.end();
});

it("Deve buscar todas as empresas com sucesso", async () => {
    const res1 = await axios.post("http://api:3000/company", input[0]);
    const res2 = await axios.post("http://api:3000/company", input[1]);
    const res3 = await axios.post("http://api:3000/company", input[2]);

    expect(res1.status).toBe(201)
    expect(res2.status).toBe(201)
    expect(res3.status).toBe(201)
    const response = await axios.get("http://api:3000/company")

    expect(response.status).toBe(200)

    const { companies: output } = response.data;

    expect(Array.isArray(output)).toBe(true)
    expect(output.length).toBe(3)

    output.forEach((item: any) => {
        expect(item).toStrictEqual({
            companyId: expect.any(String),
            name: expect.any(String),
            cnpj: expect.any(String),
            email: expect.any(String),
            endereco: expect.any(String),
        })
    });
})

it("Deve retornar as empresas com a palavra chave no nome", async () => {
    const res1 = await axios.post("http://api:3000/company", input[0]);
    const res2 = await axios.post("http://api:3000/company", input[1]);
    const res3 = await axios.post("http://api:3000/company", input[2]);

    expect(res1.status).toBe(201)
    expect(res2.status).toBe(201)
    expect(res3.status).toBe(201)

    const params = {
        filters: {
            keywords: 'bra'
        }
    }

    const response = await axios.get("http://api:3000/company", { params });

    expect(response.status).toBe(200);

    const { companies: output } = response.data;

    expect(output.length).toBe(2);

    output.forEach((item: any) => {
        expect(item).toStrictEqual({
            companyId: expect.any(String),
            name: expect.any(String),
            cnpj: expect.any(String),
            email: expect.any(String),
            endereco: expect.any(String),
        })
    });

    expect(output.every((w: any) => w.name.toLowerCase().includes("bra"))).toBe(true);
});

it("Deve retornar as empresas com a palavra chave no email", async () => {
    const res1 = await axios.post("http://api:3000/company", input[0]);
    const res2 = await axios.post("http://api:3000/company", input[1]);
    const res3 = await axios.post("http://api:3000/company", input[2]);

    expect(res1.status).toBe(201)
    expect(res2.status).toBe(201)
    expect(res3.status).toBe(201)

    const params = {
        filters: {
            keywords: 'gma'
        }
    }

    const response = await axios.get("http://api:3000/company", { params });

    expect(response.status).toBe(200);

    const { companies: output } = response.data;

    expect(output.length).toBe(2);

    output.forEach((item: any) => {
        expect(item).toStrictEqual({
            companyId: expect.any(String),
            name: expect.any(String),
            cnpj: expect.any(String),
            email: expect.any(String),
            endereco: expect.any(String),
        })
    });

    expect(output.every((w: any) => w.email.toLowerCase().includes("gma"))).toBe(true);
});

it("Deve retornar as empresas com a palavra chave no endereco", async () => {
    const res1 = await axios.post("http://api:3000/company", input[0]);
    const res2 = await axios.post("http://api:3000/company", input[1]);
    const res3 = await axios.post("http://api:3000/company", input[2]);

    expect(res1.status).toBe(201)
    expect(res2.status).toBe(201)
    expect(res3.status).toBe(201)

    const params = {
        filters: {
            keywords: 'av'
        }
    }

    const response = await axios.get("http://api:3000/company", { params });

    expect(response.status).toBe(200);

    const { companies: output } = response.data;

    expect(output.length).toBe(2);

    output.forEach((item: any) => {
        expect(item).toStrictEqual({
            companyId: expect.any(String),
            name: expect.any(String),
            cnpj: expect.any(String),
            email: expect.any(String),
            endereco: expect.any(String),
        })
    });

    expect(output.every((w: any) => w.endereco.toLowerCase().includes("av"))).toBe(true);
});

it("Deve ignorar as empresas sem a palavra-chave no nome", async () => {
    const res1 = await axios.post("http://api:3000/company", input[0]);
    const res2 = await axios.post("http://api:3000/company", input[1]);
    const res3 = await axios.post("http://api:3000/company", input[2]);

    expect(res1.status).toBe(201)
    expect(res2.status).toBe(201)
    expect(res3.status).toBe(201)

    const params = {
        filters: {
            keywords: 'ape'
        }
    }

    const response = await axios.get("http://api:3000/company", { params });

    expect(response.status).toBe(200);

    const { companies: output } = response.data;
    expect(Array.isArray(output)).toBe(true);
    expect(output.length).toBe(0);
    expect(output.every((w: any) => !w.name.toLowerCase().includes("ape"))).toBe(true);
})

it("Deve ignorar as empresas sem a palavra-chave no email", async () => {
    const res1 = await axios.post("http://api:3000/company", input[0]);
    const res2 = await axios.post("http://api:3000/company", input[1]);
    const res3 = await axios.post("http://api:3000/company", input[2]);

    expect(res1.status).toBe(201)
    expect(res2.status).toBe(201)
    expect(res3.status).toBe(201)

    const params = {
        filters: {
            keywords: 'ape'
        }
    }

    const response = await axios.get("http://api:3000/company", { params });

    expect(response.status).toBe(200);

    const { companies: output } = response.data;

    expect(Array.isArray(output)).toBe(true);
    expect(output.length).toBe(0);
    expect(output.every((w: any) => !w.email.toLowerCase().includes("ape"))).toBe(true);
})

it("Deve ignorar as empresas sem a palavra-chave no endereço", async () => {
    const res1 = await axios.post("http://api:3000/company", input[0]);
    const res2 = await axios.post("http://api:3000/company", input[1]);
    const res3 = await axios.post("http://api:3000/company", input[2]);

    expect(res1.status).toBe(201)
    expect(res2.status).toBe(201)
    expect(res3.status).toBe(201)

    const params = {
        filters: {
            keywords: 'ape'
        }
    }

    const response = await axios.get("http://api:3000/company", { params });

    expect(response.status).toBe(200);

    const { companies: output } = response.data;

    expect(Array.isArray(output)).toBe(true);
    expect(output.length).toBe(0);
    expect(output.every((w: any) => !w.endereco.toLowerCase().includes("ape"))).toBe(true);
})

it("Deve paginar corretamente os resultados", async () => {

    for (const company of input) {
        const response = await axios.post("http://api:3000/company", company);
        expect(response.status).toBe(201);
    }

    const resPage1 = await axios.get("http://api:3000/company", {
        params: {
            filters: { keywords: 'sc' },
            limit: 5,
            page: 1,
        },
    })

    const resPage2 = await axios.get("http://api:3000/company", {
        params: {
            filters: { keywords: 'sc' },
            limit: 5,
            page: 2,
        },
    })

    expect(resPage1.status).toBe(200)
    expect(resPage2.status).toBe(200)

    const page1 = resPage1.data.companies;
    const page2 = resPage2.data.companies;    

    expect(page1.length).toBe(5)
    expect(page2.length).toBe(2)
})
