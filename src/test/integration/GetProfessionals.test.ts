import axios from "axios";
import pgPromiseConnection from "../../infra/database/pgPromiseConnection";

let input: any;
let db: any

axios.defaults.validateStatus = function () {
    return true;
}

beforeAll(() => {

    input = [
        {
            name: 'Zaqueu Vieira Junior',
            email: 'zaqueu@gmail.com',
            position: 'ENGENHEIRO',
            salary: 20000.3,
        },
        {
            name: 'Felipe Vieira',
            email: 'felipe@gmail.com',
            position: 'ACESSO A CORDA',
            salary: 20000.3,
        },
        {
            name: 'Matheus Franco',
            email: 'mathues@hotmail.com',
            position: 'ENGENHEIRO',
            salary: 20000.3,
        },
    ];
})

beforeEach(async () => {
    await pgPromiseConnection.query("DELETE FROM professional", []);
})
afterAll(async () => {
    await pgPromiseConnection.query("DELETE FROM professional", []);
    await pgPromiseConnection.end();
});

it("Deve buscar todos os profissionais com sucesso", async () => {
    const res1 = await axios.post("http://app-node:3000/professional", input[0]);
    const res2 = await axios.post("http://app-node:3000/professional", input[1]);
    const res3 = await axios.post("http://app-node:3000/professional", input[2]);

    expect(res1.status).toBe(201)
    expect(res2.status).toBe(201)
    expect(res3.status).toBe(201)

    const response = await axios.get("http://app-node:3000/professional")

    expect(response.status).toBe(200)

    const { professionals: output } = response.data;

    expect(Array.isArray(output)).toBe(true)
    expect(output.length).toBe(3)

    output.forEach((professional: any) => {
        expect(professional).toMatchObject({
            name: expect.any(String),
            email: expect.any(String),
            position: expect.any(String),
            salary: expect.any(Number),
        })
    });
})

it("Deve retornar os profissionais com a palavra chave no nome", async () => {
    const res1 = await axios.post("http://app-node:3000/professional", input[0]);
    const res2 = await axios.post("http://app-node:3000/professional", input[1]);
    const res3 = await axios.post("http://app-node:3000/professional", input[2]);

    expect(res1.status).toBe(201)
    expect(res2.status).toBe(201)
    expect(res3.status).toBe(201)

    const params = {
        filters: {
            keywords: 'vie'
        }
    }

    const response = await axios.get("http://app-node:3000/professional", { params });

    expect(response.status).toBe(200);

    const { professionals: output } = response.data;

    expect(output.length).toBe(2);
    expect(output.every((w: any) => w.name.toLowerCase().includes("vie"))).toBe(true);
});

it("Deve retornar os profissionais com a palavra chave no email", async () => {
    const res1 = await axios.post("http://app-node:3000/professional", input[0]);
    const res2 = await axios.post("http://app-node:3000/professional", input[1]);
    const res3 = await axios.post("http://app-node:3000/professional", input[2]);

    expect(res1.status).toBe(201)
    expect(res2.status).toBe(201)
    expect(res3.status).toBe(201)

    const params = {
        filters: {
            keywords: 'gma'
        }
    }

    const response = await axios.get("http://app-node:3000/professional", { params });

    expect(response.status).toBe(200);

    const { professionals: output } = response.data;

    expect(output.length).toBe(2);
    expect(output.every((w: any) => w.email.toLowerCase().includes("gma"))).toBe(true);
});

it("Deve retornar os profissionais com a palavra chave position", async () => {
    const res1 = await axios.post("http://app-node:3000/professional", input[0]);
    const res2 = await axios.post("http://app-node:3000/professional", input[1]);
    const res3 = await axios.post("http://app-node:3000/professional", input[2]);

    expect(res1.status).toBe(201)
    expect(res2.status).toBe(201)
    expect(res3.status).toBe(201)

    const params = {
        filters: {
            keywords: 'eng'
        }
    }

    const response = await axios.get("http://app-node:3000/professional", { params });

    expect(response.status).toBe(200);

    const { professionals: output } = response.data;

    expect(output.length).toBe(2);
    expect(output.every((w: any) => w.position.toLowerCase().includes("eng"))).toBe(true);
});

it("Deve ignorar os profissionais sem a palavra-chave", async () => {
    const res1 = await axios.post("http://app-node:3000/professional", input[0]);
    const res2 = await axios.post("http://app-node:3000/professional", input[1]);
    const res3 = await axios.post("http://app-node:3000/professional", input[2]);

    expect(res1.status).toBe(201)
    expect(res2.status).toBe(201)
    expect(res3.status).toBe(201)

    const params = {
        filters: {
            keywords: 'ape'
        }
    }

    const response = await axios.get("http://app-node:3000/professional", { params });

    expect(response.status).toBe(200);

    const { professionals: output } = response.data;

    expect(Array.isArray(output)).toBe(true);
    expect(output.length).toBe(0);
    expect(output.every((w: any) => !w.name.toLowerCase().includes("ape"))).toBe(true);
    expect(output.every((w: any) => !w.email.toLowerCase().includes("ape"))).toBe(true);
    expect(output.every((w: any) => !w.position.toLowerCase().includes("ape"))).toBe(true);
})

it("Deve paginar corretamente os resultados", async () => {
    const professionals = [
        {
            name: 'Zaqueu Vieira',
            email: 'zaqueu@gmail.com',
            position: 'TI',
            salary: 20000.03,
        }, {
            name: 'Felipe Vieira',
            email: 'felipe@gmail.com',
            position: 'CALDEIREIRO',
            salary: 20000.03,
        }, {
            name: 'Matheus Viana',
            email: 'matheus@gmail.com',
            position: 'PINTOR',
            salary: 20000.03,
        }, {
            name: 'Gabriel Vilela',
            email: 'gabriel@gmail.com',
            position: 'CARPINTEIRO',
            salary: 20000.03,
        }, {
            name: 'Bruno Vickert',
            email: 'bruno@gmail.com',
            position: 'MECANICO',
            salary: 20000.03,
        }, {
            name: 'mathias Viela',
            email: 'mathias@gmail.com',
            position: 'ACESSO A CORDA',
            salary: 20000.03,
        }, {
            name: 'marcos Vint',
            email: 'marcos@gmail.com',
            position: 'TI',
            salary: 20000.03,
        }, {
            name: 'Felipe Vineira',
            email: 'felip@gmail.com',
            position: 'TI',
            salary: 20000.03,
        },
    ]

    for (const professional of professionals) {
        const response = await axios.post("http://app-node:3000/professional", professional);
        expect(response.status).toBe(201);
    }

    const resPage1 = await axios.get("http://app-node:3000/professional", {
        params: {
            filters: { keywords: 'vi' },
            limit: 5,
            page: 1,
        },
    })

    const resPage2 = await axios.get("http://app-node:3000/professional", {
        params: {
            filters: { keywords: 'vi' },
            limit: 5,
            page: 2,
        },
    })

    expect(resPage1.status).toBe(200)
    expect(resPage2.status).toBe(200)

    const page1 = resPage1.data.professionals;
    const page2 = resPage2.data.professionals;

    expect(page1.length).toBe(5)
    expect(page2.length).toBe(3)
})
