import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  const [votes, setVotes] = useState(new Uint8Array(anecdotes.length))
  const [selected, setSelected] = useState(0)
  const topVotes = votes.indexOf(Math.max(...votes))
  console.log('top vote index:', topVotes)

  const randomSelect = () => {
    const random = Math.floor(Math.random() * anecdotes.length)
    setSelected(random)
  }

  const castVote = () => {
    const copy = [...votes]
    copy[selected] += 1
    console.log('current votes:', copy)
    console.log('selected:', selected)
    setVotes(copy)
  }

  return (
    <>
      <Header text='Anecdote of the day'/>
      <VoteDisplay anecdote={anecdotes[selected]} voteNumber={votes[selected]}/>
      <div>
      <Button action={randomSelect} text='next anecdote'/>
      <Button action={castVote} text='vote'/>
      </div>
      <Header text='Anecdote with most votes'/>
      <VoteDisplay anecdote={anecdotes[topVotes]} voteNumber={votes[topVotes]}/>
    </>
  )
}

const Header = ({text}) => <h1>{text}</h1>

const Button = ({action, text}) => <button onClick={action}>{text}</button>

const VoteDisplay = ({anecdote, voteNumber}) => {
  return (
    <>
      <div>{anecdote}</div>
      <div>has {voteNumber} votes</div>
    </>
  )
}


export default App
