export default class Email {
    private value: string;

    constructor(email: string) {
        if (!email.match(/^(.+)@(.+)$/)) throw new Error("O email é inválido");
        this.value = email
    }

    getValue () {
		return this.value;
	}
}