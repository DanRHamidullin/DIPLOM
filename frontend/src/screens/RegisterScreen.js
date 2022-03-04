import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { register } from '../actions/userActions'

function RegisterScreen({ location, history }) {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')
//получение из стора функции стордисатч, чтобы не использовать коннект(обновление состояния)
    const dispatch = useDispatch()

    const redirect = location.search ? location.search.split('=')[1] : '/'
        //мапинг значения из стор
    const userRegister = useSelector(state => state.userRegister)
    const { error, loading, userInfo } = userRegister
        // хук эвекта выполняет побочные действия в функциональном компоненте
    useEffect(() => {
        if (userInfo) {
            history.push(redirect)
        }
    }, [history, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()

        if (password != confirmPassword) {
            setMessage('Пароль не совпадает')
        } else {
            dispatch(register(name, email, password))
        }

    }

    return (
        <FormContainer>
            <h1>Войти</h1>
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>

                <Form.Group controlId='name'>
                    <Form.Label>Имя</Form.Label>
                    <Form.Control
                        required
                        type='name'
                        placeholder='Введите имя'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='email'>
                    <Form.Label>Email Адрес</Form.Label>
                    <Form.Control
                        required
                        type='email'
                        placeholder='Введите Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='password'>
                    <Form.Label>Пароль</Form.Label>
                    <Form.Control
                        required
                        type='password'
                        placeholder='Введите пароль'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='passwordConfirm'>
                    <Form.Label>Повторите пароль</Form.Label>
                    <Form.Control
                        required
                        type='password'
                        placeholder='Повторите пароль'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary'>
                    Зарегестрироваться
                </Button>

            </Form>

            <Row className='py-3'>
                <Col>
                    Уже есть аккаунт? <Link
                        to={redirect ? `/login?redirect=${redirect}` : '/login'}>
                        Войти
                        </Link>
                </Col>
            </Row>
        </FormContainer >
    )
}

export default RegisterScreen
