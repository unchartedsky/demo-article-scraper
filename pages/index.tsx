import { Input } from 'antd';
import Head from 'next/head';
import { useState } from 'react';
import styles from '../styles/index.module.css';

const Home = () => {
  const [htmlResult, setHtmlResult] = useState('');

  const clickSearchButton = (value: string) => {
    fetch('/api/scrap', {
      method: 'POST',
      body: JSON.stringify({
        url: value,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json().then((data) => data))
      .then((result) => setHtmlResult(result.content));
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
          placeholder='input search text'
          allowClear
          enterButton='Search'
          size='large'
          onSearch={clickSearchButton}
        />
        <div dangerouslySetInnerHTML={{ __html: htmlResult }} />
      </main>
    </>
  );
};

export default Home;
