import express from "express";
import { searchAPI, suggestSearch } from "../controllers/searchController.js";

const route = express.Router();

route.get("/", searchAPI);
route.get("/search-suggestions", suggestSearch);

export default route;
