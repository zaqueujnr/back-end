import Work from "../domain/Work";
import CompanyRepository from "../infra/repository/CompanyRepository";
import WorkRepository from "../infra/repository/WorkRepository";


export default class GetWorks {
  constructor(readonly workRepository: WorkRepository,
    readonly companyRepository: CompanyRepository
  ) {
  }

  async execute(params: Params = {}): Promise<Output> {
    const workList = await this.workRepository.getWorks(params)
    const companyList = await this.companyRepository.getCompanies()

    const { companies } = companyList
    const { works, total, totalPages } = workList

    const worksResult = works.map((work: Work): any => {
      const company = companies.find(c => c.companyId === work.companyId)
    
      return {
        ...work,
        company: {
          companyId: company?.companyId,
          name: company?.name
        }
      }
    })

    return {
      works: worksResult,
      total: total,
      totalPages: totalPages
    }

  }
}

type Params = {
  filters?: { keywords: string }
  page?: number,
  limit?: number
}

export type Output = {
  works: Work[];
  total: number,
  totalPages: number
};



