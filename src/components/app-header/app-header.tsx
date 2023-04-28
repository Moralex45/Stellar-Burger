import { FC } from 'react';
import { useSelector } from '../../services/types/hooks';
import { NavLink, useLocation, Link } from 'react-router-dom';
import { BurgerIcon, ListIcon, ProfileIcon, Logo, Button } from '@ya.praktikum/react-developer-burger-ui-components';

import style from './app-header.module.css';

export const AppHeader: FC = () => {
  const location = useLocation();
  const profile = useSelector((state) => state.profileReducer.profile);

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
            <ProfileIcon type={location.pathname === '/profile' ? 'primary' : 'secondary'} />
            <span >
              {profile ? profile.name : 'Личный кабинет'}
            </span>
          </NavLink>
        </Button>

      </nav>
      
    </header>
  );
};
