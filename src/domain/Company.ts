import crypto from "crypto";
import Email from "./Email";
import DomainUtils from "../utils/DomainUtils";

export default class Company {
    private email: Email;

    constructor(readonly companyId: string, readonly name: string, readonly cnpj: string,
        email: string, readonly endereco: string) {
        this.email = new Email(email)
        this.validate()
    }

    get id(): string {
        return this.companyId
    }
    getEmail () {
        return this.email.getValue()
    }

    static create (name: string, cnpj: string, email: string, endereco: string) {
        const companyId = crypto.randomUUID();
        return new Company(companyId, name, cnpj, email, endereco)
    }

    
    private validate() {
        DomainUtils.validateRequiredString(this.name, "O nome")
        DomainUtils.validateRequiredString(this.endereco, "O endereço")
        DomainUtils.isValidCNPJ(this.cnpj)
    }
}