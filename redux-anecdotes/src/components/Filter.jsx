import { filterChange } from '../reducers/filterReducer'
import { useDispatch } from 'react-redux'

const Filter = () => {
  const dispatch = useDispatch() 

  const handleChange = (event) => {
    const filterString = event.target.value
    dispatch(filterChange(filterString))    
  }

  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input name="filterField" onChange={handleChange} />
    </div>
  )
}

export default Filter