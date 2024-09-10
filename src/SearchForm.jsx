import { useState } from 'react';
import { useGlobalContext } from './context';

// The SearchForm component has a title and a text input element. It should probably have a submit button too,
// although hitting enter to submit feels intuitive enough
const SearchForm = () => {
  // Access a function from global context allowing us to set the search phrase state variable from here
  const { setSearchPhrase } = useGlobalContext();

  // Set up a local state variable to control the text input
  const [inputText, setInputText] = useState('');

  // Function to handle the submitting of a search phrase. We override the default form behaviour so that we
  // can also invoke the setSearchPhrase function from the global context with whatever the user just typed.
  // Also reset the input text to blank because that's expected behaviour
  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchPhrase(inputText);
    setInputText('');
  };

  // Return the JSX for the title and form, controlling the text input by setting its value to the local state
  // variable and using the onChange event to change that variable
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
