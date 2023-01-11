import { Input, Modal } from 'antd';
import DOMPurify from 'isomorphic-dompurify';
import Head from 'next/head';
import { useState } from 'react';
import styles from '../styles/index.module.css';

type Article = {
  url: string;
  title: string;
  description: string;
  image: string;
  author: string;
  content: string;
  published: string;
  source: string; // original publisher
  links: string[]; // list of alternative links
  ttr: Number; // time to read in second, 0 = unknown
};

const Home = () => {
  const [article, setArticle] = useState<Article>();

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
      .then((result) => setArticle(result));
  };

  const ArticleScrap = () => {
    const purifiedDom = (article && DOMPurify.sanitize(article.content)) || '<div></div>';
    return (
      <>
        <h1>{article?.title || ''}</h1>
        <span>{article?.published || ''}</span>
        <br />
        <span>{article?.author || ''}</span>
        <div dangerouslySetInnerHTML={{ __html: purifiedDom }} />
        <cite>{article?.url || ''}</cite>
      </>
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
        <article className={styles.domContainer}>
          <ArticleScrap />
        </article>
      </main>
    </>
  );
};

export default Home;
