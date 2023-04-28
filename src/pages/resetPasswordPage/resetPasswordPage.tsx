import React, { FC, FormEvent } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from '../../services/types/hooks';
import style from './resetPasswordPage.module.css';

import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { setNewPassword } from '../../services/actions/profileActions';
import { Loader } from '../../components/loader/loader';

export const ResetPasswordPage: FC = () => {
  const dispatch = useDispatch();

  const [password, setPassword] = React.useState('');
  const [code, setCode] = React.useState('');

  const [isVisible, setVisible] = React.useState(false);

  const setPasswordAnswer = useSelector((state) => state.profileReducer.setPasswordAnswer);
  const setPasswordRequest = useSelector((state) => state.profileReducer.setPasswordRequest);
  const setPasswordFailed = useSelector((state) => state.profileReducer.setPasswordFailed);

  const resetPasswordFailed = useSelector((state) => state.profileReducer.resetPasswordFailed);

  const handleSave = (e: FormEvent) => {
    e.preventDefault();
    dispatch(setNewPassword(password, code));
  };

  if (setPasswordAnswer) {
    return <Navigate to={'/'} />;
  };

  if(resetPasswordFailed) {
    return <Navigate to={'/forgot-password'} />;
  };

  return (
    <>

      {setPasswordRequest && (
        <Loader />
      )}

      {setPasswordFailed && (
        <span className={`text text_type_main-medium`}>Что-то пошло не так...</span>
      )}

      {!setPasswordRequest && !setPasswordFailed && (
        <div className={style.container}>
          <h2 className='text text_type_main-medium mb-6'>Восстановление пароля</h2>

          <form className={style.form} onSubmit={(e) => handleSave(e)}>

            <Input extraClass='mb-6' 
              type={isVisible ? 'text' : 'password'} 
              placeholder={'Введите новый пароль'} 
              onChange={e => setPassword(e.target.value)}
              icon={isVisible ? 'HideIcon' : 'ShowIcon'}
              value={password}
              name={'password'}
              error={false}
              onIconClick={() => setVisible(!isVisible)}
              errorText={'Ошибка'}
              size={'default'}
            />

            <Input extraClass='mb-6'
              type={'text'}
              placeholder={'Введите код из письма'}
              onChange={e => setCode(e.target.value)}
              value={code}
              name={'code'}
              error={false}
              errorText={'Ошибка'}
              size={'default'}
            />

            <Button extraClass='mb-20' htmlType='submit' type='primary' size='medium'>Сохранить</Button>

          </form>

          <p className='text text_type_main-default text_color_inactive'>Вспомнили пароль? 
            <Link to='/login' className={`${style.link} ml-2 mb-4`}>Войти</Link>
          </p>

        </div>
      )}

    </>
  );
};
