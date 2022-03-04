import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navbar, Nav, Container, Row, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import SearchBox from './SearchBox'
import { logout } from '../actions/userActions' //Actions используемые в компоненте.

//Это компонент - верхней части страницы (меню)
function Header() {

    //Хуки - это то, что позволяет использовать состояние и другие возможности реакт без написания классов.
    //useSelector - это хук,который позволяет извлекать данные из состояния хранилища Redux с помощью функции селектора.
    //Селектор будет запускаться всякий раз, когда компонент функции выполняет рендеринг (если только его ссылка
    // не изменилась с момента предыдущего рендеринга компонента, так что кэшированный результат может
    // быть возвращен хуком без повторного запуска селектора).
    // useSelector() также подпишется на store Redux и будет запускать свой селектор всякий раз, когда отправляется действие.
    const userLogin = useSelector(state => state.userLogin) //для получения доступа к селекторам.
    const { userInfo } = userLogin

    //Этот хук возвращает ссылку на dispatch функцию из хранилища Redux.
    const dispatch = useDispatch() //для получения доступа к диспетчеру

    //Функция для выхода из аккаунта.
    const logoutHandler = () => {
        //Здесь происходит вызов экшона logout().
        dispatch(logout())
    }

    //Здесь уже хранится тело самого компонента.
    return (
        <header>
            <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
                <Container>
                    <LinkContainer to='/'>
                        <Navbar.Brand>Магазин</Navbar.Brand>
                    </LinkContainer>

                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <SearchBox />
                        <Nav className="ml-auto">

                            <LinkContainer to='/cart'>
                                <Nav.Link ><i className="fas fa-shopping-cart"></i>Корзина</Nav.Link>
                            </LinkContainer>

                            {userInfo ? (
                                <NavDropdown title={userInfo.name} id='username'>
                                    <LinkContainer to='/profile'>
                                        <NavDropdown.Item>Профиль</NavDropdown.Item>
                                    </LinkContainer>

                                    <NavDropdown.Item onClick={logoutHandler}>Выход</NavDropdown.Item>

                                </NavDropdown>
                            ) : (
                                    <LinkContainer to='/login'>
                                        <Nav.Link><i className="fas fa-user"></i>Вход</Nav.Link>
                                    </LinkContainer>
                                )}


                            {userInfo && userInfo.isAdmin && (
                                <NavDropdown title='Admin' id='adminmenue'>
                                    <LinkContainer to='/admin/userlist'>
                                        <NavDropdown.Item>Пользователи</NavDropdown.Item>
                                    </LinkContainer>

                                    <LinkContainer to='/admin/productlist'>
                                        <NavDropdown.Item>Продукты</NavDropdown.Item>
                                    </LinkContainer>

                                    <LinkContainer to='/admin/orderlist'>
                                        <NavDropdown.Item>Заказы</NavDropdown.Item>
                                    </LinkContainer>

                                </NavDropdown>
                            )}


                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header
