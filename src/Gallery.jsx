import { useGlobalContext } from './context'; // Access the global context we've set up
import { useQuery } from '@tanstack/react-query'; // Use React Query
import axios from 'axios'; // Use Axios

// Construct the URL to be used in the API query, minus the search term which will be added
// when the user inputs one. The Unsplash API key needs to not be hard-coded here because
// then anyone browsing the code in the Github repo could use it. So it's an environment
// variable instead, which we .gitignore
const baseURL = 'https://api.unsplash.com/search/photos';
const params = `?page=1&client_id=${import.meta.env.VITE_API_KEY}`;

// The Gallery component, responsible for querying Unsplash and displaying the images it gets back
const Gallery = () => {
  // Pull the current search phrase from global context, where it is stored as a state variable
  // once the user submits a search phrase in the form input field
  const { searchPhrase } = useGlobalContext();

  // No point in proceeding if we don't have a search phrase
  if (!searchPhrase)
    return (
      <section className='image-container'>
        <h4>Please enter a search phrase</h4>
      </section>
    );

  // Complete the URL by adding in the search phrase as a parameter
  const url = `${baseURL}${params}&query=${searchPhrase}`;

  // Use React Query to talk to the Unsplash API and hopefully get some images back
  const response = useQuery({
    queryKey: ['images', searchPhrase],
    queryFn: async () => {
      const result = await axios.get(url);
      return result.data;
    },
    // Prevent the query from running if searchPhrase is empty. Redundant because of the above check
    // but left in for reference
    enabled: !!searchPhrase,
  });

  // The response from React Query includes 'isLoading' and 'isError'. In either of those cases we
  // Can display an appropriate message rather than trying to show images
  if (response.isLoading)
    return (
      <section className='image-container'>
        <h4>Loading...</h4>
      </section>
    );
  if (response.isError || !response.data || !response.data.results)
    return (
      <section className='image-container'>
        <h4>Sorry - something went wrong</h4>
      </section>
    );

  const results = response.data.results;
  if (results.length === 0)
    return (
      <section className='image-container'>
        <h4>No search results found</h4>
      </section>
    );

  // If we made it this far then we successfully got images back, in the form of an array of objects
  // containing URLs buried inside. So display them in the JSX by iterating over the results array,
  // pulling out the appropriate URL for each image object and then using it as the 'src' for an image element.
  return (
    <section className='image-container'>
      {results.map((item) => {
        const url = item?.urls?.regular;
        return (
          <img
            key={item.id}
            src={url}
            alt={item.alt_description}
            className='img'
          />
        );
      })}
    </section>
  );
};
export default Gallery;
