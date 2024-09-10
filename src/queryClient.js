import { QueryClient } from '@tanstack/react-query';

// Initialize a new Query Client instance. This is currently only used in the Gallery component,
// so of course could be done there rather than at a global level, but this way is more future-proofed
// if the app is extended
const queryClient = new QueryClient();

export default queryClient;
