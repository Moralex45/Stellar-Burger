import React from "react";
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./tab-ingredients.module.css";

export const TabIngredients = () => {
    const [current, setCurrent] = React.useState('one');

    const scrollTo = (tab) => {
        setCurrent(tab);
        
        const element = document.getElementById(tab);
        
        if (element) {
            element.scrollIntoView({behavior: 'smooth', block: 'start'})
        }
    };

    return (
        <div className={style.flex}>
            <Tab value="buns" active={current === 'buns'} onClick={scrollTo}>
                Булки
            </Tab>
            <Tab value="sauces" active={current === 'sauces'} onClick={scrollTo}>
                Соусы
            </Tab>
            <Tab value="mains" active={current === 'mains'} onClick={scrollTo}>
                Начинки
            </Tab>
        </div>
    )
}