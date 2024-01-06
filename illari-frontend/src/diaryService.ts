import axios from 'axios';
import { DiaryEntry, NewDiaryEntry } from './types';

const baseURL = 'http://localhost:3001/api/diaries';

export const getAllEntries = async () => {
  return axios
    .get<DiaryEntry[]>(baseURL)
    .then(response => response.data);
}

export const addEntry = async (entry: NewDiaryEntry) => {
try {
    const response = await axios.post<DiaryEntry>(baseURL, entry);
    return response.data;
} catch (error) {
    if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data || 'Unknown error');
    } else {
        console.log('DiaryService: Other error');
        throw new Error('Unknown error');
    }
    }
}