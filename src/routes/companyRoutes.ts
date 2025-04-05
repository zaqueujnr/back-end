import { Router } from "express";
import CreateCompany from "../application/CreateCompany";
import { CompanyRepositoryDatabase } from "../infra/repository/CompanyRepository";
import { pgPromiseConnection } from "../infra/database/DatabaseConnection";

const router = Router()
const companyRepository = new CompanyRepositoryDatabase(pgPromiseConnection)
const createCompany = new CreateCompany(companyRepository)


// Create company 

router.post('/', async (req, res) => {
    try {
        const output = await createCompany.execute(req.body)
        res.json(output)
    } catch (e: any) {
        res.status(422).json({ message: e.message })
    }
})

export default router