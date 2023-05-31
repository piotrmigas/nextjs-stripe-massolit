import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import { auth, createUserProfileDocument } from '../firebase';

const SignUp = () => {
  const router = useRouter();
  const [error, setError] = useState(null);

  const { register, handleSubmit, formState } = useForm({
    mode: 'onChange',
  });

  const onSubmit = async ({ name, email, password }: { name: string; email: string; password: string }) => {
    try {
      const { user } = await auth.createUserWithEmailAndPassword(email, password);
      await createUserProfileDocument(user, { displayName: name });
      router.push('/');
    } catch (error) {
      setError(error);
    }
  };

  return (
    <Layout title='Rejestracja'>
      <div className='container'>
        <div className='columns is-centered has-text-centered mt-6'>
          <div className='column is-one-third'>
            <h4 className='title is-4'>Rejestracja</h4>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='field'>
                <p className='control has-icons-left'>
                  <input
                    {...register('name', {
                      required: true,
                    })}
                    className={`input ${formState.errors.name && 'is-danger'}`}
                    placeholder='Imię i nazwisko'
                  />
                  <span className='icon is-small is-left'>
                    <i className='fas fa-user' />
                  </span>
                </p>
              </div>
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
                  <span className='icon is-small is-left'>
                    <i className='fas fa-envelope' />
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
                    <i className='fas fa-lock' />
                  </span>
                </p>
              </div>
              <div className='field'>
                <p className='control'>
                  <button type='submit' className='button is-black mt-2'>
                    Utwórz konto
                  </button>
                </p>
              </div>
              <div className='error-message mt-2'>{error && <p>{error.message}</p>}</div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SignUp;
