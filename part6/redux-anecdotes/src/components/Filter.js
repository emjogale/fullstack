import { filterChange } from '../reducers/filterReducer';
import { useDispatch } from 'react-redux';

const Filter = () => {
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const search = event.target.value;
    console.log('search is ', search);
    dispatch(filterChange(search));
    // input-field value is in variable event.target.value
  };
  const style = {
    marginBottom: 10,
  };

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  );
};

export default Filter;
