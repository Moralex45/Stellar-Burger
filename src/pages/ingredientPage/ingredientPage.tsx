import { FC } from 'react';
import { useSelector } from '../../services/types/hooks';
import { useParams } from 'react-router-dom';

import style from './ingredientPage.module.css';

export const IngredientPage: FC = ()  => {
  const { id } = useParams();
  const ingredients = useSelector((state) => state.ingredientReducer.ingredients);
  const data = ingredients.find((ingredient) => ingredient._id === id);


  return (
    <>
      {data && (
        <div className={`${style.container} pt-10 pr-10 pb-15 pl-10`}>
          <h2 className={`${style.title} text text_type_main-large`}>Детали ингредиента</h2>
          <img className={`mb-4`} src={data.image_large} alt={data.name} />
          <p className={`text text_type_main-medium mb-8`}>{data.name}</p>

          <table className={style.table}>
            <thead>
              <tr className={`${style.headers} text text_type_main-default`}><th>Калории,ккал</th><th>Белки, г</th><th>Жиры, г</th><th>Углеводы, г</th></tr>
            </thead>
            <tbody>
              <tr className={`${style.data} text text_type_digits-default`}><td>{data.calories}</td><td>{data.proteins}</td><td>{data.fat}</td><td>{data.carbohydrates}</td></tr>
            </tbody>
          </table>
        </div>
      )}
    </>
  )
};
