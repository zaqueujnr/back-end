import { Output } from "../../application/GetCompanies";
import Company from "../../domain/Company";
import DatabaseConnection from "../database/DatabaseConnection";

export default interface CompanyRepository {
  saveCompany(company: Company): Promise<void>;
  updateCompany(company: Company): Promise<void>;
  getCompanies(params?: any): Promise<Output>;
  getCompanyById(id: string): Promise<Company>;
  existsByCNPJ(cnpj: string): Promise<any>;
  existsByEmail(cnpj: string): Promise<any>;
}

export class CompanyRepositoryDatabase implements CompanyRepository {
  constructor(private connection: DatabaseConnection) {
  }

  async saveCompany(company: Company): Promise<void> {
    await this.connection.query(
      "insert into company (company_id, name, cnpj, email, endereco) values ($1, $2, $3, $4, $5)",
      [
        company.companyId,
        company.name,
        company.cnpj,
        company.getEmail(),
        company.endereco,
      ]
    );
  }

  async updateCompany(company: Company): Promise<void> {
    // throw new Error("Method not implemented.");
  }

  async existsByEmail(email: string): Promise<boolean> {
    const existsEmail = await this.connection.query(
      "SELECT * FROM company WHERE email = $1",
      [email]
    );

    return existsEmail.length > 0;
  }

  async existsByCNPJ(cnpj: string): Promise<boolean> {
    const existsCnpj = await this.connection.query(
      "SELECT * FROM company WHERE cnpj = $1",
      [cnpj]
    );

    return existsCnpj.length > 0;
  }

  async getCompanyById(id: string): Promise<Company> {
    const company = await this.connection.query("SELECT * FROM company WHERE company_id = $1", [id])
    return company
  }

  async getCompanies(params: any = {}): Promise<Output> {
    const { filters = {}, page = 1, limit = 9 } = params;
    let query = "SELECT * FROM company WHERE 1=1";
    let countQuery = "SELECT COUNT(*) FROM company WHERE 1=1";
    const values: any[] = [];

    if (filters.keywords) {
      query += ` AND (name ILIKE $1 OR email ILIKE $1 OR endereco ILIKE $1)`;
      countQuery += ` AND (name ILIKE $1 OR email ILIKE $1 OR endereco ILIKE $1)`;
      values.push(`%${filters.keywords}%`);
    }

    // Paginação
    const offset = (page - 1) * limit;
    query += ` ORDER BY company_id DESC LIMIT $${values.length + 1} OFFSET $${
      values.length + 2
    }`;
    values.push(limit, offset);

    const result = await this.connection.query(query, values);

    const companies = result.map(
      (company: any) =>
        new Company(
          company.company_id,
          company.name,
          company.cnpj,
          company.email,
          company.endereco
        )
    );

    const totalCompanies = await this.connection.query(
      countQuery,
      values.slice(0, -2)
    );
    const total = parseInt(totalCompanies[0].count);
    const totalPages = Math.ceil(total / limit);

    return { companies, total, totalPages };
  }
}
