const ShowPerson = ({personsToShow,removePerson}) =>{
    return (
    <ul>
        {personsToShow.map(person =>
        <div key={person.id}> 
            <li key={person.name} > {person.name} : {person.number}</li> 
        <button onClick={() => removePerson(person.id,person.name)}> Delete </button>
        </div> )}
    </ul>
    )
}

export default ShowPerson