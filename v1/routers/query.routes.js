import express from 'express'
import { getDocuments, getLogs, getQueries } from '../controllers/queries.controller.js';
const v1QueryRoute = express.Router();

v1QueryRoute.route('/query').get(getQueries)
v1QueryRoute.route('/logs').get(getLogs)
v1QueryRoute.route('/documents').get(getDocuments)
export { v1QueryRoute }