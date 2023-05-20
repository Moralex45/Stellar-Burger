import React, { FC } from 'react';
import { useSelector } from '../../services/types/hooks';

import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './orderItem.module.css';

import { orderStatus, statusStyles } from '../../utils/statusOfOrders';
import { TOrderItemProps, TIngredient } from '../../services/types/types';

export const OrderItem: FC<TOrderItemProps> = ({ order, isUserOrders }) => {
  const { ingredients, status, name, number, createdAt } = order;
  const allIngredients = useSelector((state) => state.ingredientReducer.ingredients);

  const findIngredient = (ingredient: string, ingredientsArr: Array<TIngredient>) => {
    return ingredientsArr.find((item: TIngredient) => item._id === ingredient);
  };

  const price = () => {
    let totalPrice = 0;
    ingredients?.forEach((ingredient: string) => {
      const findIngredient = allIngredients.find((item: TIngredient) => item?._id === ingredient);
      if (findIngredient?.price) {
        totalPrice += findIngredient.price;
      }
    });
    return totalPrice;
  };

  return (
    <li className={`${styles.container} p-6 mb-4`}>
      <div className={`${styles.number_container} mb-6`}>
        <span className='text text_type_digits-default'>{`#${number}`}</span>
        <p className='text text_type_main-default text_color_inactive'>
          <FormattedDate date={new Date(createdAt)} />
          <span>{` i-GMT+3`}</span>
        </p>
      </div>

      <h2 className='text text_type_main-medium'>{name}</h2>

      {isUserOrders && status && (
        <p className='text text_type_main-default mt-2' style={statusStyles(status)}>
          {orderStatus(status)}
        </p>
      )}

      <div className={`${styles.items_container} mt-6`}>
        <ul className={styles.list}>
          {ingredients.slice(0, 7).map((item, index) => {
            const ingredient = findIngredient(item, allIngredients);
            if (index < 5) {
              return (
                <li className={styles.item} key={index} style={{ zIndex: 99 - index }}>
                  <img
                    className={styles.image}
                    src={ingredient?.image}
                    alt={ingredient?.name}
                  ></img>
                </li>
              );
            } else if (index === 6) {
              return (
                <li
                  className={`${styles.item} ${styles.item_last}`}
                  key={index}
                  style={{ zIndex: 99 - index }}
                >
                  <img
                    className={styles.image}
                    src={ingredient?.image}
                    alt={ingredient?.name}
                  ></img>
                  <div className={styles.counter}>
                    <span className='text text_type_main-default'>+{ingredients.length - 5}</span>
                  </div>
                </li>
              );
            } else {
              return null;
            }
          })}
        </ul>
        <p className={styles.price_container}>
          <span className='text text_type_digits-default'>{price()}</span>
          <CurrencyIcon type='primary' />
        </p>
      </div>
    </li>
  );
};
