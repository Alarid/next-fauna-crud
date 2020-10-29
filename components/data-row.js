import Link from 'next/link';
import styles from './data-row.module.css';

const DataRow = ({
  id,
  firstName,
  lastName,
  telephone,
  creditCard,
  loading
}) => (
  <div className={styles.dataRow}>
    <p className={loading ? styles.loading : ''}>
      <Link href="/customers/[id]" as={`/customers/${id}`}>
        <a> {firstName} {lastName} </a>
      </Link>
    </p>
    <p className={`${styles.num} ${loading ? styles.loading : ''}`}>{telephone}</p>
    <p className={`${styles.creditCard} ${styles.num} ${loading ? styles.loading : ''}`}>
      {creditCard}
    </p>
  </div>
);

export default DataRow;