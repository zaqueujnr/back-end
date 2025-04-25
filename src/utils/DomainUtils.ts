export default class DomainUtils {
    static validateRequiredString(value: string, fieldName: string): void {
        if (!value || value.trim().length === 0) {
            throw new Error(`${fieldName} é obrigatório`);
        }
    }

    static validateRequiredNumber(value: number, fieldName: string): void {
        if (value === undefined || value === null || value <= 0) {
            throw new Error(`${fieldName} é obrigatório`);
        }
    }

    static validateName(name: string, fieldName: string): void {
        const isValidName = /^[A-Za-zÀ-ÿ'\s]{2,}$/u.test(name)
        if (!isValidName) throw new Error(`${fieldName} é inválido`)
    }

    static isValidCNPJ(cnpj: string): void {
        const cnpjRegex = /^\d{14}$/;
        if (!cnpjRegex.test(cnpj)) throw new Error('O CNPJ é inválido')
    }

    static isValidDate(dateString: string): void {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) throw new Error('A data é inválida')
        
    }
}