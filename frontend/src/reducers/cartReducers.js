import {
    CART_ADD_ITEM,
    CART_REMOVE_ITEM,
    CART_SAVE_SHIPPING_ADDRESS,

    CART_SAVE_PAYMENT_METHOD,

    CART_CLEAR_ITEMS,
} from '../constants/cartConstants'

//Reducer слой.
//Reducer - это чистая функция, которая будет отвечать за обновление состояния.
// Здесь реализовывается логика при которой будет происходить обновление полей store.
//Чистая функция работает независимо от состояния программы и выдаёт выходное значение, принимая входное
// и не меняя ничего в нём и в остальной программе. Получается, что редуктор возвращает совершенно новый
// объект дерева состояний, которым заменяется предыдущий.
//Функция принимает значение текущего состояния (state) и обьект события (action).
// Обьект события содержит два свойства — это тип события (action.type) и значение события (action.value).
export const cartReducer = (state = { cartItems: [], shippingAddress: {} }, action) => {
    //Через switch мы проверяем тип действия (action.type) - и в соответсвии с ним происходит обновление полей store
    switch (action.type) {
        //Здесь добавляем товар в корзину
        case CART_ADD_ITEM:
            const item = action.payload
            const existItem = state.cartItems.find(x => x.product === item.product)

            if (existItem) {
                return {
                    ...state,
                    cartItems: state.cartItems.map(x =>
                        x.product === existItem.product ? item : x) //Либо мы добавим новый товар в корзину, либо обновим текущий.
                }

            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item]
                }
            }

        //Здесь удаляем товар из корзины
        case CART_REMOVE_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter(x => x.product !== action.payload)
                //Фильтрует по принципу совпадения в payload, оставляет только те элементы, которые совпали с payload.
            }

        //Здесь сохраняем адрес доставки
        case CART_SAVE_SHIPPING_ADDRESS:
            return {
                ...state,
                shippingAddress: action.payload
            }

        //Здесь сохраняем метод оплаты
        case CART_SAVE_PAYMENT_METHOD:
            return {
                ...state,
                paymentMethod: action.payload
            }

        //Здесь обнуляем корзину
        case CART_CLEAR_ITEMS:
            return {
                ...state,
                cartItems: []
            }

        default:
            return state
    }
}