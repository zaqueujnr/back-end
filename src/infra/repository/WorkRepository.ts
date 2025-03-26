import pgp from "pg-promise"
import Work from "../../domain/Work"

export default interface WorkRepository {
    saveWork(work: Work) : Promise<void>
    updateWork(work: Work) : Promise<void>
    getWork(work: Work) : Promise<void>
}

export class WorkRepositoryDatabase implements WorkRepository {
    async saveWork(work: Work): Promise<void> {
        const connection = pgp()("postgres://postgres:postgre@localhost:5432/api_tdd");
        await connection.query("insert into work (description, date_init, date_end, type_contract, time) values ($1, $2, $3, $4, $5)",
            [work.description, work.dateInit, work.dateEnd, work.typeContract, work.time]
        )
        await connection.$pool.end()
    }
    updateWork(work: any): Promise<void> {
        throw new Error("Method not implemented.")
    }
    getWork(work: any): Promise<void> {
        throw new Error("Method not implemented.")
    }
    
}