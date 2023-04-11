import React, { useEffect, useCallback } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import style from './profilePage.module.css';

import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import { getCookie } from '../../utils/cookie.js';
import { logOutSite, sendProfileInfo } from '../../services/actions/profileActions.js';
import { Loader } from '../../components/loader/loader.jsx';

export const ProfilePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const profile = useSelector((state) => state.profileReducer.profile);
  const sendProfileDataRequest = useSelector((state) => state.profileReducer.sendProfileDataRequest);
  const sendProfileDataFaild = useSelector((state) => state.profileReducer.sendProfileDataFaild);
  const refreshTokenAnswer = useSelector((state) => state.profileReducer.refreshTokenAnswer);

  const accessToken = getCookie('token');
  const refreshToken = getCookie('refreshToken');

  const [newName, setNewName] = React.useState(profile.name);
  const [newEmail, setNewEmail] = React.useState(profile.email);
  const [newPassword, setNewPassword] = React.useState('');
  const [isDataChanged, setIsDataChanged] = React.useState(false);

  const nameRef = React.useRef(null);
  const emailRef = React.useRef(null);
  const passwordRef = React.useRef(null);

  const onNameClick = () => nameRef.current.focus();
  const onEmailClick = () => emailRef.current.focus();
  const onPasswordClick = () => passwordRef.current.focus();

  const setActiveClass = ({ isActive }) => `${isActive ? style.link_active : style.link} text text_type_main-medium`;

  const isNameChanged = (e) => {
    setNewName(e.target.value);
    setIsDataChanged(true);
  };

  const isEmailChanged = (e) => {
    setNewEmail(e.target.value);
    setIsDataChanged(true);
  };

  const isPasswordChanged = (e) => {
    setNewPassword(e.target.value);
    setIsDataChanged(true);
  };

  const handleLogOut = () => {
    dispatch(logOutSite(refreshToken, () => navigate('/', { replace: true })));
  };

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(sendProfileInfo(accessToken, newEmail, newName, newPassword));
    }, [dispatch, accessToken, newEmail, newName, newPassword]
  );

  useEffect(() => {
    if (sendProfileDataFaild) {
      dispatch(sendProfileInfo(accessToken, newEmail, newName, newPassword));
    }
  }, [refreshTokenAnswer]);

  const cancelEditing = () => {
    setNewName(profile.name);
    setNewEmail(profile.email);
    setNewPassword('');
  };

  return (
    <div className={`${style.container} mt-30`}>

      <nav className={style.nav}>
        <ul className={style.list}>
          <li className='mt-5'>
            <NavLink to='/profile' className={setActiveClass}>Профиль</NavLink>
          </li>
          <li>
            <NavLink to='/profile/orders' className={setActiveClass}>История заказов</NavLink>
          </li>
          <li>
            <button className={`${style.button} text text_type_main-medium`} onClick={handleLogOut}>Выход</button>
          </li>
        </ul>

        <span className={`${style.span} text text_type_main-default`}>В этом разделе вы можете<br></br>изменить свои персональные данные</span>
      </nav>

      {sendProfileDataRequest && (
        <Loader />
      )}

      {sendProfileDataFaild && (
        <span className={`text text_type_main-medium`}>Что-то пошло не так...</span>
      )}

      {!sendProfileDataRequest && !sendProfileDataFaild && (
        <form onSubmit={handleSubmit}>

          <Input extraClass='mb-6' 
            type={'text'} 
            placeholder={'Имя'} 
            onChange={isNameChanged}
            icon={'EditIcon'}
            value={newName}
            name={'name'}
            error={false}
            ref={nameRef}
            onIconClick={onNameClick}
            errorText={'Ошибка'}
            size={'default'}
          />

          <Input 
            extraClass='mb-6' 
            type={'email'} 
            placeholder={'Логин'}
            onChange={isEmailChanged} 
            value={newEmail} 
            name={'email'} 
            icon={'EditIcon'}
            ref={emailRef}
            onIconClick={onEmailClick}
            error={false}
            errorText={'Ошибка'}
            size={'default'}
          />

          <Input extraClass='mb-6' 
            type={'password'} 
            placeholder={'Пароль'} 
            onChange={isPasswordChanged}
            icon={'EditIcon'}
            value={newPassword}
            name={'password'}
            error={false}
            ref={passwordRef}
            onIconClick={onPasswordClick}
            errorText={'Ошибка'}
            size={'default'}
          />

        {isDataChanged && (
          <div className={style.buttons}>
            <Button htmlType='button' type='secondary' size='medium' onClick={cancelEditing}>
              Отмена
            </Button>

            <Button htmlType='submit' type='primary' size='medium'>
              Сохранить
            </Button>
          </div>
        )}

        </form>
      )}

    </div>
  );
};
