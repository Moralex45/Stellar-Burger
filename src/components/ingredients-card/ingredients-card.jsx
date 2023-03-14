import React from "react";
import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Modal } from "../modal/modal";
import { IngredientDetails } from "../ingredient-details/ingredient-details";
import style from "./ingredients-card.module.css";

export const IngredientsCard = (card) => {
    const [modalOpen, setModalOpened] = React.useState(false);

    function setOpenModal() {
        setModalOpened(true)
    }

    function setCloseModal() {
        setModalOpened(false)
    }

    return (
        <section className="mb-8"
            key={card._id}
            id="open-modal"
            >
            <img src={card.image} 
                className={style.ingredient_image} 
                onClick={setOpenModal}
                alt={card.name}/>
            <div className={`${style.price_flex} mt-1 mb-1`}>
                <p className="text text_type_digits-medium mr-2">{card.price}</p>
                <CurrencyIcon type="primary"/>
            </div>
            <p className="text text_type_main-default">{card.name}</p>
            <div className={style.ingredient_counter}>
                <Counter count={0}
                    size="default"
                    extraClass="m-1"/>
            </div>
            {modalOpen && (
                <Modal onClick={setCloseModal} 
                    modalHeader="Детали ингредиента">
                    <IngredientDetails card={card}/>
                </Modal>)
            }
        </section>
    )
}
