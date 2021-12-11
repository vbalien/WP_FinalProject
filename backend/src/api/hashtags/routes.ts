import { Router } from "express";
import * as controllers from "./controllers";

export const router = Router().get("/:hashtag", controllers.hashtag_get_items);
