import express from "express"
import cors from "cors"
import bodyParser from "body-parser";
import routes from "./routes/index.js";
import { db } from "./database.js";
import { errorHandler } from "./middleware/errorHandler.js";
import 'dotenv/config'

const app = express();
const port = process.env.PORT

app.use(cors());
app.use(bodyParser.json());

routes.forEach(route => {
  app.use('/api/', route)
  return route
})

app.use(errorHandler)
db.connect()

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})

export default app