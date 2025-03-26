import pgp from "pg-promise";
import Professional from "../../domain/Professional";

export default interface ProfessionalRepository {
    saveProfessional(professional: Professional): Promise<void>
    updateProfessional(professional: Professional): Promise<void>
    getProfessional(professional: Professional): Promise<void>
}


export class ProfessionalRepositoryDatabase implements ProfessionalRepository {
    async saveProfessional(professional: Professional): Promise<void> {
        const connection = pgp()("postgres://postgres:postgre@localhost:5432/api_tdd");
        await connection.query("insert into professional (professional_id, name, email, position, salary) values ($1, $2, $3, $4, $5)",
            [professional.professionalId, professional.name, professional.getEmail(), professional.position, professional.salary]
        )
        await connection.$pool.end()
    }
    updateProfessional(professional: Professional): Promise<void> {
        throw new Error("Method not implemented.");
    }
    getProfessional(professional: Professional): Promise<void> {
        throw new Error("Method not implemented.");
    }
    
}