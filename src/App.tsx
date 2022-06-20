import '@fontsource/fascinate-inline';
import '@fontsource/clear-sans';
import '@fontsource/clear-sans/700.css';

import { ChakraProvider } from '@chakra-ui/react';
import theme from './theme';
import Main from './components/Main';

export const App = () => (
  <ChakraProvider theme={theme}>
    <Main />
  </ChakraProvider>
);
