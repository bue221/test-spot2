import type { AppProps } from "next/app";
import { Box, ChakraProvider } from "@chakra-ui/react";
//
import { theme } from "@theme/index";
//redux
import { store } from "@redux/store";
import { Provider } from "react-redux";
//
import ButtonChageTheme from "@components/ButtonChangeTheme";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <Box h="100vh" position="relative">
          <ButtonChageTheme
            position="absolute"
            right="0.5em"
            top="6em"
            zIndex={99}
          />
          <Component {...pageProps} />
        </Box>
      </ChakraProvider>
    </Provider>
  );
}

export default MyApp;
