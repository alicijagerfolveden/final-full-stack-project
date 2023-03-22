import { Router } from "express";
import {
  createEvent,
  getEvents,
  getUsersByEventId,
} from "../services/event-services.js";
import { isLoggedIn } from "../services/token-middleware.js";

const eventRouter = Router();

eventRouter.get("/", isLoggedIn, getEvents);
eventRouter.post("/", isLoggedIn, createEvent);
eventRouter.get("/:eventId", isLoggedIn, getUsersByEventId);

export default eventRouter;
