import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Maxvotes = (props) => {
  const maxval = Math.max(...props.points)
  const maxindex = props.points.indexOf(maxval)
  console.log(maxval, maxindex)

  if (maxval === 0) {
    return <div>Not voted yet</div>
  }

  return <div>{props.anecdotes[maxindex]}
    Has {maxval} votes.
  </div>
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(new Array(anecdotes.length).fill(0))
  const max = anecdotes.length - 1
  const min = 0
  const copypoints = [...points]
  const random = Math.floor(Math.random() * (max - min + 1)) + min
  const setValue = () => setSelected(random)
  const setVote = () => {
    copypoints[selected] += 1
    setPoints(copypoints) 
  }
  
    return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <Button handleClick={setValue} text='Next anecdote'/>
      <Button handleClick={setVote} text='Vote'/>
      has {points[selected]} votes.
      <h1>Anecdote with most votes</h1>
      <Maxvotes points={points} anecdotes={anecdotes}/>
    </div>
  )
}

export default App
