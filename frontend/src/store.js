import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
    productListReducer,
    productDetailsReducer,
    productDeleteReducer,
    productCreateReducer,
    productUpdateReducer,
    productReviewCreateReducer,
    productTopRatedReducer,
} from './reducers/productReducers'

import { cartReducer } from './reducers/cartReducers'

import {
    userLoginReducer,
    userRegisterReducer,
    userDetailsReducer,
    userUpdateProfileReducer,
    userListReducer,
    userDeleteReducer,
    userUpdateReducer, userFeedbackReducer,
} from './reducers/userReducers'

import {
    orderCreateReducer,
    orderDetailsReducer,
    orderPayReducer,
    orderListMyReducer,
    orderListReducer,
    orderDeliverReducer,
} from './reducers/orderReducers'

//Хранилище (store) — это объект,
// 1) содержит состояние приложения;
// 2) отображает состояние через getState();
// 3) может обновлять состояние через dispatch();
// 4) позволяет регистрироваться (или удаляться) в качестве слушателя изменения состояния через subscribe().

//Вспомогательная функция combineReducers преобразует объект, значениями которого являются различные функции редюсеры,
// в одну функцию редюсер, которую можно передать в метод createStore.
//Это метод, который позволяет вместо того, чтобы создавать один огромный reducer для всего состояния приложения сразу,
// разбивать его на отдельные модули.

// Результирующий редюсер - reducer, вызывает вложенные редюсеры и собирает их результаты в единый объект состояния.
// Состояние, созданное именами combineReducers(), сохраняет состояние каждого редюсера под их ключами,
// переданные в combineReducers()

//reducer — это чистая функция которая будет отвечать за обновление состояния.
// Здесь реализовывается логика в соответствие с которой будет происходить обновление полей store.
const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    productDelete: productDeleteReducer,
    productCreate: productCreateReducer,
    productUpdate: productUpdateReducer,
    productReviewCreate: productReviewCreateReducer,
    productTopRated: productTopRatedReducer,

    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userFeedback: userFeedbackReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    userUpdate: userUpdateReducer,

    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderListMy: orderListMyReducer,
    orderList: orderListReducer,
    orderDeliver: orderDeliverReducer,
})

//Объекты веб-хранилища localStorage и sessionStorage позволяют хранить пары ключ/значение в памяти браузера.
// Что в них важно – данные, которые в них записаны, сохраняются после обновления страницы (в случае sessionStorage)
// и даже после перезапуска браузера (при использовании localStorage).

//Получение корзина продуктов из локального хранилища по ключу 'cartItems'.
const cartItemsFromStorage = localStorage.getItem('cartItems') ?
    JSON.parse(localStorage.getItem('cartItems')) : []

//Получение информации о юзере из локального хранилища по ключу 'userInfo'.
const userInfoFromStorage = localStorage.getItem('userInfo') ?
    JSON.parse(localStorage.getItem('userInfo')) : null

//Получение адреса доставки из локального хранилища по ключу 'shippingAddress'.
const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ?
    JSON.parse(localStorage.getItem('shippingAddress')) : {}


//Это инициализация начального состояния store, с использованием указанных выше данных.
//объект, представляющий начальное состояние хранилища.
const initialState = {
    cart: {
        cartItems: cartItemsFromStorage,
        shippingAddress: shippingAddressFromStorage,
    },
    userLogin: { userInfo: userInfoFromStorage },
}

//Redux Thunk это middleware библиотека, которая позволяет вам вызвать action creator,
// возвращая при этом функцию вместо объекта. Функция принимает метод dispatch как аргумент,
// чтобы после того, как асинхронная операция завершится, использовать его для диспатчинга
// обычного экшена, внутри тела функции.
//
// Thunk, это когда функция используется для задержки выполнения операции.
//Они предоставляют стороннюю точку расширения, между отправкой экшена и моментом, когда этот экшен достигает редюсера.
const middleware = [thunk]

//Здесь создается глобальное хранилище приложения, через createStore, которые принимает
// редюсеры(функии отвечающие за обновление состояния), начальное состояние, и миддлвары.
const store = createStore(reducer, initialState,
    composeWithDevTools(applyMiddleware(...middleware)))

export default store