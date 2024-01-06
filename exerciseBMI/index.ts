import express from 'express';
import { calculateBMI } from './calculateBmi';
import { calculateExercises } from './calculateExercises';
const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.post('/exercises', (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { daily_exercises, target } = req.body;
    const parsedHours = daily_exercises as number[];
    const parsedTarget = target as number;

    console.log('parsedHours: ', parsedHours);
    console.log('parsedTarget: ', parsedTarget);

    if (!parsedHours || !parsedTarget) {
        res.status(400).json({
            error: 'parameters missing'
        });   
    } else if (parsedHours.some(hours => isNaN(Number(hours))) || isNaN(Number(target))) {
        res.status(400).json({
            error: 'malformatted parameters'
        });
    } else {
        const result = calculateExercises(parsedHours, parsedTarget);
        res.json(result);
    } 
});

app.get('/bmi', (req, res) => {
    const { height, weight } = req.query;
    if (!isNaN(Number(height)) && !isNaN(Number(weight))) {
        const bmi = calculateBMI(Number(height), Number(weight));
        res.json({
            weight,
            height,
            bmi
        });
    } else {
        res.status(400).json({
            error: 'malformatted parameters'
        });
    }

});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});