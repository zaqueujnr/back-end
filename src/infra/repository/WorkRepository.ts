import Work from "../../domain/Work"
import DatabaseConnection from "../database/DatabaseConnection"

export default interface WorkRepository {
    saveWork(work: Work): Promise<string>
    updateWork(work: Work): Promise<void>
    getWorks(filters: any): Promise<any>
}

export class WorkRepositoryDatabase implements WorkRepository {
    constructor(private connection: DatabaseConnection) {
    }

    async saveWork(work: Work): Promise<string> {
        const result = await this.connection.query("insert into work (description, date_init, date_end, type_contract, time) values ($1, $2, $3, $4, $5)",
            [work.description, work.dateInit, work.dateEnd, work.typeContract, work.time]
        )
        return result.id
    }

    updateWork(work: any): Promise<void> {
        throw new Error("Method not implemented.")
    }

    async getWorks(params: any = {}): Promise<{ works: Work[], total: number, totalPages: number }> {
        const { filters = {}, page = 1, limit = 10 } = params;
        let query = "SELECT * FROM work WHERE 1=1";
        let countQuery = "SELECT COUNT(*) FROM work WHERE 1=1";
        const values: any[] = [];

        if (filters.keywords) {
            query += ` AND (description ILIKE $1 OR type_contract ILIKE $1 OR time ILIKE $1)`;
            countQuery += ` AND (description ILIKE $1 OR type_contract ILIKE $1 OR time ILIKE $1)`;
            values.push(`%${filters.keywords}%`)
        }

        // Paginação
        const offset = (page - 1) * limit
        query += ` ORDER BY date_init DESC LIMIT $${values.length + 1} OFFSET $${values.length + 2}`;
        values.push(limit, offset)

        const result = await this.connection.query(query, values)
        const works = result.map((work: any) =>
            new Work(work.description, work.date_init, work.date_end, work.type_contract, work.time)
        )

        const totalWorks = await this.connection.query(countQuery, values.slice(0, -2))
        const total = parseInt(totalWorks[0].count)
        const totalPages = Math.ceil(total / limit)

        return { works, total, totalPages }
    }

}