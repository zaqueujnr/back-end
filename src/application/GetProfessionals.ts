import Professional from "../domain/Professional";
import ProfessionalRepository from "../infra/repository/ProfessionalRepository";

export default class GetProfessionals {
  constructor(readonly professionalRepository: ProfessionalRepository) {
  }

  async execute(params: Params = {}): Promise<Output> {
    const result = await this.professionalRepository.getProfessionals(params)
    return {
      ...result,
      professionals: result.professionals.map(p => ({
        professionalId: p.professionalId,
        name: p.name,
        email: p.getEmail(),
        position: p.position,
        salary: parseFloat(p.salary)
      }))
    }
  }
}

type Params = {
  filters?: { keywords: string }
  page?: number,
  limit?: number
}

export type Output = {
  professionals: any[] | Professional[];
  total: number,
  totalPages: number
};

