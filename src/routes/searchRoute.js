import express from "express";
import searchAPI from '../controllers/searchController.js';

const route = express.Router();

route.get('/',searchAPI);

export default route;