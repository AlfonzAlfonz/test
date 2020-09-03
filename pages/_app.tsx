import { XcoreProvider, createTheme, typography, createScales, colors, lightColorTheme, container, link } from "@xcorejs/ui";
import NextApp from "next/app";
import React from "react";
import Head from "next/head";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const theme = createTheme({
  ...typography({
    variants: {
      lead: {
        pb: "1rem",
        fontSize: "2rem",
        mb: "2rem",
        lineHeight: "2.5rem"
      }
    }
  }),
  ...container({
    variants: {
      normal: {
        px: ["1.6rem", null, null, "20rem"]
      }
    }
  }),
  ...link({
    default: {
      textDecoration: "none"
    }
  }),
  ...createScales({
    ...colors(lightColorTheme, {
      grey: "#222",
      primary: "#DD6B20"
    })
  })
});

class App extends NextApp {
  render () {
    const { Component, pageProps } = this.props;

    return (
      <>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, shrink-to-fit=no, viewport-fit=cover"
          />
        </Head>

        <XcoreProvider theme={theme}>
          <Component {...pageProps} />
        </XcoreProvider>
      </>
    );
  }
}

export default App;
