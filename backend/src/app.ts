import express from "express";

const port = 3001;
const app = express();

app.use(express.json());

app.listen(port, () => {
  console.log(`Express started on port ${port}`);
});

export default app;
