import React, { FC, FormEvent } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from '../../services/types/hooks';

import style from './loginPage.module.css';
import { EmailInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { logInToSite } from '../../services/actions/profileActions';
import { Loader } from '../../components/loader/loader';

export const LoginPage: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const location = useLocation();

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isVisible, setVisible] = React.useState(false);

  const authorizationRequest = useSelector((state) => state.profileReducer.authorizationRequest);
  const authorizationFailed = useSelector((state) => state.profileReducer.authorizationFailed);

  const handleAuthorization = (e: FormEvent) => {
    e.preventDefault();
    dispatch(logInToSite(email, password, () => navigate(location?.state?.previousLocation ? location.state.previousLocation : '/')));
  };
 
  return (
    <>

      {authorizationRequest && <Loader />}

      {authorizationFailed && (
        <span className={`text text_type_main-medium`}>Что-то пошло не так...</span>
      )}

      {!authorizationRequest && !authorizationFailed && (
        <div className={style.container}>
          <h2 className='text text_type_main-medium mb-6'>Вход</h2>
  
          <form className={style.form} onSubmit={(e) => handleAuthorization(e)}>
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
  
            <Button extraClass='mb-20' htmlType='submit' type='primary' size='medium'>Войти</Button>
          </form>
  
          <p className='text text_type_main-default text_color_inactive'>Вы — новый пользователь? 
            <Link to='/register' className={`${style.link} ml-2 mb-4`}>Зарегистрироваться</Link>
          </p>
          <p className='text text_type_main-default text_color_inactive'>Забыли пароль? 
            <Link to='/forgot-password' className={`${style.link} ml-2`}>Восстановить пароль</Link>
          </p>
  
        </div>
      )}

    </> 
  )
};
