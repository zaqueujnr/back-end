import { Router } from "express";
import CreateCompany from "../application/CreateCompany";
import { CompanyRepositoryDatabase } from "../infra/repository/CompanyRepository";
import { PgPromiseAdapter } from "../infra/database/DatabaseConnection";
import GetCompanies from "../application/GetCompanies";
import pgPromiseConnection from "../infra/database/pgPromiseConnection";

const router = Router()
// const pgPromiseConnection = new PgPromiseAdapter()
const companyRepository = new CompanyRepositoryDatabase(pgPromiseConnection)
const createCompany = new CreateCompany(companyRepository)
const getCompanies = new GetCompanies(companyRepository)


// Create company 

router.post('/', async (req, res) => {
    try {
        const id = await createCompany.execute(req.body)
        res.status(201).json({ id })
    } catch (e: any) {
        res.status(422).json({ message: e.message })
    }
})

// Get company 

router.get('/', async (req, res) => {
    try {
        const output = await getCompanies.execute(req.query)
        res.status(200).json(output)
    } catch (e: any) {
        res.status(422).json({ message: e.message })
    }
})

export default router