import { Logo, BurgerIcon, ListIcon, ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./app-header.module.css"

export const AppHeader = () => {
    return (
        <header className={style.header_bar}>
        <div className={style.header}>
            <nav className={style.header_elements}>
                <a>
                    <button type="button"
                            className={`${style.header_element}  ${style.header_element_constructor} pl-5 mt-4 mb-4`}>
                        <BurgerIcon type="primary"/>
                        <p className="text text_color_primary text_type_main-default ml-2">Конструктор</p>
                    </button>
                </a>
                <a>
                    <button type="button"
                            className={`${style.header_element} ${style.header_element_orders} pl-5 ml-2 mt-4 mb-4`}>
                        <ListIcon type="secondary"/>
                        <p className="text text_color_inactive text_type_main-default ml-2">Лента заказов</p>
                    
                    </button>
                </a>
            </nav>
            <Logo/>
            <a>
                <button type="button"
                        className={`${style.header_element} ${style.header_element_profile_icon} pl-5 mt-4 mb-4`}>
                    <ProfileIcon type="secondary"/>
                    <p className="text text_color_inactive text_type_main-default ml-2 mr-4">Личный кабинет</p>
                </button>
            </a>
        </div>
    </header>
    )
}
