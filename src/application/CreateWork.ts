import WorkRepository from "../infra/repository/WorkRepository";
import Work from "../domain/Work";

export default class CreateWork {
    constructor(readonly workRepository: WorkRepository) {
    }

    async execute(input: Input): Promise<string> {
        const work = Work.create(input.description, input.dateInit, input.dateEnd, input.typeContract, input.time, input.companyId)

        await this.workRepository.saveWork(work)

        return work.id

    }
}

type Input = {
    description: string,
    dateInit: Date | any,
    dateEnd: Date | any,
    typeContract: string,
    time: string,
    companyId: string,
}