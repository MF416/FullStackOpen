import { useState, useEffect } from 'react';
import { DiaryEntry, NewDiaryEntry } from './types';
import { getAllEntries, addEntry } from './diaryService';
import Notification from './components/Notification';

function App() {
  const [Entries, setEntries] = useState<DiaryEntry[]>([]);
  const [Date, setDate] = useState('');
  const [Visibility, setVisibility] = useState('');
  const [Weather, setWeather] = useState('');
  const [Comment, setComment] = useState('');
  const [axError, setAxError] = useState('');

  useEffect(() => {
    getAllEntries().then(data => {
      setEntries(data);
    })
  }, []);

  const createEntry = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const newEntry: NewDiaryEntry = {
      date: Date,
      visibility: Visibility,
      weather: Weather,
      comment: Comment,
    }
    console.log('newEntry: ', newEntry)
    try {
      const response = await addEntry(newEntry);
      setEntries([...Entries, response]);
      setDate('');
      setVisibility('');
      setWeather('');
      setComment('');
    } catch (error) {
      if (error instanceof Error) {
        setAxError(error.message);
        setTimeout(() => {
          setAxError('');
        }, 5000);
      } else {
        console.log('Non-axios error: ', error);
      }
    }
  }


  return (
    <>
      <h1>New Diary Entry</h1>
      <Notification error={axError} />
      <form onSubmit={createEntry}>
        <label>
          Date:
          <input type="date" name="date" value={Date} onChange={(event) => setDate(event.target.value)}/>
        </label>
        <br></br>
        <label>
          Visibility:
           great <input type="radio" name="visibility" onChange={() => setVisibility('great')}/>
           good <input type="radio" name="visibility" onChange={() => setVisibility('good')}/>
           ok <input type="radio" name="visibility" onChange={() => setVisibility('ok')}/>
           poor <input type="radio" name="visibility" onChange={() => setVisibility('poor')}/>
        </label>
        <br></br>
        <label>
          Weather:
          sunny <input type="radio" name="weather" onChange={() => setWeather('sunny')}/>
          rainy <input type="radio" name="weather" onChange={() => setWeather('rainy')}/>
          cloudy <input type="radio" name="weather" onChange={() => setWeather('cloudy')}/>
          stormy <input type="radio" name="weather" onChange={() => setWeather('stormy')}/>
          windy <input type="radio" name="weather" onChange={() => setWeather('windy')}/>


        </label>
        <br></br>
        <label>
          Comment:
          <input type="text" name="comment" value={Comment} onChange={(event)=> setComment(event.target.value)}/>
        </label>
        <br></br>
        <input type="submit" value="Submit" />
      </form>

      <h1>Diary entries</h1>
        {Entries.map(entry => (
          <div key={entry.id}>
            <h3>{entry.date}</h3> 
            visibility: {entry.visibility} <br></br>
            weather: {entry.weather} 
            {entry.comment}
          </div>
        ))}   
    </>
  );
}

export default App
