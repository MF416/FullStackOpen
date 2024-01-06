import toNewPatientEntry from '../utils';
import express from 'express';
import patientService from '../services/patientService';

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientService.getPatients());
    // res.send(patientService.getNonSensitivePatients()); //sensitive patient version
});

router.post('/', (req, res) => {
   try {
    const newPatientEntry = toNewPatientEntry(req.body);
    const addedPatient = patientService.addPatient(newPatientEntry);
    res.json(addedPatient);
   } catch (error: unknown) {
    let errorMessage = 'Something went wrong';
        if (error instanceof Error) {
            errorMessage += ' Error: " + error.message';
        }
        res.status(400).send(errorMessage);
   }
});

router.get('/:id', (req, res) => {
    const patient = patientService.getSinglePatient(req.params.id);
    if (patient) {
        res.send(patient);
    } else {
        res.sendStatus(404);
    }
});

export default router;