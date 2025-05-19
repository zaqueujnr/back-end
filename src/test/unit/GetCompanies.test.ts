import GetCompanies from "../../application/GetCompanies"
import Company from "../../domain/Company"
import CompanyRepository from "../../infra/repository/CompanyRepository"

let companyRepository: CompanyRepository
let getCompaniesUseCase: GetCompanies
let wasCalledOnGet: any = undefined
let mocks: any;

const resetFakeFlags = () => {
    wasCalledOnGet = undefined
}

beforeAll(() => {
    mocks = [
        {
            id: 'dab8e505-eb33-488f-8e14-700c1906330c',
            name: 'TechNova Solutions',
            cnpj: '12345678000190',
            endereco: 'Av. Paulista, 1000 - Bela Vista, São Paulo - SC',
            email: 'contato@technova.com.br'
        },
        {
            id: 'cd763c6a-3a4a-442d-baca-5e720245ccf9',
            name: 'Verde Campo Orgânicos',
            cnpj: '09876543000155',
            endereco: 'Rodovia BR-116, km 123 - Zona Rural, Curitiba - SC',
            email: 'sac@verdecampo.com.br'
        },
    ];
})

beforeEach(() => {
    resetFakeFlags()
    companyRepository = {
        saveCompany: async (): Promise<any> => { },
        updateCompany: async (): Promise<any> => { },
        getCompanies: async ({
            filters = {},
            limit,
            page
        }: {
            filters?: Record<string, any>,
            limit?: number,
            page?: number,
        } = {}): Promise<any> => {
            wasCalledOnGet = { filters, limit, page }

            const companies = mocks.map((company: any): Company => (
                new Company(company.id, company.name, company.cnpj, company.email, company.endereco)))

            return { companies, total: 2, totalPages: 1 }
        },
        getCompanyById: async (): Promise<any> => { },
        existsByCNPJ: async (): Promise<any> => { },
        existsByEmail: async (): Promise<any> => { },
    } as CompanyRepository

    getCompaniesUseCase = new GetCompanies(companyRepository)
})

it("deve retornar todas as empresas", async () => {

    const result = await getCompaniesUseCase.execute()
    expect(wasCalledOnGet.filters).toEqual({})
    expect(wasCalledOnGet.limit).toBeUndefined()
    expect(wasCalledOnGet.page).toBeUndefined()

    expect(result.total).toBe(2)
    expect(result.totalPages).toBe(1)
    expect(result.companies).toHaveLength(2)

})

it("deve aplicar filtro ao buscar empresa", async () => {

    const params = {
        filters: { keywords: 'sdfs' },
    }

    const result = await getCompaniesUseCase.execute(params)
    expect(wasCalledOnGet.filters).toEqual(params.filters)
    expect(wasCalledOnGet.limit).toBeUndefined()
    expect(wasCalledOnGet.page).toBeUndefined()

    expect(result.total).toBe(2)
    expect(result.totalPages).toBe(1)
    expect(result.companies).toHaveLength(2)
})

it("deve aplicar paginação ao buscar empresa", async () => {

    const result = await getCompaniesUseCase.execute(
        {
            limit: 6,
            page: 1
        }
    )

    expect(wasCalledOnGet.limit).toBe(6)
    expect(wasCalledOnGet.page).toBe(1)

    expect(result.total).toBe(2)
    expect(result.totalPages).toBe(1)
    expect(result.companies).toHaveLength(2)
})

it("deve aplicar paginação com filtro ao buscar empresa", async () => {
    const params = {
        filters: { keywords: 'teste' },
        page: 1,
        limit: 6,

    }
    const result = await getCompaniesUseCase.execute(
        params
    )
    expect(wasCalledOnGet.filters).toEqual(params.filters)
    expect(wasCalledOnGet.limit).toBe(6)
    expect(wasCalledOnGet.page).toBe(1)

    expect(result.total).toBe(2)
    expect(result.totalPages).toBe(1)
    expect(result.companies).toHaveLength(2)
})

it("deve retornar lista vazia se não houver empresas", async () => {
    
    companyRepository.getCompanies = async () => ({
        companies: [],
        total: 0,
        totalPages: 0,
    })

    const result = await getCompaniesUseCase.execute()

    expect(result.companies).toEqual([])
    expect(result.total).toBe(0)
    expect(result.totalPages).toBe(0)
})