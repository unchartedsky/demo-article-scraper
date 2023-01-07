import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import { Button, Input } from "antd";

import styles from "../styles/index.module.css";

export default function Home() {
  return (
    <>
      <Head>
        <title>Article Scraper</title>
      </Head>
      <main className={styles.main}>
        <Input.Search
          placeholder="input search text"
          allowClear
          enterButton="Search"
          size="large"
          onSearch={() => {}}
        />
      </main>
    </>
  );
}
