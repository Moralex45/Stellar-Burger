import { useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Waypoint } from 'react-waypoint';
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

import { IngredientsCard } from "../ingredients-card/ingredients-card";
import { IngredientDetails } from "../ingredient-details/ingredient-details"
import { Modal } from "../modal/modal";
import { openIngredientDetailsPopup, closeIngredientDetailsPopup } from '../../services/actions/popupActions.js';

import style from "./burger-ingredients.module.css";

export const BurgerIngredients = () => {
    const data = useSelector((state) => state.ingredientReducer.ingredients);
    const selectedIngrediend = useSelector((state) => state.popupReducer.selectedIngrediend);
    const dispatch = useDispatch();

    const [current, setCurrent] = useState('');
    const refBun = useRef(null);
    const refSauce = useRef(null);
    const refMain = useRef(null);
  
    const scrollTo = (ref) => {
      ref.current.scrollIntoView({ block: 'start', behavior: 'smooth' });
    };
  
    const handleClickTab = (tab) => {
      setCurrent(tab);
      if (tab === 'bun') {
        scrollTo(refBun);
      } else if (tab === 'sauce') {
        scrollTo(refSauce);
      } else if (tab === 'main') {
        scrollTo(refMain);
      }
    };

    return (
        <section className={`${style.main} mr-10`}>
            <p className="text text-position text_type_main-large mt-10 mb-5">
                Соберите бургер
            </p>

            <div className={style.tabs}>
                <Tab value='bun' active={current === 'bun'} onClick={() => handleClickTab('bun')}>Булки</Tab>
                <Tab value='sauce' active={current === 'sauce'} onClick={() => handleClickTab('sauce')}>Соусы</Tab>
                <Tab value='main' active={current === 'main'} onClick={() => handleClickTab('main')}>Начинки</Tab>
            </div>

            <div className={style.ingredients_scroll}>
                
                <Waypoint onEnter={() => setCurrent('bun')} bottomOffset="90%" />
                <h2 className={`text text_type_main-medium mt-10 mb-6`} ref={refBun}>Булки</h2>
                <ul className={`${style.list} ml-4`}>
                    {data.map((item) => ( item.type === 'bun' &&
                        <li key={item._id} onClick={() => dispatch(openIngredientDetailsPopup(item))}>
                            <IngredientsCard data={item} _id={item._id} name={item.name} type={item.type} price={item.price} image={item.image} />
                    </li>))}
                </ul>

                <Waypoint onEnter={() => setCurrent('sauce')} bottomOffset="90%" />
                <h2 className={`text text_type_main-medium mt-10 mb-6`} ref={refSauce}>Соусы</h2>
                <ul className={`${style.list} ml-4`}>
                    {data.map((item) => ( item.type === 'sauce' &&
                        <li key={item._id} onClick={() => dispatch(openIngredientDetailsPopup(item))}>
                            <IngredientsCard data={item} _id={item._id} name={item.name} type={item.type} price={item.price} image={item.image} />
                    </li>))}
                </ul>

                <Waypoint onEnter={() => setCurrent('main')} bottomOffset="90%" />
                <h2 className={`text text_type_main-medium mt-10 mb-6`} ref={refMain}>Начинки</h2>
                <ul className={`${style.list} ml-4`}>
                    {data.map((item) => ( item.type === 'main' &&
                        <li key={item._id} onClick={() => dispatch(openIngredientDetailsPopup(item))}>
                            <IngredientsCard data={item} _id={item._id} name={item.name} type={item.type} price={item.price} image={item.image} />
                    </li>))}
                </ul>

            </div>

            {selectedIngrediend && 
                (<Modal handleClose={() => dispatch(closeIngredientDetailsPopup())}>
                    <IngredientDetails data={selectedIngrediend} />
                </Modal>
            )}
        </section>
    )
}
