import Head from 'next/head';
import Link from 'next/link';
import styles from './layout.module.css';

const Layout = ({children, home}) => (
  <>
    <Head>
      <title>Next Fauna CRUD</title>
      <link ref="icon" href="/favicon.ico" />
    </Head>

    <div className={styles.container}>
      <main>
        {children}
      </main>

      {!home && (
      <div className={styles.backToHome}>
        <Link href="/">
          <a>← Back to home</a>
        </Link>
      </div>
    )}
    </div>
  </>
);

export default Layout;