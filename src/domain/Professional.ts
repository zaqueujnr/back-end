import Email from "./Email";
import DomainUtils from "../utils/DomainUtils";

export default class Professional {
    private email: Email;

    constructor(readonly professionalId: string, readonly name: string, email: string, 
        readonly position: string, readonly salary: number) {
        this.email = new Email(email)
        DomainUtils.validateRequiredField(name, "O nome")
        DomainUtils.validateRequiredField(position, "A ocupação")
        if (!position || position.trim().length === 0) throw new Error("O nome é obrigatório");
        if (!salary || salary === 0) throw new Error("O salario é obrigatório");
    }

    getEmail () {
        return this.email.getValue()
    }
}