import pgp from "pg-promise"
import Company from "../../domain/Company"

export default interface CompanyRepository {
    saveCompany(company: Company): Promise<void>;
    updateCompany(company: Company): Promise<void>;
    getCompany(company: Company): Promise<void>;
    existsByCNPJ(cnpj: string): Promise<any>;
}

export class CompanyRepositoryDatabase implements CompanyRepository {
    async existsByCNPJ(cnpj: string): Promise<boolean> {
        const connection = pgp()("postgres://postgres:postgre@localhost:5432/api_tdd");
        const existsCnpj = await connection.query("SELECT * FROM company WHERE cnpj = $1",
            [cnpj]);
        await connection.$pool.end()

        return existsCnpj.length > 0
        
    }

    async getCompany(company: Company): Promise<void> {
        // throw new Error("Method not implemented.");
    }

    async updateCompany(company: Company): Promise<void> {
        // throw new Error("Method not implemented.");
    }

    async saveCompany(company: Company): Promise<void> {
        const connection = pgp()("postgres://postgres:postgre@localhost:5432/api_tdd");
        await connection.query("insert into company (company_id, name, cnpj, email, endereco) values ($1, $2, $3, $4, $5)",
            [company.companyId, company.name, company.cnpj, company.getEmail(), company.endereco]);
        await connection.$pool.end()
    }

}
