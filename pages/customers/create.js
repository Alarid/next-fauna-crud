import {useState} from 'react';
import Router from 'next/router';
import {useForm} from 'react-hook-form';
import Layout from '../../components/layout';
import styles from '../../styles/create-customer.module.css';

const Create = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const {handleSubmit, register, errors} = useForm();

  // handle form submit
  const onSubmit = handleSubmit(async (formData) => {
    if (errorMessage)
      setErrorMessage('');

    try {
      const res = await fetch('/api/customers/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (res.status === 200) {
        Router.push('/');
      } else {
        throw new Error(await res.text());
      }
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message);
    }
  });

  return (
    <Layout>
      <h1>Create customer</h1>
      <form onSubmit={onSubmit}>
        <div>
          <label>First name</label>
          <input
            type="text"
            name="firstName"
            placeholder="e.g. John"
            ref={register({ required: 'First name is required'})}
          />
          {errors.firstName && (
            <span role="alert" className={styles.error}>
              {errors.firstName.message}
            </span>
          )}
        </div>

        <div>
          <label>Last name</label>
          <input
            type="text"
            name="lastName"
            placeholder="e.g. Doe"
            ref={register({ required: 'Last name is required'})}
          />
          {errors.lastName && (
            <span role="alert" className={styles.error}>
              {errors.lastName.message}
            </span>
          )}
        </div>

        <div>
          <label>Telephone</label>
          <input
            type="text"
            name="telephone"
            placeholder="e.g. 123-456-7890"
            ref={register}
          />
          {errors.telephone && (
            <span role="alert" className={styles.error}>
              {errors.telephone.message}
            </span>
          )}
        </div>

        <div>
          <label>Credit Card Number</label>
          <input
            type="text"
            name="creditCardNumber"
            placeholder="e.g. 1234567890123456"
            ref={register}
          />
          {errors.creditCardNumber && (
            <span role="alert" className={styles.error}>
              {errors.creditCardNumber.message}
            </span>
          )}
        </div>

        <div className={styles.submit}>
          <button type="submit" className={styles.submitButton}>
            Create
          </button>
        </div>
      </form>

      {errorMessage && (
        <p role="alert" className={styles.errorMessage}>
          {errorMessage}
        </p>
      )}
    </Layout>
  );
};

export default Create;