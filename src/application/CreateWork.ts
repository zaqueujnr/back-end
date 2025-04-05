import WorkRepository from "../infra/repository/WorkRepository";
import Work from "../domain/Work";

export default class CreateWork {
    constructor(readonly workRepository: WorkRepository) {
    }

    async execute(input: Input): Promise<string> {
        const work = new Work(input.description, input.dateInit, input.dateEnd, input.typeContract, input.time)

        return this.workRepository.saveWork(work)
    }
}

type Input = {
    description: string,
    dateInit: string,
    dateEnd: string,
    typeContract: string,
    time: string,
    // companyId: string,
}