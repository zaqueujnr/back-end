import GetWorks from "../../application/GetWorks"
import Work from "../../domain/Work"
import WorkRepository from "../../infra/repository/WorkRepository"

let workRepository: WorkRepository
let getWorksUseCase: GetWorks
let wasCalledOnGet: any = undefined
let mocks: any;

const resetFakeFlags = () => {
    wasCalledOnGet = undefined
}

beforeAll(() => {
    mocks = [
        {
            id: 'f6e2bc91-28fc-4b3b-91b5-0c1d7851dc0a',
            description: 'Operador em usina de óleo e gás',
            dateInit: '2025-01-15T08:00:00.000Z',
            dateEnd: '2025-06-15T17:00:00.000Z',
            typeContract: 'CLT',
            time: 'DIA',
          },
          {
            id: 'ad347b90-5c45-46d4-a679-16d492e38d52',
            description: 'Técnico de manutenção offshore',
            dateInit: '2024-11-01T07:30:00.000Z',
            dateEnd: '2025-02-28T18:00:00.000Z',
            typeContract: 'PJ',
            time: 'NOITE',
          },
    ];
})

beforeEach(() => {
    resetFakeFlags()
    workRepository = {
        saveWork: async (): Promise<any> => { },
        updateWork: async (): Promise<any> => { },
        getWorks: async ({
            filters = {},
            limit,
            page
        }: {
            filters?: Record<string, any>,
            limit?: number,
            page?: number,
        } = {}): Promise<any> => {
            wasCalledOnGet = { filters, limit, page }

            const works = mocks.map((work: any): Work => (
                new Work(work.id, work.description, work.dateInit, work.dateEnd, work.typeContract, work.time )))

            return { works, total: 2, totalPages: 1 }
        },
    } as WorkRepository

    getWorksUseCase = new GetWorks(workRepository)
})

it("deve retornar todas os trabalhos", async () => {

    const result = await getWorksUseCase.execute()
    expect(wasCalledOnGet.filters).toEqual({})
    expect(wasCalledOnGet.limit).toBeUndefined()
    expect(wasCalledOnGet.page).toBeUndefined()

    expect(result.total).toBe(2)
    expect(result.totalPages).toBe(1)
    expect(result.works).toHaveLength(2)

})

it("deve aplicar filtro ao buscar trabalhos", async () => {

    const params = {
        filters: { keywords: 'sdfs' },
    }

    const result = await getWorksUseCase.execute(params)
    expect(wasCalledOnGet.filters).toEqual(params.filters)
    expect(wasCalledOnGet.limit).toBeUndefined()
    expect(wasCalledOnGet.page).toBeUndefined()

    expect(result.total).toBe(2)
    expect(result.totalPages).toBe(1)
    expect(result.works).toHaveLength(2)
})

it("deve aplicar paginação ao buscar trabalhos", async () => {

    const result = await getWorksUseCase.execute(
        {
            limit: 6,
            page: 1
        }
    )

    expect(wasCalledOnGet.limit).toBe(6)
    expect(wasCalledOnGet.page).toBe(1)

    expect(result.total).toBe(2)
    expect(result.totalPages).toBe(1)
    expect(result.works).toHaveLength(2)
})

it("deve aplicar paginação com filtro ao buscar trbalahos", async () => {
    const params = {
        filters: { keywords: 'teste' },
        page: 1,
        limit: 6,

    }
    const result = await getWorksUseCase.execute(
        params
    )
    expect(wasCalledOnGet.filters).toEqual(params.filters)
    expect(wasCalledOnGet.limit).toBe(6)
    expect(wasCalledOnGet.page).toBe(1)

    expect(result.total).toBe(2)
    expect(result.totalPages).toBe(1)
    expect(result.works).toHaveLength(2)
})

it("deve retornar lista vazia se não houver trabalhos", async () => {
    
    workRepository.getWorks = async () => ({
        works: [],
        total: 0,
        totalPages: 0,
    })

    const result = await getWorksUseCase.execute()

    expect(result.works).toEqual([])
    expect(result.total).toBe(0)
    expect(result.totalPages).toBe(0)
})