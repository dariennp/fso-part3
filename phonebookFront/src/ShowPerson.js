const ShowPerson = ({personsToShow,removePerson}) =>{
    return (
    <ul>
        {personsToShow.map(person =>
        <> 
        <li key={person.id}> {person.name} : {person.number}</li> 
        <button onClick={() => removePerson(person.id,person.name)}> Delete </button>
        </> )}
    </ul>
    )
}

export default ShowPerson