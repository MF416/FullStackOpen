/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import patientData from '../../data/patientsEntries';
import {v1 as uuid} from 'uuid';

import { 
    PatientEntry, 
    newPatientEntry, 
    NonSensitivePatientEntry 
} from '../types';

const getPatients = (): PatientEntry[] => {
    return patientData;
};

const getNonSensitivePatients = (): NonSensitivePatientEntry[] => {
    return patientData.map(({id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
        entries: []
    }));
}

const addPatient = (entry: newPatientEntry): PatientEntry => {
    const newPatientEntry = {
        id: uuid(),
        ...entry
    };
    patientData.push(newPatientEntry);
    return newPatientEntry;
}

const getSinglePatient = (id: string): PatientEntry | undefined => {
    const patient = patientData.find(p => p.id === id);
    if (patient) {
        patient.entries = [];
    }
    return patient;
}

export default {
    getPatients,
    getNonSensitivePatients,
    addPatient,
    getSinglePatient
}