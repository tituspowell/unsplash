import { useGlobalContext } from './context';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

// REMOVE THE UNSPLASH API KEY BEFORE DEPLOYING, FELLA...

const baseURL = 'https://api.unsplash.com/search/photos';
const params =
  '?page=1&client_id=HeumkG2NOb1CfEnaeX-Eg-bLKk1nFnOfO_QG8x_7JFE&query=';

const Gallery = () => {
  const { searchPhrase } = useGlobalContext();
  const url = `${baseURL}${params}${searchPhrase}`;
  console.log('Requesting Unsplash images for search term: ' + searchPhrase);

  const response = useQuery({
    queryKey: ['images'],
    queryFn: async () => {
      const result = await axios.get(url);
      return result.data;
    },
    enabled: !!searchPhrase, // This line prevents the query from running if searchPhrase is empty
  });

  // Deal with various fails
  if (!searchPhrase)
    return (
      <section className='image-container'>
        <h4>Please enter a search phrase</h4>
      </section>
    );
  if (response.isLoading)
    return (
      <section className='image-container'>
        <h4>Loading...</h4>
      </section>
    );
  if (response.isError || !response.data || !response.data.results)
    return (
      <section className='image-container'>
        <h4>Something went wrong</h4>
      </section>
    );

  const results = response.data.results;

  if (results.length === 0)
    return (
      <section className='image-container'>
        <h4>No search results found</h4>
      </section>
    );

  // We got at least one image back, so show them
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
