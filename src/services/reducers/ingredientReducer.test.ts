import {v4 as uuidv4} from 'uuid';

import { GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    GET_INGREDIENTS_FAILED,
    ADD_BUN,
    DELETE_INGREDIENT,
    COUNT_TOTAL_PRICE,
    SORT_INGREDIENTS,
    RESET_INGREDIENTS,
    TIngredientsActions } from '../actions/ingredientsAction';

import { ingredientReducer, initialState } from './ingredientsReducer'

describe('Ingredient - редьюсер и экшены', () => {
    const testBurgerConstructorAllIngredients = [
        {
          _id: '60d3b41abdacab0026a733d2',
          name: 'Кристаллы марсианских альфа-сахаридов',
          type: 'main',
          proteins: 234,
          fat: 432,
          carbohydrates: 111,
          calories: 189,
          price: 762,
          image: 'https://code.s3.yandex.net/react/code/core.png',
          image_mobile: 'https://code.s3.yandex.net/react/code/core-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/core-large.png',
          __v: 0
        },
        {
          _id: '60d3b41abdacab0026a733d3',
          name: 'Мини-салат Экзо-Плантаго',
          type: 'main',
          proteins: 1,
          fat: 2,
          carbohydrates: 3,
          calories: 6,
          price: 4400,
          image: 'https://code.s3.yandex.net/react/code/salad.png',
          image_mobile: 'https://code.s3.yandex.net/react/code/salad-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/salad-large.png',
          __v: 0
        },
        {
          _id: '60d3b41abdacab0026a733d4',
          name: 'Сыр с астероидной плесенью',
          type: 'main',
          proteins: 84,
          fat: 48,
          carbohydrates: 420,
          calories: 3377,
          price: 4142,
          image: 'https://code.s3.yandex.net/react/code/cheese.png',
          image_mobile: 'https://code.s3.yandex.net/react/code/cheese-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/cheese-large.png',
          __v: 0
        }
      ];
    
      const testBurgerConstructorIngredients = [
        {
          _id: '60d3b41abdacab0026a733c8',
          name: 'Филе Люминесцентного тетраодонтимформа',
          type: 'main',
          proteins: 44,
          fat: 26,
          carbohydrates: 85,
          calories: 643,
          price: 988,
          image: 'https://code.s3.yandex.net/react/code/meat-03.png',
          image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
          __v: 0,
          uuidv4: '330f0b37-2a9a-484b-be1e-81d7dbe3dad2'
        },
        {
          _id: '60d3b41abdacab0026a733cf',
          name: 'Соус с шипами Антарианского плоскоходца',
          type: 'sauce',
          proteins: 101,
          fat: 99,
          carbohydrates: 100,
          calories: 100,
          price: 88,
          image: 'https://code.s3.yandex.net/react/code/sauce-01.png',
          image_mobile: 'https://code.s3.yandex.net/react/code/sauce-01-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/sauce-01-large.png',
          __v: 0,
          uuidv4: '280839f6-d61c-4730-ab32-80cf54e58456'
        },
        {
          _id: '60d3b41abdacab0026a733cb',
          name: 'Биокотлета из марсианской Магнолии',
          type: 'main',
          proteins: 420,
          fat: 142,
          carbohydrates: 242,
          calories: 4242,
          price: 424,
          image: 'https://code.s3.yandex.net/react/code/meat-01.png',
          image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
          __v: 0,
          uuidv4: '1654127e-95c6-4a44-b47f-28b4d00e1638'
        }
      ];
    
      const testBurgerConstructorIngredientsAfterRemoval = [
        {
          _id: '60d3b41abdacab0026a733c8',
          name: 'Филе Люминесцентного тетраодонтимформа',
          type: 'main',
          proteins: 44,
          fat: 26,
          carbohydrates: 85,
          calories: 643,
          price: 988,
          image: 'https://code.s3.yandex.net/react/code/meat-03.png',
          image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
          __v: 0,
          uuidv4: '330f0b37-2a9a-484b-be1e-81d7dbe3dad2'
        },
        {
          _id: '60d3b41abdacab0026a733cf',
          name: 'Соус с шипами Антарианского плоскоходца',
          type: 'sauce',
          proteins: 101,
          fat: 99,
          carbohydrates: 100,
          calories: 100,
          price: 88,
          image: 'https://code.s3.yandex.net/react/code/sauce-01.png',
          image_mobile: 'https://code.s3.yandex.net/react/code/sauce-01-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/sauce-01-large.png',
          __v: 0,
          uuidv4: '280839f6-d61c-4730-ab32-80cf54e58456'
        }
      ];
    
      const testBurgerConstructorIngredientsAfterAdding = [

        {
          _id: '60d3b41abdacab0026a733c8',
          name: 'Филе Люминесцентного тетраодонтимформа',
          type: 'main',
          proteins: 44,
          fat: 26,
          carbohydrates: 85,
          calories: 643,
          price: 988,
          image: 'https://code.s3.yandex.net/react/code/meat-03.png',
          image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
          __v: 0,
          uuidv4: '330f0b37-2a9a-484b-be1e-81d7dbe3dad2'
        },
        {
          _id: '60d3b41abdacab0026a733cf',
          name: 'Соус с шипами Антарианского плоскоходца',
          type: 'sauce',
          proteins: 101,
          fat: 99,
          carbohydrates: 100,
          calories: 100,
          price: 88,
          image: 'https://code.s3.yandex.net/react/code/sauce-01.png',
          image_mobile: 'https://code.s3.yandex.net/react/code/sauce-01-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/sauce-01-large.png',
          __v: 0,
          uuidv4: '280839f6-d61c-4730-ab32-80cf54e58456'
        },
        {
          _id: '60d3b41abdacab0026a733cb',
          name: 'Биокотлета из марсианской Магнолии',
          type: 'main',
          proteins: 420,
          fat: 142,
          carbohydrates: 242,
          calories: 4242,
          price: 424,
          image: 'https://code.s3.yandex.net/react/code/meat-01.png',
          image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
          __v: 0,
          uuidv4: '1654127e-95c6-4a44-b47f-28b4d00e1638'
        }
      ];

      const testAddedIngredientIN = {
        id: '643d69a5c3f7b9001cfa093d',
        type: 'bun',
      }

      const testBurgerConstructorBun = {
        _id: '643d69a5c3f7b9001cfa093d',
        name: 'Флюоресцентная булка R2-D3',
        type: 'bun',
        proteins: 44,
        fat: 26,
        carbohydrates: 85,
        calories: 643,
        price: 988,
        image: 'https://code.s3.yandex.net/react/code/bun-01.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png',
        __v: 0,
        uuidv4: '1654127e-95c6-4a44-b47f-28b4d00e1638'
      };

    test('initial state', () => {
        expect(ingredientReducer(undefined, {} as any)).toEqual(initialState);
    });

    test('should handle GET_INGREDIENTS_REQUEST', () => {
        expect(ingredientReducer(initialState, { type: GET_INGREDIENTS_REQUEST })).toEqual({
        ...initialState,
        ingredientsRequest: true,
        ingredientsFailed: false
        });
    });
    
    test('should handle GET_INGREDIENTS_SUCCESS', () => {
        expect(
            ingredientReducer(initialState, {
                type: GET_INGREDIENTS_SUCCESS,
                payload: testBurgerConstructorAllIngredients
            })
        ).toEqual({    
            ...initialState,
            ingredientsRequest: false,
            ingredients: testBurgerConstructorAllIngredients
        });
    });

    test('should handle GET_INGREDIENTS_FAILED', () => {
        expect(ingredientReducer(initialState, { type: GET_INGREDIENTS_FAILED })).toEqual({
          ...initialState,
          ingredients: [],
          ingredientsRequest: false,
          ingredientsFailed: true
        });
    });

    test('should handle ADD_BUN', () => {
        expect(ingredientReducer(
          {
            ...initialState,
            ingredients: [testBurgerConstructorBun],
          }, 
          { type: ADD_BUN, payload: testAddedIngredientIN })).toEqual({
            ...initialState,
            addedBun: testBurgerConstructorBun,
            ingredients: [testBurgerConstructorBun],
        });
    });

    test('should handle RESET_INGREDIENTS', () => {

      expect(ingredientReducer(
        {
          ...initialState,
          addedIngredients: testBurgerConstructorIngredients,
          addedBun: testBurgerConstructorBun
        },
        { type: RESET_INGREDIENTS })).toEqual({
        ...initialState,
        addedBun: {},
        addedIngredients: [],
        totalPrice: 0
      });
    });

    test('should handle DELETE_INGREDIENT', () => {

      expect(ingredientReducer(
        {
          ...initialState,
          addedIngredients: testBurgerConstructorIngredients,
        },
        { type: DELETE_INGREDIENT, payload: testBurgerConstructorBun })).toEqual({
        ...initialState,
        addedIngredients: testBurgerConstructorIngredientsAfterRemoval
      });
    });

    test('should handle COUNT_TOTAL_PRICE', () => {

      expect(ingredientReducer(
        {
          ...initialState,
          addedIngredients: testBurgerConstructorAllIngredients,
          addedBun: testBurgerConstructorBun,
        },
        { type: COUNT_TOTAL_PRICE })).toEqual({
        ...initialState,
        addedIngredients: testBurgerConstructorAllIngredients,
        addedBun: testBurgerConstructorBun,
        totalPrice: 11280
      });
    });


    test('should handle SORT_INGREDIENTS', () => {

      expect(ingredientReducer(
        initialState,
        { type: SORT_INGREDIENTS, payload: testBurgerConstructorAllIngredients })).toEqual({
        ...initialState,
        addedIngredients: testBurgerConstructorAllIngredients
      });
    });
    
});