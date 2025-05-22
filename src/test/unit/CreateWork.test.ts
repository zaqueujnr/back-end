import WorkRepository from "../../infra/repository/WorkRepository"
import CreateWork from "../../application/CreateWork"

let workRepository: WorkRepository
let createWorkUseCase: CreateWork

const now = new Date()
let wasCalledOnSave: any = undefined

const resetFakeFlags = () => {
    wasCalledOnSave = undefined
}

beforeEach(() => {
    resetFakeFlags()

    workRepository = {
        saveWork: async (work: any): Promise<void> => {
            wasCalledOnSave = work
        },
        updateWork: async (): Promise<void> => { },
        getWorks: async (): Promise<any> => { },
    } as WorkRepository

    createWorkUseCase = new CreateWork(workRepository)
})

it('Deve salvar um trabalho com sucesso', async () => {

    const input = {
        description: 'Operador em usina de oleo e gás',
        dateInit: now,
        dateEnd: now,
        typeContract: 'TEMPORARIO',
        time: 'MANHÃ',
        companyId: '7ec3a579-f5da-40ca-8b2f-935b39da5c67'
    }

    await createWorkUseCase.execute(input)

    expect(wasCalledOnSave).toMatchObject({
        description: input.description,
        dateInit: input.dateInit,
        dateEnd: input.dateEnd,
        typeContract: input.typeContract,
        time: input.time,
    })

    expect(wasCalledOnSave.workId).toBeDefined()
    expect(typeof wasCalledOnSave.workId).toBe('string')
})

it('Deve lançar um erro ao tentar salvar um trabalho com descrição vazia', async () => {

    const input = {
        description: '',
        dateInit: now,
        dateEnd: now,
        typeContract: 'TEMPORARIO',
        time: 'MANHÃ',
        companyId: '7ec3a579-f5da-40ca-8b2f-935b39da5c67'
    }

    await expect(createWorkUseCase.execute(input)).rejects.toThrow('A descrição é obrigatório')
    expect(wasCalledOnSave).toBeUndefined()
})

it('Deve lançar um erro ao tentar salvar um trabalho com data vazia', async () => {

    const input = {
        description: 'teste',
        dateInit: null,
        dateEnd: now,
        typeContract: 'TEMPORARIO',
        time: 'MANHÃ',
        companyId: '7ec3a579-f5da-40ca-8b2f-935b39da5c67'
    }

    await expect(createWorkUseCase.execute(input)).rejects.toThrow('A data é obrigatória')
    expect(wasCalledOnSave).toBeUndefined()
})

it('Deve lançar um erro ao tentar salvar um trabalho com data inválida', async () => {

    const input = {
        description: 'teste',
        dateInit: '548138',
        dateEnd: now,
        typeContract: 'TEMPORARIO',
        time: 'MANHÃ',
        companyId: '7ec3a579-f5da-40ca-8b2f-935b39da5c67'
    }

    await expect(createWorkUseCase.execute(input)).rejects.toThrow('A data é inválida')
    expect(wasCalledOnSave).toBeUndefined()
})

it('Deve lançar um erro ao tentar salvar um trabalho com tipo contrato vazio', async () => {

    const input = {
        description: 'teste',
        dateInit: now,
        dateEnd: now,
        typeContract: '',
        time: 'MANHÃ',
        companyId: '7ec3a579-f5da-40ca-8b2f-935b39da5c67'
    }

    await expect(createWorkUseCase.execute(input)).rejects.toThrow('O tipo de contrato é obrigatório')
    expect(wasCalledOnSave).toBeUndefined()
})

it('Deve lançar um erro ao tentar salvar um trabalho com tipo contrato vazio', async () => {

    const input = {
        description: 'teste',
        dateInit: now,
        dateEnd: now,
        typeContract: 'teste',
        time: '',
        companyId: '7ec3a579-f5da-40ca-8b2f-935b39da5c67'
    }

    await expect(createWorkUseCase.execute(input)).rejects.toThrow('O periodo é obrigatório')
    expect(wasCalledOnSave).toBeUndefined()
})