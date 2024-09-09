import { useState } from 'react';

const SearchForm = () => {
  const [inputText, setInputText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputText);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        name='search'
        placeholder='cat'
        className='form-input search-input'
        value={inputText}
        onChange={(event) => setInputText(event.target.value)}
      />
    </form>
  );
};
export default SearchForm;
