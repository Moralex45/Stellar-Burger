import { FC } from 'react';
import { useSelector } from '../../services/types/hooks';
import { useParams } from 'react-router-dom';
import { IngredientDetails } from '../../components/ingredient-details/ingredient-details'

import style from './ingredientPage.module.css';

export const IngredientPage: FC = ()  => {
  
  const { id } = useParams();
  const ingredients = useSelector((state) => state.ingredientReducer.ingredients);
  const data = ingredients.find((ingredient) => ingredient._id === id);


  return (
    <>
      <section className={style.container}>
        {data && (
          <IngredientDetails clikIngridients={data}/>
        )}
      </section>
    </>
  )
};
