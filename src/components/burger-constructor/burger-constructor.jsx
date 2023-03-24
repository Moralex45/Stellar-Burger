import { useSelector, useDispatch } from 'react-redux';
import { useDrop } from 'react-dnd';
import { Reorder } from 'framer-motion';
import { Button, ConstructorElement,  DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import CurrencyIcon from '../../images/CurrencyIcon.svg'; 
import { OrderDetails } from "../order-details/order-details";
import { Modal } from "../modal/modal";
import { getOrderData, deleteOrder } from '../../services/actions/orderActions.js';
import { addBun, addIngredient, countTotalPrice, deleteIngredient, sortIngredients } from '../../services/actions/ingredientsAction.js';

import style from "./burger-constructor.module.css";

export const BurgerConstructor = () => {
    
  const dispatch = useDispatch();
    const bun = useSelector((state) => state.ingredientReducer.addedBun);
    const ingredients = useSelector((state) => state.ingredientReducer.addedIngredients);
    const totalPrice = useSelector((state) => state.ingredientReducer.totalPrice);
    const orderNumber = useSelector(store => store.orderReducer.orderDetails);
    const checkIngredient = ingredients.length > 0;
    const checkBun = !!bun.type;
    
    const createOrder = () => {
        const ingredientsId = [bun, bun, ...ingredients.map((item) => item._id)];
        dispatch(getOrderData(ingredientsId));
      };
    
    const handleDeleteIngredient = (item) => {
    dispatch(deleteIngredient(item));
    dispatch(countTotalPrice());
    };

    const [{ isHover }, dropRef] = useDrop(() => ({
        accept: 'ingredient',
        drop: (item) => {
          if (item.type === 'bun') {
            dispatch(addBun(item));
          } else {
            dispatch(addIngredient(item));
          }
            dispatch(countTotalPrice());
        },
        collect: (monitor) => ({
          isHover: monitor.isOver()
        })
      }));

    const borderColor = isHover ? '#9400d3' : 'transparent';

    return (
      <section className={`${style.container} mt-20 pt-5 pb-5 pl-4`} ref={dropRef} style={{borderColor}}>

      {checkBun && 
        (<ConstructorElement extraClass={`ml-8 pr-4`} type='top' isLocked={true} text={`${bun.name} (верх)`} price={bun.price} thumbnail={bun.image} />)
      }

      <Reorder.Group className={style.scrollbar} axys='y' values={ingredients} onReorder={(items) => dispatch(sortIngredients(items))}>
          
        {ingredients.map((item) => (
          checkIngredient && 
            (<Reorder.Item className={style.item} key={item.uuidv4} value={item}>
              <DragIcon type="primary" />
              <ConstructorElement text={item.name} price={item.price} thumbnail={item.image} handleClose={() => {handleDeleteIngredient(item);}} />
            </Reorder.Item>)
        ))}

      </Reorder.Group>
      
      {checkBun && 
        (<ConstructorElement extraClass={`ml-8 pr-4`} type='bottom' isLocked={true} text={`${bun.name} (низ)`} price={bun.price} thumbnail={bun.image} />)
      }
      
      <div className={`${style.price_container} mt-10 mr-4`}>
        <span className={`text text_type_digits-medium mr-2`}>{totalPrice}</span>
        <img className={`mr-10`} src={CurrencyIcon} alt='Межгалактическая валюта.'/>
        <Button htmlType="button" type="primary" size="large" onClick={() => createOrder()}>Оформить заказ</Button>
      </div>

      {orderNumber && 
        (<Modal handleClose={() => dispatch(deleteOrder())}>
          <OrderDetails orderNumber={orderNumber} />
        </Modal>
      )}

    </section>
    )
}
