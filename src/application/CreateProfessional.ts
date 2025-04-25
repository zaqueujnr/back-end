import Professional from "../domain/Professional";
import ProfessionalRepository from "../infra/repository/ProfessionalRepository";

export default class CreateProfessional {

    constructor(readonly professionalRepository: ProfessionalRepository) {
    }

    async execute(input: Input): Promise<Output> {
        const existsEmail = await this.professionalRepository.existsByEmail(input.email);
        if (existsEmail) {
            throw new Error("O email já está cadastrado");
        }
        
        const professional = Professional.create(input.name, input.email, input.position, input.salary)
        await this.professionalRepository.saveProfessional(professional)
        
        return professional.id
        
    }

}

type Input = {
    name: string,
    email: string,
    position: string,
    salary: number
}

type Output = {
    id: string,
}
