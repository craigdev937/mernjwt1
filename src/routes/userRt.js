import express from "express";
import { PEOPLE } from "../controllers/userCon.js";

export const userRt = express.Router();
    userRt.post("/register", PEOPLE.Register);
    userRt.post("/login", PEOPLE.Login);
    userRt.post("/quote", PEOPLE.PostQuote);
    userRt.get("/quote", PEOPLE.GetQuote);




