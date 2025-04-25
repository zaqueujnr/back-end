import { randomUUID } from 'crypto'
import DomainUtils from '../utils/DomainUtils'
export default class Work {
    constructor(readonly workId: string, readonly description: string, readonly dateInit: string, readonly dateEnd: string,
        readonly typeContract: string, readonly time: string, readonly companyId: string) {
        this.validate()
    }

    get id(): any {
        return this.workId
    }

    static create(description: string, dateInit: string, dateEnd: string, typeContract: string, time: string, companyId: string): Work {
        const id = randomUUID()

        return new Work(id, description, dateInit, dateEnd, typeContract, time, companyId)
    }

    private validate() {
        DomainUtils.validateRequiredString(this.description, "A descrição")
        DomainUtils.validateRequiredString(this.dateInit, "A data")
        DomainUtils.validateRequiredString(this.dateEnd, "A data")
        DomainUtils.isValidDate(this.dateInit)
        DomainUtils.isValidDate(this.dateEnd)
        DomainUtils.validateRequiredString(this.typeContract, "O tipo de contrato")
        DomainUtils.validateRequiredString(this.time, "O periodo")
    }
}