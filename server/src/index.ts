import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";


dotenv.config();


const app: Express = express();
const port = process.env.PORT || 3000;

app.use(cors({ origin: 'http://localhost:5173' }));

app.get("/api", async (req: Request, res: Response) => {
  res.send("Meowdy Everybunny");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});