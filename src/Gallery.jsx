import { useGlobalContext } from './context';
import { useQuery } from '@tanstack/react-query';
import customFetch from './utils';

const getPhotosQueryKey = 'getPhotos';

const Gallery = () => {
  const { searchPhrase } = useGlobalContext();

  const { isLoading, isError, data } = useQuery({
    queryKey: [getPhotosQueryKey, searchPhrase],
    queryFn: async () => {
      const { data } = await customFetch.get(searchPhrase);
      return data;
    },
    enabled: !!searchPhrase, // This line prevents the query from running if searchPhrase is empty
  });

  if (!searchPhrase) return <div>Please enter a search phrase</div>;
  if (isLoading) return <div>Loading...</div>;
  if (isError || !data) return <div>Something went wrong</div>;

  console.log('Data is:');
  console.log(data);

  // TODO - use the image data to extract and display images

  return <div>Here is your gallery</div>;
};
export default Gallery;
