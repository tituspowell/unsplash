import { useState } from 'react';
import { useGlobalContext } from './context';

const SearchForm = () => {
  const { setSearchPhrase } = useGlobalContext();
  const [inputText, setInputText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchPhrase(inputText);
    setInputText('');
  };

  return (
    <section>
      <h1 className='title'>Unsplash Image Search</h1>
      <form onSubmit={handleSubmit} className='search-form'>
        <input
          type='text'
          name='search'
          placeholder='cat'
          className='form-input search-input'
          value={inputText}
          onChange={(event) => setInputText(event.target.value)}
        />
      </form>
    </section>
  );
};
export default SearchForm;
