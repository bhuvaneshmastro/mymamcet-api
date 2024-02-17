import express from 'express'
import { getDocuments, getLogs, getQueries } from '../controllers/queries.controller.js';
const queryRoute = express.Router();

queryRoute.route('/query').get(getQueries)
queryRoute.route('/logs').get(getLogs)
queryRoute.route('/documents').get(getDocuments)
export { queryRoute }