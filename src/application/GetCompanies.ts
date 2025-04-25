import Company from "../domain/Company";
import CompanyRepository from "../infra/repository/CompanyRepository";


export default class GetCompanies {
  constructor(readonly companyRepository: CompanyRepository) {
  }

  async execute(params: Params = {}): Promise<Output> {
    const output = await this.companyRepository.getCompanies(params)

    return {
      ...output,
      companies: output.companies.map((company: Company): any => ({
        ...company,
        email: company.getEmail()
      })
      )
    }
  };
}

type Params = {
  filters?: { keywords: string }
  page?: number,
  limit?: number
}

export type Output = {
  companies: Company[];
  total: number,
  totalPages: number
};

