import { useState } from 'react'

const StatisticLine = (props) => <tr><td>{props.text}</td><td>{props.value}</td></tr>

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Statistics = (props) => {
  const good = props.good
  const neutral = props.neutral
  const bad = props.bad
  const average = () => (good - bad)/(good + neutral + bad)
  const positive = () => good/(good + neutral + bad)
  if (good === 0 && neutral === 0 && bad === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }
  return (
    <table>
    <tbody>
    <StatisticLine text='good' value={good}/>
    <StatisticLine text='neutral' value={neutral}/>
    <StatisticLine text='bad' value={bad}/>
    <StatisticLine text='all' value={good + neutral + bad}/>
    <StatisticLine text='average' value={average()}/>
    <StatisticLine text='positive' value={positive()}/>
    </tbody>
    </table>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const setValue = (value, setState) => {
    setState(value + 1)
  }

  return (
    <div>
      <h1>Give feedback</h1>
      <Button handleClick={() => setValue(good, setGood)} text={'good'}/>
      <Button handleClick={() => setValue(neutral, setNeutral)} text={'neutral'}/>
      <Button handleClick={() => setValue(bad, setBad)} text={'bad'}/>
      <h1>Statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
