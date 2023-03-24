import { Logo, BurgerIcon, ListIcon, ProfileIcon, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./app-header.module.css"

export const AppHeader = () => {
    return (
        <header className={`${style.header} p-4`}>

            <nav className={style.menu}>
    
            <ul className={style.list}>
                <li>
                <Button extraClass={`pt-4 pr-5 pb-4`} htmlType="button" type="secondary" size="medium">
                    <a className={`${style.link} ${style.link_active}`} href="#">
                    <BurgerIcon type="primary" /> Конструктор
                    </a>
                </Button>
                </li>
                <li>
                <Button extraClass={`pt-4 pr-5 pb-4 pl-5`} htmlType="button" type="secondary" size="medium">
                    <a className={style.link} href="#">
                    <ListIcon type="secondary" /> Лента заказов
                    </a>
                </Button>
                </li>
            </ul>
    
            <Logo />
    
            <Button extraClass={`${style.profileButton} pt-4 pb-4 pl-5`} htmlType="button" type="secondary" size="medium">
                <a className={style.link} href="#">
                <ProfileIcon type="secondary" /> Личный кабинет
                </a>
            </Button>
    
            </nav>
        
      </header>
    )
}
