import Layout from "@/component/Layout";
import SnackBar from "@/component/snackBar";
import { store } from "@/store";
import { theme } from "@/theme";
import { ThemeProvider } from "@mui/material";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import "../styles/global.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Layout>
            <Component {...pageProps} />
            <SnackBar />
          </Layout>
        </ThemeProvider>
      </Provider>
    </SessionProvider>
  );
}
