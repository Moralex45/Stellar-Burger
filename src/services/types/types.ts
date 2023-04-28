import { ReactNode } from 'react';

export type TIngredient = {
    calories: number;
    carbohydrates: number;
    fat: number;
    image: string;
    image_large: string;
    image_mobile: string;
    name: string;
    price: number;
    proteins: number;
    type: string;
    __v: number;
    _id: string;
    uuidv4?: string;
};

export type TAddedIngredient = {
    readonly id: string;
    readonly type: string;
};
  
export type TUser = {
    readonly email: string;
    readonly name?: string;
    readonly password?: string;
};

export type TRouteProps = {
    element: ReactNode;
};

export type TOrderDetailsProps = {
    orderNumber: number;
};

export type TModalProps = {
    handleClose?: () => void;
    children: ReactNode;
};

export type TIngredientProps = {
    data: TIngredient;
};
  