import CreateProfessional from "../../application/CreateProfessional"
import Email from "../../domain/Email"
import Professional from "../../domain/Professional"
import ProfessionalRepository from "../../infra/repository/ProfessionalRepository"

let professionalRepository: ProfessionalRepository
let createProfessionalUseCase: CreateProfessional
let shouldEmailExist = false
let wasCalledOnSave: any = undefined
let wasCalledOnExists: any = undefined

const resetFakeFlags = () => {
    shouldEmailExist = false
    wasCalledOnSave = undefined
    wasCalledOnExists = undefined
}

beforeEach(() => {
    resetFakeFlags()

    professionalRepository = {
        saveProfessional: async (professional: Professional): Promise<any> => {
            wasCalledOnSave = professional
        },
        updateProfessional: async (): Promise<void> => { },
        getProfessionals: async (): Promise<any> => { },
        existsByEmail: async (email: string): Promise<boolean> => {
            wasCalledOnExists = email
            return shouldEmailExist
        },
    } as ProfessionalRepository

    createProfessionalUseCase = new CreateProfessional(professionalRepository)
})

it("deve salvar um profissional com sucesso", async () => {
    const input = {
        name: 'Zaqueu Junior',
        email: 'zaqueujunior1998@gmail.com',
        position: 'programador',
        salary: 9000.0,
    }

    await createProfessionalUseCase.execute(input)

    expect(wasCalledOnSave).toMatchObject({
        name: input.name,
        email: new Email(input.email),
        position: input.position,
        salary: input.salary,
    })
    expect(wasCalledOnSave.professionalId).toBeDefined()
    expect(typeof wasCalledOnSave.professionalId).toBe('string')

})

it("deve lançar um erro ao salvar um profissional com nome vazio", async () => {

    const input = {
        name: '',
        email: 'zaqueujunior1998@gmail.com',
        position: 'programador',
        salary: 9000.0,
    }

    await expect(createProfessionalUseCase.execute(input)).rejects.toThrow('O nome é obrigatório')
    expect(wasCalledOnSave).toBeUndefined()

})

it("deve lançar um erro ao salvar um profissional com nome inválido", async () => {

    const input = {
        name: '454jaus#',
        email: 'zaqueujunior1998@gmail.com',
        position: 'programador',
        salary: 9000.0,
    }

    await expect(createProfessionalUseCase.execute(input)).rejects.toThrow('O nome é inválido')
    expect(wasCalledOnSave).toBeUndefined()

})

it("deve lançar um erro ao salvar um profissional com email vazio", async () => {

    const input = {
        name: 'Zaqueu Junior',
        email: '',
        position: 'programador',
        salary: 9000.0,
    }

    await expect(createProfessionalUseCase.execute(input)).rejects.toThrow('O email é obrigatório')
    expect(wasCalledOnSave).toBeUndefined()

})

it("deve lançar um erro ao salvar um profissional com email inválido", async () => {

    const input = {
        name: 'Zaqueu Junior',
        email: 'joao@ email.com',
        position: 'programador',
        salary: 9000.0,
    }

    await expect(createProfessionalUseCase.execute(input)).rejects.toThrow('O email é inválido')
    expect(wasCalledOnSave).toBeUndefined()

})

it("deve lançar um erro ao salvar um profissional com email duplicado", async () => {
    shouldEmailExist = true

    const input = {
        name: 'Zaqueu Junior',
        email: 'joao@email.com',
        position: 'programador',
        salary: 9000.0,
    }

    await expect(createProfessionalUseCase.execute(input)).rejects.toThrow('O email já está cadastrado')

    expect(wasCalledOnExists).toBe(input.email)
    expect(wasCalledOnSave).toBeUndefined()

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
    expect(wasCalledOnSave).toBeUndefined()

})

it("deve lançar um erro ao salvar um profissional com salario vazio", async () => {

    const input = {
        name: 'Zaqueu Junior',
        email: 'zaqueujunior1998@gmail.com',
        position: 'programador',
        salary: 0,
    }

    await expect(createProfessionalUseCase.execute(input)).rejects.toThrow('O salario é obrigatório')
    expect(wasCalledOnSave).toBeUndefined()

})
