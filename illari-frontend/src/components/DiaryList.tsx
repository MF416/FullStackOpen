import { DiaryEntry } from "../types";

const DiaryList = (entries: DiaryEntry[]) => {
  
  return (
        <>
          <h1>Diary entries</h1>
            {entries.map(entry => (
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

export default DiaryList;