import { Router } from "express";
import CreateWork from "../application/CreateWork";
import { WorkRepositoryDatabase } from "../infra/repository/WorkRepository";
import GetWorks from "../application/GetWorks";
import { pgPromiseConnection } from "../infra/database/DatabaseConnection";
import { CompanyRepositoryDatabase } from "../infra/repository/CompanyRepository";

const router = Router()
const WorkRepository = new WorkRepositoryDatabase(pgPromiseConnection)
const CompanyRepository = new CompanyRepositoryDatabase(pgPromiseConnection)
const createWork = new CreateWork(WorkRepository)
const getWorks = new GetWorks(WorkRepository, CompanyRepository)

// Create work

router.post('/', async (req, res) => {
    try{
        const id = await createWork.execute(req.body)
        res.status(201).json({ id })
    } catch(e: any) {
        res.status(422).json({message: e.message})
    }

})

// Get Works 

router.get('/', async (req, res) => {
    try {
        const output = await getWorks.execute(req.query)
        res.json(output)
    } catch (e: any) {
        res.status(422).json({message: e.message})
    }
})

export default router;