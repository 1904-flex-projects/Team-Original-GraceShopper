import React from 'react';
import useForm from './../../hooks/useForm';
import { withRouter } from 'react-router-dom';
import { SEARCH_INPUT, SEARCH_BAR } from './styles';

const Searchbar = props => {
  const { history } = props;
  const searchSubmit = values => {
    const { search } = values;
    if (!search) {
      console.log('search cant be empty');
      return;
    }
    const encodedSearch = encodeURI(search);
    console.log('encoded search', encodedSearch);
    setValues({ search: '' });
    history.push({
      pathname: '/products/search',
      search: `?query=${encodedSearch}`,
    });
  };
  const [values, setValues, handleChange, handleSubmit] = useForm(
    searchSubmit,
    {
      search: '',
    }
  );
  return (
    <div id="search-bar" style={SEARCH_BAR}>
      <form action="submit" className="form-group">
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <input
            type="text"
            name="search"
            placeholder="Search"
            value={values.search}
            onChange={handleChange}
            style={SEARCH_INPUT}
            className="form-control"
          />
          &nbsp; &nbsp;
          <button
            type="submit"
            onClick={handleSubmit}
            className="btn btn-primary"
          >
            {' '}
            Search
          </button>
        </div>
        <hr color="white" />
      </form>
    </div>
  );
};

export default withRouter(Searchbar);
