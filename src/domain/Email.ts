import DomainUtils from "../utils/DomainUtils";

export default class Email {
    private value: string;

    constructor(readonly email: string) {
        DomainUtils.validateRequiredString(email, "O email");
        const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!isValidEmail.test(email.trim())) throw new Error("O email é inválido");
        this.value = email
    }

    getValue() {
        return this.value;
    }
}