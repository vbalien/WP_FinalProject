import express from "express";
import cors from "cors";
import session from "express-session";
import path from "path";
import { router as apiRouter } from "./api";
import { configuration as passportConfig } from "./passport";

const port = 8014;
const app = express();

// json format 사용
app.use(express.json());

// CORS 허용
app.use(
  cors({
    origin: "http://localhost:10014",
    credentials: true,
  })
);

// session 사용
const sess = {
  secret: "web14",
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false,
  },
};
app.use(session(sess));

// passport 사용
passportConfig(app);

// api route 등록
app.use("/api", apiRouter);

// frontend 서빙
app.use(
  express.static(
    path.join(__dirname, "../../node_modules/@webstudy/frontend/dist")
  )
);
app.get("*", (_req, res) => {
  res.sendFile(
    path.join(
      __dirname,
      "../../node_modules/@webstudy/frontend/dist/index.html"
    )
  );
});

app.listen(port, async () => {
  console.log(`Express started on http://localhost:${port}`);
});

export default app;
