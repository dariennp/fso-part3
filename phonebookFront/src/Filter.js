const Filter = ({newFilter, handleFilter}) => {
    return (
        <div>
        filter: <input value={newFilter} onChange={handleFilter}/>
      </div>
    )
}

export default Filter