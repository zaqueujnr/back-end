import Professional from "../domain/Professional";
import ProfessionalRepository from "../infra/repository/ProfessionalRepository";

export default class CreateProfessional {

    constructor(readonly professionalRepository: ProfessionalRepository) {
    }

    async execute(input: Input) {
        const professional = new Professional(input.professionalId, input.name, input.email, input.position, input.salary)

        await this.professionalRepository.saveProfessional(professional)

    }

}
type Input = {
    professionalId: string,
    name: string,
    email: string,
    position: string,
    salary: number
}