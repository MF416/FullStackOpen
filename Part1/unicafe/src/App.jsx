import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [sum, setSum] = useState(0)

  const increaseGood = () => {
    setGood(good + 1)
    setAll(all + 1)
    setSum(sum + 1)
  }
  const increaseNeutral = () => {
    setNeutral(neutral + 1)
    setAll(all + 1)
  }
  const increaseBad = () => {
    setBad(bad + 1)
    setAll(all + 1)
    setSum(sum - 1)
  }

  return (
    <div>
      <Header text='give feedback'/>
      <Button handleClick={increaseGood} text='good'/>
      <Button handleClick={increaseNeutral} text='neutral'/>
      <Button handleClick={increaseBad} text='bad'/>
      <Header text='statistics'/>
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        all={all}
        sum={sum}
      />
    </div>
  )
}

const Statistics = (props) => {
  
  if (props.all === 0) {
    return(
      <div>No feedback given</div>
    )
  }
  
  return (
    <div>
      <table>
        <tbody>
        <StatisticsLine text='good' value={props.good}/>
        <StatisticsLine text='neutral' value={props.neutral}/>
        <StatisticsLine text='bad' value={props.bad}/>
        <StatisticsLine text='all' value={props.all}/>
        <StatisticsLine text='average' value={props.sum / props.all}/>
        <StatisticsLine text='positive' value={(props.good / props.all)*100} display='percentage'/>
        </tbody>
      </table>
    </div>
  )
  
}

const Button = (props) => <button onClick={props.handleClick}>{props.text}</button>

const Header = ({ text }) => <h1>{text}</h1>

const StatisticsLine = ({ text, value, display }) => {

  if (display === 'percentage') {
    return (
      <tr>
        <td>{text}</td> 
        <td>{value} %</td>
      </tr>
    )
  }

  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

export default App