import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { AppHeader } from '../app-header/app-header'
import { BurgerIngredients } from "../burger-ingredients/burger-ingredients";
import { BurgerConstructor } from "../burger-constructor/burger-constructor";
import { getIngredients } from '../../services/actions/ingredientsAction.js';

import style from './app.module.css';

export const App = () => {
    const dispatch = useDispatch();
    const ingredientsRequest = useSelector((state) => state.ingredientReducer.ingredientsRequest);
    const ingredientsFailed = useSelector((state) => state.ingredientReducer.ingredientsFailed);
    const data = useSelector((state) => state.ingredientReducer.ingredients);

    useEffect(() => {
        dispatch(getIngredients());
    }, [dispatch]);

    return (
        <div className={style.app}>
            <AppHeader/>
            <div className={style.constructor_of_ingredient}>
                {!ingredientsRequest && !ingredientsFailed && !!data.length && (
                    <DndProvider backend={HTML5Backend}>
                        <BurgerIngredients />
                        <BurgerConstructor />
                    </DndProvider>
                )}
            </div>
        </div>
    )
}
