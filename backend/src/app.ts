import express from "express";
import session from "express-session";
import { router as apiRouter } from "./api";
import { configuration as passportConfig } from "./passport";

const port = 3000;
const app = express();

// json format 사용
app.use(express.json());

// session 사용
const sess = {
  secret: "web14",
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false,
  },
};

if (app.get("env") === "production") {
  app.set("trust proxy", 1); // trust first proxy
  sess.cookie.secure = true; // serve secure cookies
}
app.use(session(sess));

// passport 사용
passportConfig(app);

// api route 등록
app.use("/api", apiRouter);

app.listen(port, async () => {
  console.log(`Express started on http://localhost:${port}`);
});

export default app;
