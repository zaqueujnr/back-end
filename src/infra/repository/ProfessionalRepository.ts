import { Output } from "../../application/GetProfessionals";
import Professional from "../../domain/Professional";
import DatabaseConnection from "../database/DatabaseConnection";

export default interface ProfessionalRepository {
    saveProfessional(professional: Professional): Promise<string>
    updateProfessional(professional: Professional): Promise<void>
    getProfessionals(params: any): Promise<Output>
    existsByEmail(email: string): Promise<boolean>
}


export class ProfessionalRepositoryDatabase implements ProfessionalRepository {
    constructor(private connection: DatabaseConnection) { }

    async saveProfessional(professional: Professional): Promise<string> {
        return await this.connection.query("insert into professional (professional_id, name, email, position, salary) values ($1, $2, $3, $4, $5)",
            [professional.professionalId, professional.name, professional.getEmail(), professional.position, professional.salary]
        )
    }
    updateProfessional(professional: Professional): Promise<void> {
        throw new Error("Method not implemented.");
    }
    async getProfessionals(params: any = {}): Promise<Output> {
        const { filters = {}, page = 1, limit = 10 } = params;
        let query = "SELECT * FROM professional WHERE 1=1";
        let countQuery = "SELECT COUNT(*) FROM professional WHERE 1=1";
        const values: any[] = [];

        if (filters.keywords) {
            query += ` AND (name ILIKE $1 OR email ILIKE $1 OR position ILIKE $1)`;
            countQuery += ` AND (name ILIKE $1 OR email ILIKE $1 OR position ILIKE $1)`;
            values.push(`%${filters.keywords}%`)
        }

        // Paginação
        const offset = (page - 1) * limit
        query += ` ORDER BY professional_id DESC LIMIT $${values.length + 1} OFFSET $${values.length + 2}`;
        values.push(limit, offset)

        const result = await this.connection.query(query, values)
        const professionals = result.map((professional: any) =>
            new Professional(professional.professional_id, professional.name, professional.email,
                professional.position, professional.salary)
            )

        const totaProfessionals = await this.connection.query(countQuery, values.slice(0, -2))
        const total = parseInt(totaProfessionals[0].count)
        const totalPages = Math.ceil(total / limit)

        return { professionals, total, totalPages }
    }
    async existsByEmail(email: string): Promise<boolean> {
        const existsEmail = await this.connection.query('SELECT * FROM professional WHERE email = $1 ', [email])
        return existsEmail.length > 0
    }

}