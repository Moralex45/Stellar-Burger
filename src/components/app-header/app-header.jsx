import React from 'react';
import { NavLink, useLocation, Link } from 'react-router-dom';

import style from './app-header.module.css';

import { BurgerIcon, ListIcon, ProfileIcon, Logo, Button } from '@ya.praktikum/react-developer-burger-ui-components';

export const AppHeader = () => {
  const location = useLocation();

  return (
    <header className={`${style.header} pt-4 pb-4`}>

      <nav className={style.menu}>

        <ul className={style.list}>
          <li>
            <Button extraClass={`pt-4 pr-5 pb-4`} htmlType="button" type="secondary" size="medium">
              <NavLink to="/" className={({ isActive }) => isActive ? style.link_active : style.link}>
                <BurgerIcon type={location.pathname === '/' ? 'primary' : 'secondary'} /> Конструктор
              </NavLink>
            </Button>
          </li>
          <li>
            <Button extraClass={`pt-4 pr-5 pb-4 pl-5`} htmlType="button" type="secondary" size="medium">
              <NavLink to='/not-found' className={({ isActive }) => isActive ? style.link_active : style.link}>
                <ListIcon type={location.pathname === '/not-found' ? 'primary' : 'secondary'} /> Лента заказов
              </NavLink>
            </Button>
          </li>
        </ul>

        <Link to='/'>
          <Logo />
        </Link>

        <Button extraClass={`${style.profileButton} pt-4 pb-4 pl-5`} htmlType="button" type="secondary" size="medium">
          <NavLink to="/profile" className={({ isActive }) => isActive ? style.link_active : style.link}>
            <ProfileIcon type={location.pathname === '/profile' ? 'primary' : 'secondary'} /> Личный кабинет
          </NavLink>
        </Button>

      </nav>
      
    </header>
  );
};
