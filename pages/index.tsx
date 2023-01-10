import { Input, Modal } from 'antd';
import DOMPurify from 'isomorphic-dompurify';
import Head from 'next/head';
import { useState } from 'react';
import styles from '../styles/index.module.css';

const Home = () => {
  const [htmlResult, setHtmlResult] = useState('<div></div>');

  const clickSearchButton = (url: string) => {
    try {
      new URL(url);
    } catch (error) {
      Modal.error({
        title: 'Error',
        content: 'Invalid url...',
      });
    }
    fetch('/api/scrap', {
      method: 'POST',
      body: JSON.stringify({
        url,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json().then((data) => data))
      .then((result) => setHtmlResult(result.content));
  };

  const ArticleScrap = () => {
    const purifiedDom = DOMPurify.sanitize(htmlResult);
    return (
      <article className={styles.domContainer} dangerouslySetInnerHTML={{ __html: purifiedDom }} />
    );
  };

  return (
    <>
      <Head>
        <title>Article Scraper</title>
        <meta name='description' content='Article Scraper' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
      </Head>
      <main className={styles.main}>
        <Input.Search
          placeholder='Type full web address to scraping article.'
          allowClear
          enterButton='Scaping!'
          size='large'
          onSearch={clickSearchButton}
        />
        <ArticleScrap />
      </main>
    </>
  );
};

export default Home;
