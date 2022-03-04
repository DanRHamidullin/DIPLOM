import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { login } from '../actions/userActions'

function FeedbackScreen({ location, history }) {
    const [username, setUsername] = useState('')
    const [userphone, setUserphone] = useState('')

    const dispatch = useDispatch()

    const redirect = location.search ? location.search.split('=')[1] : '/'

    const userLogin = useSelector(state => state.userLogin)
    const { error, loading, userInfo } = userLogin

    useEffect(() => {
        if (userInfo) {
            history.push(redirect)
        }
    }, [history, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(username, userphone))
    }

    return (
        <FormContainer>
            <h1>Фидбэк</h1>
            <Form onSubmit={submitHandler}>

                <Form.Group controlId='UserName'>
                    <Form.Label>Имя пользователя</Form.Label>
                    <Form.Control
                        type='username'
                        placeholder='Ввести имя пользователя'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>


                <Form.Group controlId='UserPhone'>
                    <Form.Label>Телефон</Form.Label>
                    <Form.Control
                        type='userphone'
                        placeholder='Ввести телефон '
                        value={userphone}
                        onChange={(e) => setUserphone(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary'>
                    Отправить
                </Button>
            </Form>


        </FormContainer>
    )
}

export default FeedbackScreen
