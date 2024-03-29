import { Fragment } from "react";
import type { AppProps } from "next/app";
import Header from "../components/Header";

import "../styles/globals.scss";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <Fragment>
            <Header />
            <Component {...pageProps} />
        </Fragment>
    );
}

export default MyApp;
