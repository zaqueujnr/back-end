import CreateProfessional from "../../application/CreateProfessional"
import Email from "../../domain/Email"
import ProfessionalRepository from "../../infra/repository/ProfessionalRepository"

describe('CreateProfessional Unit test', () =>{
    let professionalRepository: jest.Mocked<ProfessionalRepository>
    let createProfessionalUseCase: CreateProfessional

    beforeEach( () => {
        professionalRepository = {
            saveProfessional: jest.fn(),
            updateProfessional: jest.fn(),
            getProfessional: jest.fn(),
        } as jest.Mocked<ProfessionalRepository>

        createProfessionalUseCase = new CreateProfessional(professionalRepository)
    })

    
    it("deve salvar um profissional com sucesso", async () => {
        const input = {
            professionalId: '8465986515',
            name: 'Zaqueu Junior',
            email: 'zaqueujunior1998@gmail.com',
            position: 'programador',
            salary: 90000,
        }

        await createProfessionalUseCase.execute(input)
        
        expect(professionalRepository.saveProfessional).toHaveBeenCalledWith(
            expect.objectContaining({
                name: input.name,
                professionalId: input.professionalId,
                email: new Email(input.email),
                position: input.position,
                salary: input.salary,
            })
        )

    })

    it("deve lançar um erro ao salvar um profissional com nome inválido", async () => {
        
        const input = {
            professionalId: '8465986515',
            name: '',
            email: 'zaqueujunior1998@gmail.com',
            position: 'programador',
            salary: 90000,
        }

        await expect(createProfessionalUseCase.execute(input)).rejects.toThrow('O nome é obrigatório')
    })

    it("deve lançar um erro ao salvar um profissional com nome inválido", async () => {
        
        const input = {
            professionalId: '8465986515',
            name: '',
            email: 'zaqueujunior1998@gmail.com',
            position: 'programador',
            salary: 90000,
        }

        await expect(createProfessionalUseCase.execute(input)).rejects.toThrow('O nome é obrigatório')
    })

    it("deve lançar um erro ao salvar um profissional com email inválido", async () => {
        
        const input = {
            professionalId: '8465986515',
            name: 'Zaqueu Junior',
            email: 'zaqueujunior1998il.com',
            position: 'programador',
            salary: 90000,
        }

        await expect(createProfessionalUseCase.execute(input)).rejects.toThrow('O email é inválido')
    })

    it("deve lançar um erro ao salvar um profissional com ocupação vazia", async () => {
        
        const input = {
            professionalId: '8465986515',
            name: 'Zaqueu Junior',
            email: 'zaqueujunior1998@gmail.com',
            position: '',
            salary: 90000,
        }

        await expect(createProfessionalUseCase.execute(input)).rejects.toThrow('A ocupação é obrigatório')
    })

    it("deve lançar um erro ao salvar um profissional com salario vazio", async () => {
        
        const input = {
            professionalId: '8465986515',
            name: 'Zaqueu Junior',
            email: 'zaqueujunior1998@gmail.com',
            position: 'programador',
            salary: 0,
        }

        await expect(createProfessionalUseCase.execute(input)).rejects.toThrow('O salario é obrigatório')
    })

})