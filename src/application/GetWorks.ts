import WorkRepository from "../infra/repository/WorkRepository";


export default class GetWorks {
  constructor(readonly workRepository: WorkRepository) {
  }

  async execute(params: Params = {}): Promise<Output[]> {
    return await this.workRepository.getWorks(params)
  }
}

type Params = {
  filters?: { keywords: string }
  page?: number,
  limit?: number
}

type Output = {
  description: string,
  dateInit: string,
  dateEnd: string,
  typeContract: string,
  time: string
}


