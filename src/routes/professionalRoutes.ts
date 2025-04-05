import { Router } from "express";
import CreateProfessional from "../application/CreateProfessional";
import { ProfessionalRepositoryDatabase } from "../infra/repository/ProfessionalRepository";
import { pgPromiseConnection } from "../infra/database/DatabaseConnection";

const router = Router()
const professionalRepository = new ProfessionalRepositoryDatabase(pgPromiseConnection)
const createProfessional = new CreateProfessional(professionalRepository)


// Create professional 

router.post('/', async (req, res) => {
    try {
        const output = await createProfessional.execute(req.body)
        res.json(output)
    }catch (e: any) {
        res.status(422).json({ message: e.message})
    }
})

export default router
