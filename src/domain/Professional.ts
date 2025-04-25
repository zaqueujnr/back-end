import Email from "./Email";
import DomainUtils from "../utils/DomainUtils";
import { randomUUID } from 'crypto'

export default class Professional {
    private email: Email;

    constructor(readonly professionalId: string, readonly name: string, email: string,
        readonly position: string, readonly salary: number) {
        this.email = new Email(email)
        this.validate()
    }
    
    get id(): any {
        return this.professionalId;
    }

    static create(name: string, email: string, position: string, salary: number): Professional {
        const professionalId = randomUUID()
        return new Professional(professionalId, name, email, position, salary)
    }

    private validate() {
        DomainUtils.validateRequiredString(this.name, "O nome")
        DomainUtils.validateRequiredString(this.position, "A ocupação")
        DomainUtils.validateRequiredNumber(this.salary, "O salario")
        DomainUtils.validateName(this.name, "O nome")
    }

    getEmail() {
        return this.email.getValue()
    }

}