import { useState } from 'react';
import { useGlobalContext } from './context';

const SearchForm = () => {
  const { setSearchPhrase } = useGlobalContext();
  const [inputText, setInputText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchPhrase(inputText);
    setInputText('');
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
