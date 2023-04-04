import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../context/UserContext';
import { Order } from '../types';

type OrderFormProps = {
  setOrderDetails: (value: Order) => void;
};

const OrderForm = ({ setOrderDetails }: OrderFormProps) => {
  const { user } = useContext(UserContext);
  const { register, handleSubmit, formState } = useForm({
    mode: 'onChange',
  });

  const onSubmit = ({
    phone,
    pickupDate,
    pickupAddress,
  }: {
    phone: number;
    pickupDate: string;
    pickupAddress: string;
  }) => {
    setOrderDetails({ phone, pickupDate, pickupAddress });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='columns is-centered has-text-centered pt-3'>
        <div className='column is-one-quarter'>
          <p className='title is-5'>Zamówienie</p>
          <p className='title is-6'>
            Imię i nazwisko: <span className='has-text-weight-normal'>{user.displayName}</span>
          </p>

          <div className='field'>
            <p className='control has-icons-left'>
              <input
                type='number'
                {...register('phone', { required: true })}
                placeholder='Telefon'
                className={`input ${formState.errors.phone && 'is-danger'}`}
                min='0'
              />
              <span className='icon is-small is-left'>
                <i className='fas fa-phone' />
              </span>
            </p>
          </div>
        </div>
      </div>
      <div className='block'>
        Odbior zamówień: piątek 2.04 od 9:00 do 16:00, i sobota 3.04 od 9:00 do 14:00, ul. Smoleńsk 17 lub ul. Targowa 3
        / Pick-up time: Your order will be ready to be picked up between 9:00 and 16:00PM on Friday, April 2nd, or
        between 9:00 and 14:00 on Saturday, April 3rd, at the location you have chosen.
      </div>
      <div className='columns is-centered has-text-centered'>
        <div className='column is-one-quarter'>
          <div className='field pb-2'>
            <label className='label'>Czas odbioru:</label>
            <p className='control has-icons-left'>
              <span className={`select ${formState.errors.pickupDate && 'is-danger'}`}>
                <select {...register('pickupDate', { required: true })}>
                  <option value=''>Wybierz...</option>
                  <option value='Piątek, 02.IV / Friday, April 2nd'>Piątek, 02.IV / Friday, April 2nd</option>
                  <option value='Sobota, 03.IV / Saturday, April 3nd'>Sobota, 03.IV / Saturday, April 3nd</option>
                </select>
              </span>
              <span className='icon is-small is-left'>
                <i className='far fa-calendar-alt' />
              </span>
            </p>
          </div>
          <div className='field'>
            <label className='label'>Odbiór w sklepie:</label>
            <p className='control has-icons-left mb-5'>
              <span className={`select ${formState.errors.pickupAddress && 'is-danger'}`}>
                <select {...register('pickupAddress', { required: true })}>
                  <option value=''>Wybierz...</option>
                  <option value='Massolit Bakery - ul.Smoleńsk 17'>Massolit Bakery - ul.Smoleńsk 17</option>
                  <option value='Massolit Bakes (Podgórze) - ul.Targowa 3'>
                    Massolit Bakes (Podgórze) - ul.Targowa 3
                  </option>
                </select>
              </span>
              <span className='icon is-small is-left'>
                <i className='fas fa-shopping-bag' />
              </span>
            </p>
          </div>
          <button type='submit' className='button is-black mt-2 mb-6'>
            Kontynuuj
          </button>
        </div>
      </div>
    </form>
  );
};

export default OrderForm;
