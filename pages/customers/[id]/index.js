import Link from 'next/link';
import {useRouter} from 'next/router';
import useSWR from 'swr';
import Layout from '../../../components/layout';
import styles from '../../../styles/customer.module.css';

const fetcher = (url) => fetch(url).then((r) => r.json());

const Customer = () => {
  const router = useRouter();
  const {id} = router.query;
  const {data, error} = useSWR(`/api/customers/${id}`, fetcher);

  if (error) return <div>failed to load</div>;

  const onDelete = async () => {
    try {
      const res = await fetch(`/api/customers/${id}/delete`, {
        method: 'DELETE',
      });
      if (res.status === 200) {
        router.push('/');
      } else {
        throw new Error(await res.text());
      }
    } catch (e) {
      console.error(error);
    }
  };

  return (
    <Layout>
      <h1>Customer</h1>
      <hr />
      {data ? (
        <div>
          <p className={styles.name}>
            {data.firstName} {data.lastName}
          </p>
          <p className={styles.num}>{data.telephone}</p>
          <p className={styles.num}>{data.creditCard.number}</p>

          <div className={styles.buttons}>
            <Link href="/customers/[id]/update" as={`/customers/${id}/update`}>
              <a className={styles.editButton}>Edit</a>
            </Link>
            <button onClick={onDelete} className={styles.deleteButton}>
              Delete
            </button>
          </div>
        </div>
      ) : (
        <div>loading...</div>
      )}
    </Layout>
  )
};

export default Customer;