import express from "express"
import cors from "cors";
import companyRoutes from "../routes/companyRoutes";
import professionalRoutes from "../routes/professionalRoutes";
import workRoutes from "../routes/workRoutes";


const app = express()
app.use(cors());
app.use(express.json())

app.use("/company", companyRoutes)
app.use("/professional", professionalRoutes)
app.use("/work", workRoutes)

export default app;