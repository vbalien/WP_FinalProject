import { Router } from "express";
import errorWrap from "../error-wrap";
import * as controllers from "./controllers";

export const router = Router().get(
  "/:hashtag",
  errorWrap(controllers.hashtag_get_items)
);
