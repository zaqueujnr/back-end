import { randomUUID } from 'crypto'
import DomainUtils from '../utils/DomainUtils'
export default class Work {
    constructor(readonly workId: string, readonly description: string, readonly dateInit: Date | null, readonly dateEnd: Date | null,
        readonly typeContract: string, readonly time: string, readonly companyId: string) {
        this.validate()
    }

    get id(): any {
        return this.workId
    }

    static create(description: string, dateInit: Date | null, dateEnd: Date | null, typeContract: string, time: string, companyId: string): Work {
        const id = randomUUID()

        return new Work(id, description, dateInit, dateEnd, typeContract, time, companyId)
    }

    private validate() {
        DomainUtils.validateRequiredString(this.description, "A descrição")
        DomainUtils.isValidDate(this.dateInit)
        DomainUtils.isValidDate(this.dateEnd)
        DomainUtils.validateRequiredString(this.typeContract, "O tipo de contrato")
        DomainUtils.validateRequiredString(this.time, "O periodo")
    }
}