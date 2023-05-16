import React, { FC } from 'react';
import { useSelector } from '../../services/types/hooks';
import { useLocation, NavLink } from 'react-router-dom';

import style from './ordersList.module.css';

import { OrderItem } from '../orderItem/orderItem';
import { Loader } from '../loader/loader';

export const OrdersList: FC = () => {
  const location = useLocation();
  const allOrders = useSelector((state) => state.ordersReducer.allOrders);

  return (
    <>
      <section className={style.container}>
      <h1 className='text text_type_main-large mt-0 mb-5'>Лента заказов</h1>

      <div className={style.scrollbar}>
        <ul className={style.list}>

          {allOrders.length > 0 ? (
            allOrders?.map((order, index) => (
              <NavLink className={style.link} to={`/feed/${order._id}`} key={index} state={{ previousLocationFeed: location }}>
                <OrderItem order={order} isUserOrders={false} />
              </NavLink>
            ))            
          ) : (
            <Loader />
          )}

        </ul>
      </div>

    </section>
    </>
  )
};

