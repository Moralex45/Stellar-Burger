import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import style from './registerPage.module.css';

import { EmailInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import { registerOnSite } from '../../services/actions/profileActions.js';
import { Loader } from '../../components/loader/loader.jsx';

export const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const location = useLocation();

  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isVisible, setVisible] = React.useState(false);

  const registrationRequest = useSelector((state) => state.profileReducer.registrationRequest);
  const registrationFailed = useSelector((state) => state.profileReducer.registrationFailed);


  const handleRegistration = (e) => {
    e.preventDefault();
    dispatch(registerOnSite(email, password, name, () => navigate(location?.state?.previousLocation ? location.state.previousLocation : '/')));
  };

  return (
    <>

      {registrationRequest && (
        <Loader />
      )}

      {registrationFailed && (
        <span className={`text text_type_main-medium`}>Что-то пошло не так...</span>
      )}

      {!registrationRequest && !registrationFailed && (
        <div className={style.container}>
          <h2 className='text text_type_main-medium mb-6'>Регистрация</h2>
  
          <form className={style.form} onSubmit={(e) => handleRegistration(e)}>
            <Input extraClass='mb-6'
              type={'text'}
              placeholder={'Имя'}
              onChange={e => setName(e.target.value)}
              value={name}
              name={'name'}
              error={false}
              errorText={'Ошибка'}
              size={'default'}
            />
  
            <EmailInput extraClass='mb-6' 
              onChange={e => setEmail(e.target.value)} 
              value={email} 
              name={'email'} 
              isIcon={false} 
            />
  
            <Input extraClass='mb-6' 
              type={isVisible ? 'text' : 'password'} 
              placeholder={'Пароль'} 
              onChange={e => setPassword(e.target.value)}
              icon={isVisible ? 'HideIcon' : 'ShowIcon'}
              value={password}
              name={'password'}
              error={false}
              onIconClick={() => setVisible(!isVisible)}
              errorText={'Ошибка'}
              size={'default'}
            />
  
            <Button extraClass='mb-20' htmlType='submit' type='primary' size='medium'>Зарегистрироваться</Button>
  
          </form>
  
          <p className='text text_type_main-default text_color_inactive'>Уже зарегистрированы? 
            <Link to='/login' className={`${style.link} ml-2 mb-4`} htmlType='button' type='secondary' size='large'>Войти</Link>
          </p>
  
        </div>
      )}
    
    </>
  );
};
