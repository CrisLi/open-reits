import Document, { Head, Main, NextScript } from 'next/document';
import htmlescape from 'htmlescape';
import flush from 'styled-jsx/server';
import enUS from 'antd/lib/locale-provider/en_US';
import { LocaleProvider } from 'antd';

export default class MyDocument extends Document {

  static getInitialProps({ renderPage }) {
    const { html, head, errorHtml, chunks } = renderPage();
    const styles = flush();
    return { html, head, errorHtml, chunks, styles };
  }

  render() {
    return (
      <html lang="en">
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta charSet="utf-8" />
          <link rel="stylesheet" href="/_next/static/style.css" />
        </Head>
        <body>
          <LocaleProvider locale={enUS}>
            <Main />
          </LocaleProvider>
          <script dangerouslySetInnerHTML={{ __html: `__ENV__ = ${htmlescape(process.env)}` }} />
          <NextScript />
        </body>
      </html>
    );
  }

}
