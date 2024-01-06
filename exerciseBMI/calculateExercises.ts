export interface Result {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

export interface ExerciseValues {
    dailyExerciseHours: Array<number>;
    target: number;
}

const parseArrays = (args: Array<string>): ExerciseValues => {
    if (args.length < 4) throw new Error('Not enough arguments');

    const target = Number(args[2]);
    const dailyExerciseHours = args.slice(3).map(hours => Number(hours));

    if (isNaN(target) || dailyExerciseHours.some(hours => isNaN(hours))) {
        throw new Error('Provided values were not numbers!');
    }

    return {
        dailyExerciseHours,
        target
    };

};

export const calculateExercises = (dailyExerciseHours: Array<number>, target: number): Result => {

    const periodLength = dailyExerciseHours.length;
    const trainingDays = dailyExerciseHours.filter(hours => hours > 0).length;
    const average = dailyExerciseHours.reduce((a,b) => a + b, 0) / periodLength;
    const success = average >= target;
    const rating = success ? 3 : average >= target - 1 ? 2 : 1;
    const ratingDescription = success ? 'good' : average >= target - 1 ? 'not too bad but could be better' : 'bad';

    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average
    };
};

try {
    const {dailyExerciseHours, target} = parseArrays(process.argv);
    console.log('dailyExerciseHours', dailyExerciseHours);
    console.log(calculateExercises(dailyExerciseHours, target));
} catch (error: unknown) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
}