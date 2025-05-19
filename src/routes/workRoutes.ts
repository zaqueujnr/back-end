import { Router } from "express";
import CreateWork from "../application/CreateWork";
import { WorkRepositoryDatabase } from "../infra/repository/WorkRepository";
import GetWorks from "../application/GetWorks";
import { PgPromiseAdapter } from "../infra/database/DatabaseConnection";
import { CompanyRepositoryDatabase } from "../infra/repository/CompanyRepository";
import pgPromiseConnection from "../infra/database/pgPromiseConnection";

const router = Router();
// const pgPromiseConnection = new PgPromiseAdapter()
const WorkRepository = new WorkRepositoryDatabase(pgPromiseConnection);
const CompanyRepository = new CompanyRepositoryDatabase(pgPromiseConnection);
const createWork = new CreateWork(WorkRepository);
const getWorks = new GetWorks(WorkRepository, CompanyRepository);

// Create work

router.post("/", async (req, res) => {
  try {
    const input = {
      ...req.body,
      dateInit: new Date(req.body.dateInit),
      dateEnd: new Date(req.body.dateEnd),
    };
    const id = await createWork.execute(input);
    res.status(201).json({ id });
  } catch (e: any) {
    res.status(422).json({ message: e.message });
  }
});

// Get Works

router.get("/", async (req, res) => {
  try {
    const output = await getWorks.execute(req.query);
    res.json(output);
  } catch (e: any) {
    res.status(422).json({ message: e.message });
  }
});

export default router;
