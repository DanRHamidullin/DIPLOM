import axios from 'axios'
import {
    CART_ADD_ITEM,
    CART_REMOVE_ITEM,
    CART_SAVE_SHIPPING_ADDRESS,

    CART_SAVE_PAYMENT_METHOD,
} from '../constants/cartConstants'

//Данный метод принимает на вход id конкретного продукта и qty - колличество продукта.
export const addToCart = (id, qty) => async (dispatch, getState) => {
    //Ставится async в обьявлении функции, чтобы указать, что функция работант асинхронно.
    //Внутри функции ставится await, который возвращает все, что возвращает функция async при ее выполнении.
    //В нашем случае происходит асснихронный запрос на сервер.

    //Это ответ который придет от бэка, и будет использоваться в payload, то есть произойдет
    // передача в конкретный редюсер.
    const { data } = await axios.get(`/api/products/${id}`)

    ////Отправляем action в store через метод dispatch(), а уже полсе этого наш action подхватит reducer,
    // который определит как состояния приложения изменится от полученного action-a в store.
    // Он вызывается у объекта store который мы создаём в store.js.
    //Эта функция вызовет функцию reducer который обработает событие и обновит соответствующие поля хранилища.
    //То есть здесь в редюсер перейдут данные о типе и полезная нагрузка, то есть внутренние поля.
    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            product: data._id,
            name: data.name,
            image: data.image,
            price: data.price,
            countInStock: data.countInStock,
            qty
        }
    })
    //сохранить пару ключ/значение в локальное хранилище.
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}


//Данный метод принимает на вход id конкретного продукта
export const removeFromCart = (id) => (dispatch, getState) => {
    //Отправляем action в store через метод dispatch()
    dispatch({
        type: CART_REMOVE_ITEM,
        payload: id,
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}


export const saveShippingAddress = (data) => (dispatch) => {
    dispatch({
        type: CART_SAVE_SHIPPING_ADDRESS,
        payload: data,
    })

    localStorage.setItem('shippingAddress', JSON.stringify(data))
}

export const savePaymentMethod = (data) => (dispatch) => {
    dispatch({
        type: CART_SAVE_PAYMENT_METHOD,
        payload: data,
    })

    localStorage.setItem('paymentMethod', JSON.stringify(data))
}