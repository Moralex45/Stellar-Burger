import React from 'react';

import { Link } from 'react-router-dom';

import style from './notFoundPage.module.css';

import notFoundImage from '../../images/404.png';

export const NotFoundPage = () => {
  return (
    <section className={style.NotFound}>
      <section className={style.Container}>
          <img src={notFoundImage} alt="not-found" />
          <Link to='/' className={`text text_type_main-default text_color_inactive ${style.Link} mt-10`}>Вернуться на орбитную станцию</Link>
      </section>
    </section>
  );
};
