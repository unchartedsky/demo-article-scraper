import { ConfigProvider, theme } from 'antd';
import 'antd/dist/reset.css';
import type { AppProps } from 'next/app';
import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
      }}
    >
      <Component {...pageProps} />
    </ConfigProvider>
  );
}
