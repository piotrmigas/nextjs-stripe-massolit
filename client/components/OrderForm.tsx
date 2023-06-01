import { useContext } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { UserContext } from '../context/UserContext';
import { Order } from '../types';

type OrderFormProps = {
  setOrderDetails: (value: Order) => void;
};

const OrderForm = ({ setOrderDetails }: OrderFormProps) => {
  const { user } = useContext(UserContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onChange' });

  const onSubmit: SubmitHandler<FieldValues> = ({
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
      <div className='columns is-centered has-text-centered pt-3 is-mobile'>
        <div className='column column is-two-fifths-mobile is-one-third-tablet is-one-quarter-desktop'>
          <p className='title is-5'>Zamówienie</p>
          <p className='title is-6'>
            Imię i nazwisko: <span className='has-text-weight-normal'>{user.displayName}</span>
          </p>
          <div className='field'>
            <div className='control has-icons-left'>
              <input
                {...register('phone', {
                  required: true,
                  pattern: {
                    value: /^(?:0\.(?:0[0-9]|[0-9]\d?)|[0-9]\d*(?:\.\d{1,2})?)(?:e[+-]?\d+)?$/,
                    message: 'Nieprawidłowy format numeru telefonu',
                  },
                })}
                placeholder='Telefon'
                className={`input ${errors.phone && 'is-danger'}`}
              />
              <span className='icon is-small is-left'>
                <i className='fas fa-phone' />
              </span>
            </div>
            {errors.phone && <p className='help is-danger'>{errors.phone.message as string}</p>}
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
          <div className='field mb-5'>
            <label className='label'>Czas odbioru:</label>
            <div className='control has-icons-left'>
              <span className={`select ${errors.pickupDate && 'is-danger'}`}>
                <select {...register('pickupDate', { required: true })}>
                  <option value=''>Wybierz...</option>
                  <option value='Piątek, 02.IV / Friday, April 2nd'>Piątek, 02.IV / Friday, April 2nd</option>
                  <option value='Sobota, 03.IV / Saturday, April 3nd'>Sobota, 03.IV / Saturday, April 3nd</option>
                </select>
                <span className='icon is-small is-left'>
                  <i className='far fa-calendar-alt' />
                </span>
              </span>
            </div>
          </div>
          <div className='field'>
            <label className='label'>Odbiór w sklepie:</label>
            <div className='control has-icons-left mb-5'>
              <span className={`select ${errors.pickupAddress && 'is-danger'}`}>
                <select {...register('pickupAddress', { required: true })}>
                  <option value=''>Wybierz...</option>
                  <option value='Massolit Bakery - ul.Smoleńsk 17'>Massolit Bakery - ul.Smoleńsk 17</option>
                  <option value='Massolit Bakes (Podgórze) - ul.Targowa 3'>
                    Massolit Bakes (Podgórze) - ul.Targowa 3
                  </option>
                </select>
                <span className='icon is-small is-left'>
                  <i className='fas fa-shopping-bag' />
                </span>
              </span>
            </div>
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
