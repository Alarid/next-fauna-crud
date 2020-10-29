import useSwr from 'swr';
import Link from 'next/link';
import Layout from '../components/layout';
import DataRow from '../components/data-row';
import styles from '../styles/home.module.css';

const fetcher = (url) => fetch(url).then((r) => r.json());

const Home = () => {
  const {data, error} = useSwr('/api/customers', fetcher);

  if (error)
    return <div>failed to load</div>;

  return (
    <Layout home>
      <h1>Next Fauna CRUD</h1>

      <Link href='/customers/create'>
        <a className={styles.createNew}>
          Create new customer
        </a>
      </Link>

      <div className={styles.table}>
        <h2>Customer Data</h2>
        <div className={styles.headerRow}>
          <h4>name</h4>
          <h4>telephone</h4>
          <h4 className={styles.creditCard}>credit card</h4>
        </div>
        {data ? (
          data.map((d) => (
            <DataRow
              key={d.ref['@ref'].id}
              id={d.ref['@ref'].id}
              firstName={d.data.firstName}
              lastName={d.data.lastName}
              telephone={d.data.telephone}
              creditCard={d.data.creditCard.number}
            />
          ))
        ) : (
          <>
            <DataRow loading />
            <DataRow loading />
            <DataRow loading />
          </>
        )}
      </div>
    </Layout>
  )
};

export default Home;