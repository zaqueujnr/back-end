import axios from "axios";
// import { PgPromiseAdapter } from "../../infra/database/DatabaseConnection";
import pgPromiseConnection from "../../infra/database/pgPromiseConnection";

const now = new Date().toISOString();
let input: any;
let db: any

axios.defaults.validateStatus = function () {
    return true;
}

beforeAll(() => {
    // db = new PgPromiseAdapter()
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

it("Deve buscar todos os trabalhos com sucesso", async () => {
    const res1 = await axios.post("http://api:3000/work", input[0]);
    const res2 = await axios.post("http://api:3000/work", input[1]);
    const res3 = await axios.post("http://api:3000/work", input[2]);

    expect(res1.status).toBe(201)
    expect(res2.status).toBe(201)
    expect(res3.status).toBe(201)

    const response = await axios.get("http://api:3000/work")

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
    const res1 = await axios.post("http://api:3000/work", input[0]);
    const res2 = await axios.post("http://api:3000/work", input[1]);
    const res3 = await axios.post("http://api:3000/work", input[2]);

    expect(res1.status).toBe(201)
    expect(res2.status).toBe(201)
    expect(res3.status).toBe(201)

    const params = {
        filters: {
            keywords: 'ace'
        }
    }

    const response = await axios.get("http://api:3000/work", { params });

    expect(response.status).toBe(200);

    const output = response.data.works;

    expect(output.length).toBe(2);
    expect(output.every((w: any) => w.description.toLowerCase().includes("ace"))).toBe(true);
});

it("Deve retornar os trabalhos com a palavra chave no tipo de contrato", async () => {
    const res1 = await axios.post("http://api:3000/work", input[0]);
    const res2 = await axios.post("http://api:3000/work", input[1]);
    const res3 = await axios.post("http://api:3000/work", input[2]);

    expect(res1.status).toBe(201)
    expect(res2.status).toBe(201)
    expect(res3.status).toBe(201)

    const params = {
        filters: {
            keywords: 'temp'
        }
    }

    const response = await axios.get("http://api:3000/work", { params });

    expect(response.status).toBe(200);

    const output = response.data.works;

    expect(output.length).toBe(2);
    expect(output.every((w: any) => w.typeContract.toLowerCase().includes("temp"))).toBe(true);
});

it("Deve retornar os trabalhos com a palavra chave no periodo", async () => {
    const res1 = await axios.post("http://api:3000/work", input[0]);
    const res2 = await axios.post("http://api:3000/work", input[1]);
    const res3 = await axios.post("http://api:3000/work", input[2]);

    expect(res1.status).toBe(201)
    expect(res2.status).toBe(201)
    expect(res3.status).toBe(201)

    const params = {
        filters: {
            keywords: 'not'
        }
    }

    const response = await axios.get("http://api:3000/work", { params });

    expect(response.status).toBe(200);

    const output = response.data.works;

    expect(output.length).toBe(2);
    expect(output.every((w: any) => w.time.toLowerCase().includes("not"))).toBe(true);
});

it("Deve ignorar os trabalhos sem a palavra-chave na descrição", async () => {
    const res1 = await axios.post("http://api:3000/work", input[0]);
    const res2 = await axios.post("http://api:3000/work", input[1]);
    const res3 = await axios.post("http://api:3000/work", input[2]);

    expect(res1.status).toBe(201)
    expect(res2.status).toBe(201)
    expect(res3.status).toBe(201)

    const params = {
        filters: {
            keywords: 'ape'
        }
    }

    const response = await axios.get("http://api:3000/work", { params });

    expect(response.status).toBe(200);

    const output = response.data.works;
    expect(Array.isArray(output)).toBe(true);
    expect(output.length).toBe(0);
    expect(output.every((w: any) => !w.description.toLowerCase().includes("ape"))).toBe(true);
})

it("Deve ignorar os trabalhos sem a palavra-chave no tipo de contrato", async () => {
    const res1 = await axios.post("http://api:3000/work", input[0]);
    const res2 = await axios.post("http://api:3000/work", input[1]);
    const res3 = await axios.post("http://api:3000/work", input[2]);

    expect(res1.status).toBe(201)
    expect(res2.status).toBe(201)
    expect(res3.status).toBe(201)

    const params = {
        filters: {
            keywords: 'ape'
        }
    }

    const response = await axios.get("http://api:3000/work", { params });

    expect(response.status).toBe(200);

    const output = response.data.works;

    expect(Array.isArray(output)).toBe(true);
    expect(output.length).toBe(0);
    expect(output.every((w: any) => !w.typeContract.toLowerCase().includes("ape"))).toBe(true);
})

it("Deve ignorar os trabalhos sem a palavra-chave no periodo", async () => {
    const res1 = await axios.post("http://api:3000/work", input[0]);
    const res2 = await axios.post("http://api:3000/work", input[1]);
    const res3 = await axios.post("http://api:3000/work", input[2]);

    expect(res1.status).toBe(201)
    expect(res2.status).toBe(201)
    expect(res3.status).toBe(201)

    const params = {
        filters: {
            keywords: 'ape'
        }
    }

    const response = await axios.get("http://api:3000/work", { params });

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
        const response = await axios.post("http://api:3000/work", work);
        expect(response.status).toBe(201);
    }

    const resPage1 = await axios.get("http://api:3000/work", {
        params: {
            filters: { keywords: 'temp' },
            limit: 5,
            page: 1,
        },
    })

    const resPage2 = await axios.get("http://api:3000/work", {
        params: {
            filters: { keywords: 'temp' },
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
