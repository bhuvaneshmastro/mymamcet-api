import express from 'express'
import { createInstitution, pauseInstitutionServices, resumeInstitutionServices, updateInstitutionDetail, viewInstitutionDetails } from '../controllers/institution.controller.js';

const v1Institution = express.Router();

v1Institution.route('/').post(createInstitution)
v1Institution.route('/:id').get(viewInstitutionDetails)
v1Institution.route('/').put(updateInstitutionDetail)
v1Institution.route('/pause').put(pauseInstitutionServices)
v1Institution.route('/resume').put(resumeInstitutionServices)

export {
    v1Institution
}