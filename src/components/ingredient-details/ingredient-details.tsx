import { FC } from 'react';
import { useSelector } from '../../services/types/hooks';
import { useParams } from 'react-router-dom';

import style from './ingredient-details.module.css';
import { TIngredient } from '../../services/types/types';

interface IngredientDetailsProps {
  clikIngridients: TIngredient | null
}

export const IngredientDetails: FC<IngredientDetailsProps> = ({clikIngridients}) => {

  return (
    <>
      {clikIngridients && (
        <div className={`${style.container} pt-10 pr-10 pb-15 pl-10`}>

          <h2 className={`${style.title} text text_type_main-large`}>Детали ингредиента</h2>
          <img className={`mb-4`} src={clikIngridients.image_large} alt={clikIngridients.name} />
          <p className={`text text_type_main-medium mb-8`}>{clikIngridients.name}</p>

          <table className={style.table}>
            <thead>
              <tr className={`${style.headers} text text_type_main-default`}><th>Калории,ккал</th><th>Белки, г</th><th>Жиры, г</th><th>Углеводы, г</th></tr>
            </thead>
            <tbody>
              <tr className={`${style.data} text text_type_digits-default`}><td>{clikIngridients.calories}</td><td>{clikIngridients.proteins}</td><td>{clikIngridients.fat}</td><td>{clikIngridients.carbohydrates}</td></tr>
            </tbody>
          </table>

        </div>
      )}
    </>
  )
}

