import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '../components/Layout';
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { auth } from '../firebase';

const SignIn = () => {
  const router = useRouter();
  const [error, setError] = useState(null);

  const { register, handleSubmit, formState } = useForm({
    mode: 'onChange',
  });

  const onSubmit = async ({ email, password }: { email: string; password: string }) => {
    try {
      await auth.signInWithEmailAndPassword(email, password);
      router.push('/');
    } catch (error) {
      setError(error);
    }
  };

  return (
    <Layout title='Logowanie'>
      <div className='container'>
        <div className='columns is-centered has-text-centered mt-6'>
          <div className='column is-one-third'>
            <h4 className='title is-4'>Logowanie</h4>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='field'>
                <p className='control has-icons-left'>
                  <input
                    {...register('email', {
                      required: true,
                      pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    })}
                    className={`input ${formState.errors.email && 'is-danger'}`}
                    placeholder='Email'
                  />
                  <span className='icon is-left'>
                    <FontAwesomeIcon icon={faEnvelope} />
                  </span>
                </p>
              </div>
              <div className='field'>
                <p className='control has-icons-left'>
                  <input
                    {...register('password', { required: true })}
                    className={`input ${formState.errors.password && 'is-danger'}`}
                    type='password'
                    placeholder='Hasło'
                  />
                  <span className='icon is-small is-left'>
                    <FontAwesomeIcon icon={faLock} />
                  </span>
                </p>
              </div>
              <div className='field'>
                <p className='control'>
                  <button type='submit' className='button is-black mt-2'>
                    Zaloguj
                  </button>
                </p>
              </div>
              Nie masz konta?{' '}
              <Link href='/signup'>
                <a>Zarejestruj się</a>
              </Link>
              <div className='error-message mt-2'>{error && <p>{error.message}</p>}</div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SignIn;
