import diagnosisData from '../../data/diagnosesEntries';

import { DiagnosesEntry } from '../types';

const getDiagnoses = (): DiagnosesEntry[] => {
    return diagnosisData;
};

export default {
    getDiagnoses
}

