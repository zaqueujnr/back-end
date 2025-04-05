import Professional from "../../domain/Professional";
import DatabaseConnection from "../database/DatabaseConnection";

export default interface ProfessionalRepository {
    saveProfessional(professional: Professional): Promise<void>
    updateProfessional(professional: Professional): Promise<void>
    getProfessional(professional: Professional): Promise<void>
}


export class ProfessionalRepositoryDatabase implements ProfessionalRepository {
    constructor(private connection: DatabaseConnection) { }

    async saveProfessional(professional: Professional): Promise<void> {
        await this.connection.query("insert into professional (professional_id, name, email, position, salary) values ($1, $2, $3, $4, $5)",
            [professional.professionalId, professional.name, professional.getEmail(), professional.position, professional.salary]
        )
    }
    updateProfessional(professional: Professional): Promise<void> {
        throw new Error("Method not implemented.");
    }
    getProfessional(professional: Professional): Promise<void> {
        throw new Error("Method not implemented.");
    }

}