import { Input } from 'antd';
import Head from 'next/head';
import styles from '../styles/index.module.css';

export default function Home() {
  return (
    <>
      <Head>
        <title>Article Scraper</title>
      </Head>
      <main className={styles.main}>
        <Input.Search
          placeholder='input search text'
          allowClear
          enterButton='Search'
          size='large'
          onSearch={() => {}}
        />
      </main>
    </>
  );
}
