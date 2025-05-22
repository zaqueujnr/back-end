import { Router } from "express";
import CreateProfessional from "../application/CreateProfessional";
import { ProfessionalRepositoryDatabase } from "../infra/repository/ProfessionalRepository";
import { PgPromiseAdapter } from "../infra/database/DatabaseConnection";
import GetProfessionals from "../application/GetProfessionals";
import pgPromiseConnection from "../infra/database/pgPromiseConnection";

const router = Router()
// const pgPromiseConnection = new PgPromiseAdapter()
const professionalRepository = new ProfessionalRepositoryDatabase(pgPromiseConnection)
const createProfessional = new CreateProfessional(professionalRepository)
const getProfessionals = new GetProfessionals(professionalRepository)


// Create professional 

router.post('/', async (req, res) => {
    try {
        const id = await createProfessional.execute(req.body)
        res.status(201).json({ id })
    }catch (e: any) {
        res.status(422).json({ message: e.message})
    }
})

// Get professionals

router.get('/', async (req, res) => {
    try {
        const output = await getProfessionals.execute(req.query)
        res.json(output)
    }catch (e: any) {
        res.status(422).json({ message: e.message})
    }
})

export default router
