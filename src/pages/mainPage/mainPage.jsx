import React from 'react';
import { useSelector } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { BurgerIngredients } from '../../components/burger-ingredients/burger-ingredients.jsx';
import { BurgerConstructor } from '../../components/burger-constructor/burger-constructor.jsx';
import { Loader } from '../../components/loader/loader.jsx';

export const MainPage = () => {
  const ingredientsRequest = useSelector((state) => state.ingredientReducer.ingredientsRequest);
  const ingredientsFailed = useSelector((state) => state.ingredientReducer.ingredientsFailed);
  const data = useSelector((state) => state.ingredientReducer.ingredients);

  return (
    <>

      {ingredientsRequest && (
        <Loader />)
      }

      {ingredientsFailed && (
        <span className={`text text_type_main-medium`}>Что-то пошло не так...</span>)
      }

      {!ingredientsRequest && !ingredientsFailed && !!data.length && (
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <BurgerConstructor />
        </DndProvider>
      )}

    </>
  );
};
