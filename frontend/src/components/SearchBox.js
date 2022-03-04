import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

function SearchBox() {

    //useState - это хук, который позволяет добавлять состояние React к компонентам-функциям.
    //Обьявили переменную состояния keyword и функцию обновления значения setKeyword, и инициализировали его начальное состояние через useState('').
    //Этот хук возвращает нам текущее состояне keyword
    const [keyword, setKeyword] = useState('')

    //useHistory - это хук React Router, который предоставляет доступ к экземпляру истории, который используется для навигации.
    //То есть дальше мы можем использовать этот обьект для перехода на другую страницу через history.push()
    let history = useHistory()

    const submitHandler = (e) => {
        e.preventDefault()
        if (keyword) { //Здесь переходим по введеной строке поиска.
            history.push(`/?keyword=${keyword}&page=1`)
        } else { //Здесь остаемся на месте, так как поле поиска пустое.
            history.push(history.push(history.location.pathname))
        }
    }
    return (
        <Form onSubmit={submitHandler} inline>
            <Form.Control
                type='text'
                name='q'
                onChange={(e) => setKeyword(e.target.value)}
                className='mr-sm-2 ml-sm-5'
            ></Form.Control>

            <Button
                type='submit'
                variant='outline-success'
                className='p-2'
            >
                Поиск
            </Button>
        </Form>
    )
}

export default SearchBox
