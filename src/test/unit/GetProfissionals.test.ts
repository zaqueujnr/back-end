import GetProfessionals from "../../application/GetProfessionals"
import Professional from "../../domain/Professional"
import ProfessionalRepository from "../../infra/repository/ProfessionalRepository"

let professionalRepository: ProfessionalRepository
let getProfessionalsUseCase: GetProfessionals
let wasCalledOnGet: any = undefined
let mocks: any;

const resetFakeFlags = () => {
    wasCalledOnGet = undefined
}

beforeAll(() => {
    mocks = [
        {
            id: 'f1e84b6e-12b1-4c7e-98a1-d3123afbd7c9',
            name: 'Zaqueu Junior',
            email: 'zaqueujunior1998@gmail.com',
            position: 'programador',
            salary: 9000.0,
        },
        {
            id: 'a723ccdb-7639-4b0c-b527-51d07b2fa422',
            name: 'Lívia Santos',
            email: 'livia.santos@example.com',
            position: 'designer',
            salary: 7500.0,
        },
        {
            id: 'c32a6c91-9c63-4b8b-a726-5972fc5a842f',
            name: 'Carlos Henrique',
            email: 'carlos.henrique@example.com',
            position: 'analista de dados',
            salary: 8500.0,
        }
    ];

})

beforeEach(() => {
    resetFakeFlags()
    professionalRepository = {
        saveProfessional: async (): Promise<any> => { },
        updateProfessional: async (): Promise<any> => { },
        getProfessionals: async ({
            filters = {},
            limit,
            page
        }: {
            filters?: Record<string, any>,
            limit?: number,
            page?: number,
        } = {}): Promise<any> => {
            wasCalledOnGet = { filters, limit, page }

            const professionals = mocks.map((professional: any): Professional => (
                new Professional(professional.id, professional.name, professional.email, professional.position, professional.salary)))

                
            return { professionals, total: 3, totalPages: 1 }
        },
        existsByEmail: async (): Promise<any> => { },
    } as ProfessionalRepository

    getProfessionalsUseCase = new GetProfessionals(professionalRepository)
})

it("deve retornar todos os profissionais", async () => {

    const result = await getProfessionalsUseCase.execute()
    expect(wasCalledOnGet.filters).toEqual({})
    expect(wasCalledOnGet.limit).toBeUndefined()
    expect(wasCalledOnGet.page).toBeUndefined()

    expect(result.total).toBe(3)
    expect(result.totalPages).toBe(1)
    expect(result.professionals).toHaveLength(3)

})

it("deve aplicar filtro ao buscar profissionais", async () => {

    const params = {
        filters: { keywords: 'teste' },
    }

    const result = await getProfessionalsUseCase.execute(params)
    expect(wasCalledOnGet.filters).toEqual(params.filters)
    expect(wasCalledOnGet.limit).toBeUndefined()
    expect(wasCalledOnGet.page).toBeUndefined()

    expect(result.total).toBe(3)
    expect(result.totalPages).toBe(1)
    expect(result.professionals).toHaveLength(3)
})

it("deve aplicar paginação ao buscar profissionais", async () => {

    const result = await getProfessionalsUseCase.execute(
        {
            limit: 6,
            page: 1
        }
    )

    expect(wasCalledOnGet.limit).toBe(6)
    expect(wasCalledOnGet.page).toBe(1)

    expect(result.total).toBe(3)
    expect(result.totalPages).toBe(1)
    expect(result.professionals).toHaveLength(3)
})

it("deve aplicar paginação com filtro ao buscar profissionais", async () => {
    const params = {
        filters: { keywords: 'teste' },
        page: 1,
        limit: 6,

    }
    const result = await getProfessionalsUseCase.execute(
        params
    )
    expect(wasCalledOnGet.filters).toEqual(params.filters)
    expect(wasCalledOnGet.limit).toBe(6)
    expect(wasCalledOnGet.page).toBe(1)

    expect(result.total).toBe(3)
    expect(result.totalPages).toBe(1)
    expect(result.professionals).toHaveLength(3)
})

it("deve retornar lista vazia se não houver profissionais", async () => {

    professionalRepository.getProfessionals = async () => ({
        professionals: [],
        total: 0,
        totalPages: 0,
    })

    const result = await getProfessionalsUseCase.execute()

    expect(result.professionals).toEqual([])
    expect(result.total).toBe(0)
    expect(result.totalPages).toBe(0)
})