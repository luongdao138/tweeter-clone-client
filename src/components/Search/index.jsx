import React, { useState } from 'react';
import { Wrapper } from './Search.styles';
import { MdSearch } from 'react-icons/md';
import { useHistory } from 'react-router';
const Search = () => {
  const history = useHistory();
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim().length) return;
    history.push(`/search?q=${query}`);
  };

  return (
    <Wrapper onSubmit={handleSubmit}>
      <MdSearch />
      <input
        type='text'
        placeholder='Search'
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type='submit'>Search</button>
    </Wrapper>
  );
};

export default Search;
