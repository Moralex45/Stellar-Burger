import { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import { useDrag } from 'react-dnd';
import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import style from "./ingredients-card.module.css";

export const IngredientsCard = ({ data }) => {

    const addedIngredients = useSelector((state) => state.ingredientReducer.addedIngredients);
    const addedBun = useSelector((state) => state.ingredientReducer.addedBun);
    const [id] = useState(data._id);
    const [type] = useState(data.type);
    const [isDisabled, setIsDisabled] = useState(true);

    const [{ isDrag }, dragRef] = useDrag({
        type: 'ingredient',
        item: { id, type },
        collect: (monitor) => ({
          isDrag: monitor.isDragging(),
        })
    });

    let ingredientsCounter = 0;

    addedIngredients.forEach((ingredient) =>
      ingredient._id === id ? (ingredientsCounter += 1) : ingredientsCounter
    );
  
    [addedBun].forEach((bun) => bun._id === id ? (ingredientsCounter += 2) : ingredientsCounter);

    useEffect(() => {
        if(type !== 'bun' && addedBun.length === 0) {
          setIsDisabled(true);
        } else {
          setIsDisabled(false);
        }
      }, [addedBun, type]);
    
    return (
        <section className={`${style.container} ${isDrag && style.container_moving} ${type !== 'bun' && isDisabled ? style.container_disabled : ''}`} ref={dragRef}>
            <img className={style.ingredient_image} src={data.image} alt={data.name} />
            <div className={style.price}>
                <span className={`text text_type_digits-default`}>{data.price}</span>
                <CurrencyIcon />
            </div>
            
            <h3 className={`${style.title} text text_type_main-default`}>{data.name}</h3>

            {ingredientsCounter > 0 && (
                <Counter count={ingredientsCounter} size="default"/>
                )}
        </section>
    )
}
