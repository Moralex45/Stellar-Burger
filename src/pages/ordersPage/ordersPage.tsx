import React, { useEffect, FC } from 'react';
import { useSelector, useDispatch } from '../../services/types/hooks';
import { Link, useLocation } from 'react-router-dom';

import style from './ordersPage.module.css';

import { OrderItem } from '../../components/orderItem/orderItem';
import { Loader } from '../../components/loader/loader';
import { wsUserOrdersConnectionStart, wsUserOrdersConnectionDisconnect } from '../../services/actions/ordersActions';

export const OrdersPage: FC = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const userOrders = useSelector((state) => state.ordersReducer.userOrders);
  const wsUserOrdersConnectFailed = useSelector((state) => state.ordersReducer.wsUserOrdersConnectFailed);
  
  useEffect(() => {
    dispatch(wsUserOrdersConnectionStart());
    if (wsUserOrdersConnectFailed) {
      dispatch(wsUserOrdersConnectionStart());
    }
    return () => {
      dispatch(wsUserOrdersConnectionDisconnect())
    }
  }, [dispatch, wsUserOrdersConnectFailed]);

  return (
    <section className={style.container}>

      <div className={style.scrollbar}>
        <ul className={style.list}>
          {
            userOrders?.map((order, index) => (
              
              <Link className={style.link} to={`/profile/orders/${order._id}`} key={index} state={{ previousLocationOrders: location }}>
                <OrderItem order={order} isUserOrders={true} />
              </Link>
            ))
          }
        </ul>
      </div>
    </section>
  )
};
