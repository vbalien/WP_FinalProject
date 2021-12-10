import express from "express";
import { router as apiRouter } from "./api";

const port = 3001;
const app = express();

// json format 사용
app.use(express.json());

// api route 등록
app.use("/api", apiRouter);

app.listen(port, async () => {
  console.log(`Express started on port ${port}`);
});

export default app;
