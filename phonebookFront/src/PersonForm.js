const PersonForm = ({addName,newName,handleName,newNumber,handleNumber}) =>{
    
    return (
        <form onSubmit={addName}>
            <div>
                name: <input value={newName} onChange={handleName}/>
            </div>

            <div>
                number: <input value={newNumber} onChange={handleNumber}/>
            </div>

            <div>
            <button type="submit" >add</button>
            </div>
        </form>
    )
}

export default PersonForm