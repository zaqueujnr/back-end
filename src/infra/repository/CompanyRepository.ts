import Company from "../../domain/Company"
import DatabaseConnection from "../database/DatabaseConnection";

export default interface CompanyRepository {
    saveCompany(company: Company): Promise<void>;
    updateCompany(company: Company): Promise<void>;
    getCompany(company: Company): Promise<void>;
    existsByCNPJ(cnpj: string): Promise<any>;
}

export class CompanyRepositoryDatabase implements CompanyRepository {
    constructor(private connection: DatabaseConnection) { }

    async existsByCNPJ(cnpj: string): Promise<boolean> {
        const existsCnpj = await this.connection.query("SELECT * FROM company WHERE cnpj = $1",
            [cnpj]);

        return existsCnpj.length > 0
    }

    async getCompany(company: Company): Promise<void> {
        // throw new Error("Method not implemented.");
    }

    async updateCompany(company: Company): Promise<void> {
        // throw new Error("Method not implemented.");
    }

    async saveCompany(company: Company): Promise<void> {
        await this.connection.query("insert into company (company_id, name, cnpj, email, endereco) values ($1, $2, $3, $4, $5)",
            [company.companyId, company.name, company.cnpj, company.getEmail(), company.endereco]);
    }

}
