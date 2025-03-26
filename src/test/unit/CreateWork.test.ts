import WorkRepository from "../../infra/repository/WorkRepository"
import CreateWork from "../../application/CreateWork"

describe('CreateWork Unit Tests', () => {
    let workRepository: jest.Mocked<WorkRepository>
    let createWorkUseCase: CreateWork


    beforeEach(() => {
        workRepository = {
            saveWork: jest.fn(),
            updateWork: jest.fn(),
            getWork: jest.fn(),
        } as jest.Mocked<WorkRepository>

        createWorkUseCase = new CreateWork(workRepository)
    })

    it('deve salvar um trabalho com sucesso', async () => {
        
        const input = {
             description: 'Operador em usina de oleo e gás',
             dateInit: '11-07-2025',   
             dateEnd: '11-12-2025',  
             typeContract: 'TEMPORARIO',
             time: 'DIA',
             companyId: '0000000000000'
        }

        await createWorkUseCase.execute(input)

        expect(workRepository.saveWork).toHaveBeenCalledWith(
            expect.objectContaining({
                description: input.description,
                dateInit: input.dateInit,
                dateEnd: input.dateEnd,  
                typeContract: input.typeContract,
                time: input.time
            })
        )
    })
})