import Company from "../domain/Company";
import CompanyRepository from "../infra/repository/CompanyRepository";

export default class CreateCompany {

    constructor(readonly companyRepository: CompanyRepository) {
    }

    async execute(input: Input): Promise<string> {
        const existsCnpj = await this.companyRepository.existsByCNPJ(input.cnpj);
        const existsEmail = await this.companyRepository.existsByEmail(input.email);
        if (existsCnpj) throw new Error("CNPJ já está cadastrado");
        if (existsEmail) throw new Error("Email já está cadastrado");
        
        const company = Company.create(input.name, input.cnpj, input.email, input.endereco)

        await this.companyRepository.saveCompany(company)
        return company.id
    }
}

type Input = {
  name: string,
  cnpj: string,
  email: string,
  endereco: string
}
