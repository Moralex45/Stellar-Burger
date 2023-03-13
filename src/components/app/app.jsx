import React from "react";

import { getIngredientsFromAPI } from '../../utils/api';
import { AppHeader } from '../app-header/app-header'
import {BurgerIngredients} from "../burger-ingredients/burger-ingredients";
import {BurgerConstructor} from "../burger-constructor/burger-constructor";

import style from './app.module.css';

export const App = () => {
    const [ingredients, setIngredients] = React.useState([]);
    const [isLoaded, setIsLoaded] = React.useState(false);

    React.useEffect(() => {
        getIngredientsFromAPI()
            .then(data => {
                setIngredients(data)
            })
            .then(() => {
                setIsLoaded(true)
            })
    }, [])

    return (
        <div className={style.app}>
            <AppHeader/>
            <div className={style.constructor_of_ingredient}>
                {isLoaded && <BurgerIngredients cards={ingredients}/>}
                {isLoaded && <BurgerConstructor cards={ingredients}/>}
            </div>
        </div>
    )
}
