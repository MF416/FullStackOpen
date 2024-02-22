import { useDispatch, useSelector } from 'react-redux'
import { addVoteTo } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import Filter from './Filter'
import Notification from './Notification'


const AnecdoteList = () => {
    const dispatch = useDispatch()
    
    const anecdotes = useSelector( state => {
        const filter = state.filter.toLowerCase();
        if ( filter === '' ) {
            return state.anecdotes.slice().sort((a,b) => b.votes - a.votes)
        }
        else {
            return state.anecdotes
                .filter((anecdote) =>
                anecdote.content.toLowerCase().includes(filter)
                )
                .sort((a, b) => b.votes - a.votes);
        }
      })


  const vote = (id) => {
    dispatch(addVoteTo(id))
    const added = anecdotes.find(anecdote => anecdote.id === id)
    dispatch(setNotification(`you voted: '${added.content}'`, 5))
  }

  return (
    <>
    <h2>Anecdotes</h2>
    <Notification />
    <Filter />
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </>
  )

}

export default AnecdoteList