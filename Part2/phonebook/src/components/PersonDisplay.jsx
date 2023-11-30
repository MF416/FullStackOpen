const Person = ({ name, number, deletePerson }) => {
    return (
    <div>
      {name} {number}
      <button onClick={deletePerson}>delete</button>
    </div>
    )
  }
  
  const PersonDisplay = ({personstoShow, deletePersonOf}) => {
    return (
      <div>
        {personstoShow.map(person =>
          <Person 
            key={person.id} 
            name={person.name} 
            number={person.number} 
            deletePerson={() => deletePersonOf(person.id)}/>)}
      </div>
    )
  }

export default PersonDisplay