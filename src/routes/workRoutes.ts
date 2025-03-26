import { Router } from "express";
import CreateWork from "../application/CreateWork";
import { WorkRepositoryDatabase } from "../infra/repository/WorkRepository";

const router = Router()

const WorkRepository = new WorkRepositoryDatabase()
const createWork = new CreateWork(WorkRepository)

// Create work

router.post('/', async (req, res) => {
    try{
        const output = await createWork.execute(req.body)
        res.json(output)
    } catch(e: any) {
        res.status(422).json({message: e.message})
    }

})

export default router;