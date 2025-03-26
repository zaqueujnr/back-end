export default class DomainUtils {
    static validateRequiredField(value: string, fieldName: string): void {
        if(!value || value.trim().length === 0) {
            throw new Error(`${fieldName} é obrigatório`)
        }
    }

    static isValidCNPJ(cnpj: string): boolean {
        const cnpjRegex = /^\d{14}$/;
        return cnpjRegex.test(cnpj);
    }
}