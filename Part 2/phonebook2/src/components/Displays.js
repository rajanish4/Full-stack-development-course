const Display = (props) => {
    if (props.name.toLowerCase().includes(props.filter.toLowerCase())){
    return (
    <>
    <li>{props.name} {props.number} <button onClick={props.deletePerson}>delete</button> </li> 
    </>
    
    )}
  }
  
const Filter = (props) => {
return (
<div>
filter shown with: <input value={props.newFilter} 
onChange={props.handlePersonFilter} />
</div>
)
}
  
const PersonForm = (props) => {
return(
    <form onSubmit={props.addPerson}>
    <div>
    name: <input value={props.newName} 
    onChange={props.handlePersonChange} />
    </div>
    <div>
    number: <input value={props.newNumber}
    onChange={props.handlePersonChangeNumber} />
    </div>
    <div>
    <button type="submit">add</button>
    </div>
</form>
)
}
  
const Persons = (props) => {
console.log(props)
return(
    <div>
    {props.persons.map(person =>
    <Display key={person.id} name={person.name} number={person.number} 
    filter={props.newFilter} deletePerson={() => props.deletePerson(person.id)} />
    )}
    </div>
)
}

export default { Display, Filter, PersonForm, Persons }