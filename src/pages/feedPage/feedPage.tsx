import React, { useEffect, FC } from 'react';
import { useSelector, useDispatch } from '../../services/types/hooks';

import style from './feedPage.module.css';

import { OrdersList } from '../../components/orders-list/ordersList';
import { OrdersDashboard } from '../../components/orders-dashboard/ordersDashboard';
import { Loader } from '../../components/loader/loader';

import { wsAllOrdersConnectionStart, wsAllOrdersConnectionDisconnect } from '../../services/actions/ordersActions';

export const FeedPage: FC = () => {
  const dispatch = useDispatch();
  const allOrders = useSelector((state) => state.ordersReducer.allOrders);
  const total = useSelector((state) => state.ordersReducer.total);
  const totalToday = useSelector((state) => state.ordersReducer.totalToday);

  useEffect(() => {
    dispatch(wsAllOrdersConnectionStart());
    return () => {
      dispatch(wsAllOrdersConnectionDisconnect());
    }
  }, []);

  return (
    <>
      {allOrders.length > 0 && total && totalToday ? (
        <div className={`${style.container} mt-10`}>
          <OrdersList />
          <OrdersDashboard />
        </div>
      ) : (
        <Loader />
      )}
    </>
  )
};