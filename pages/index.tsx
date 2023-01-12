import { Modal } from 'antd';
import clsx from 'clsx';
import DOMPurify from 'isomorphic-dompurify';
import dynamic from 'next/dynamic';
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

const InputUrl = dynamic(() => import('../components/input-url'), { ssr: false });

const Home = () => {
  const [article, setArticle] = useState<Article>();
  const [isStateLoading, setIsStateLoading] = useState(false);

  const clickSearchButton = (url: string) => {
    try {
      new URL(url);
    } catch (error) {
      return Modal.error({
        title: 'Error',
        content: 'Invalid url...',
      });
    }
    setIsStateLoading(true);
    fetch('/api/scrap', {
      method: 'POST',
      body: JSON.stringify({
        url,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) =>
        response.json().then((data) => {
          if (data == null) {
            throw new Error("Can't read article.");
          }
          return data;
        }),
      )
      .then((result) => setArticle(result))
      .catch((error) => {
        return Modal.error({ title: 'Error', content: error.message });
      })
      .finally(() => setIsStateLoading(false));
  };

  const ArticleScrap = () => {
    const purifiedDom = (article && DOMPurify.sanitize(article.content)) || '<div></div>';
    return (
      <>
        <AnimatedLoadingText loading={isStateLoading} />
        <div className={styles.loadingContainer}></div>
        <h1>{article?.title || ''}</h1>
        <span>{article?.published || ''}</span>
        <br />
        <span>{article?.author || ''}</span>
        <div dangerouslySetInnerHTML={{ __html: purifiedDom }}></div>
        <cite>{article?.url || ''}</cite>
      </>
    );
  };

  const AnimatedLoadingText = ({ loading }: { loading: boolean }) => {
    const letters = 'LOADING...'.split('').map((text, index) => {
      return (
        <span key={index} style={{ animationDelay: `${0.2 * index}s` }}>
          {text}
        </span>
      );
    });
    return (
      <div className={clsx(styles.animatedTextContainer, !loading && styles.hide)}>
        {...letters}
      </div>
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
        <InputUrl onSearch={clickSearchButton} loading={isStateLoading} />
        <article className={styles.domContainer}>
          <ArticleScrap />
        </article>
      </main>
    </>
  );
};

export default Home;
