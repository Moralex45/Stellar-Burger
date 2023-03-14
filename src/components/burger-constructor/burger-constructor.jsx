import React from "react";
import { Button, ConstructorElement, CurrencyIcon, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import { OrderDetails } from "../order-details/order-details";
import { Modal } from "../modal/modal";
import { PropTypesDataObject } from '../../utils/types';
import style from "./burger-constructor.module.css";
import PropTypes from "prop-types";


export const BurgerConstructor = ({cards}) => {
    
    function createCard(card) {
        return (
            <div className={style.constructor_card} key={card._id}>
                <DragIcon type="primary"/>
                <ConstructorElement
                    key={card._id}
                    type={card.type}
                    text={card.name}
                    price={card.price}
                    thumbnail={card.image_mobile}
                />
            </div>
        )
    }

    const list = cards.filter(
        item => item.type !== 'bun')
        .map(item => createCard(item)
    );

    const [modalOpen, setModalOpened] = React.useState(false);

    function setOpenModal() {
        setModalOpened(true)
    }

    function setCloseModal() {
        setModalOpened(false)
    }

    return (
        <section className={style.section_constructor}>
            <div className={`${style.constructor_element} mt-25`}>
                <ConstructorElement
                    type="top"
                    isLocked={true}
                    text="Краторная булка N-200i (верх)" 
                    price={200}
                    thumbnail='https://code.s3.yandex.net/react/code/bun-02-mobile.png'
                />
                <div className={`${style.ingredients_scroll} ${style.constructor_scroll}`}>
                    {list}
                </div>
                <ConstructorElement
                    type="bottom"
                    isLocked={true}
                    text="Краторная булка N-200i (низ)"
                    price={200}
                    thumbnail='https://code.s3.yandex.net/react/code/bun-02-mobile.png'
                />
                <div className={`${style.price_button_constructor} mt-10 mr-4`}>
                    <div className={`${style.price_button_elements} mr-10`}>
                        <p className="text text_type_digits-medium mr-2">610</p>
                        <CurrencyIcon type="primary"/>
                    </div>
                    <Button type="primary"
                            onClick={setOpenModal}
                            htmlType="button"
                            size="medium">
                        Оформить заказ
                    </Button>
                    {modalOpen && (
                        <Modal onClick={setCloseModal}
                               modalHeader=" ">
                            <OrderDetails/>
                        </Modal>)}
                </div>
            </div>
        </section>
    )
}

BurgerConstructor.propTypes = {
    cards: PropTypes.arrayOf(PropTypesDataObject)
}
