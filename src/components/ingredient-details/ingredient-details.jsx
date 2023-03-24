import { IngredientPropType } from '../../utils/types';

import style from "./ingredient-details.module.css"

export const IngredientDetails = ({ data }) => {
    return (
        <div className={style.elements_display_flex}>
            <img src={data.image_large} alt={data.name} />
            <h3 className="text text_type_main-medium mt-4 mb-8">{data.name}</h3>
            <ul className={`${style.ingredient_details_nutrition} mb-15`}>
                <li className={style.elements_display_flex}>
                    <p className="text text_type_main-default text_color_inactive">Калории, ккал</p>
                    <p className="text text_type_digits-default text_color_inactive">{data.calories}</p>
                </li>
                <li className={style.elements_display_flex}>
                    <p className="text text_type_main-default text_color_inactive">Белки, г</p>
                    <p className="text text_type_digits-default text_color_inactive">{data.proteins}</p>
                </li>
                <li className={style.elements_display_flex}>
                    <p className="text text_type_main-default text_color_inactive">Жиры, г</p>
                    <p className="text text_type_digits-default text_color_inactive">{data.fat}</p>
                </li>
                <li className={style.elements_display_flex}>
                    <p className="text text_type_main-default text_color_inactive">Углеводы, г</p>
                    <p className="text text_type_digits-default text_color_inactive">{data.carbohydrates}</p>
                </li>
            </ul>
        </div>
    )
}

IngredientDetails.propTypes = {
    data: IngredientPropType.isRequired,
}