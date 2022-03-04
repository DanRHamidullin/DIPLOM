// import React from 'react';
// import renderer from 'react-test-renderer';
// import SearchBox from "./components/SearchBox";
// import {render, screen, waitFor} from '@testing-library/react';
// import '@testing-library/jest-dom'
// import { Provider } from 'react-redux';
// import HomeScreen from "./screens/HomeScreen";
// import store from './store'
// import Header from "./components/Header";
// import {Container} from "react-bootstrap";
// import {HashRouter as Router, Route} from "react-router-dom";
// import Footer from "./components/Footer";
// import ProductCarousel from "./components/ProductCarousel";
// import App from "./App";
//
// //Блок describe - это набор тестов, а test - это тестовый кейс.
// //Внутри тестового примера мы пишем утверждения (например, expect в Jest),
// // которые проверяют успешность (зеленый) или ошибочность (красный) утверждения.
//
// //Тест, в котором мы проверяем, что элемент SearchBox был срендерен
// // и ищем элемент в DOM с текстом 'Submit'.
// describe('SearchBox component', () => {
//  test('it renders', () => {
//    render(<SearchBox />);
//    expect(screen.getByText('Submit')).toBeInTheDocument();
//  });
// })
//
// // describe('SearchBox component', () => {
// //  test('it rendersss', () => {
// //    render(<Provider store={store}>
// //        <ProductCarousel />
// //      </Provider>);
// //    expect(screen.getByText('Latest Products')).toBeInTheDocument();
// //  });
// // })
//
// //Тест, в котором мы проверяем, что элемент ... среднерился и подгрузил данные с помощью запроса.
// describe('App component', () => {
//
//  test('it renders for App', async () => {
//      const HomeScreenComponent = render(<Provider store={store}>
//          <ProductCarousel/>
//      </Provider>)
//
//    expect(HomeScreenComponent.getByText('Submit')).toBeInTheDocument();
//      const productsList = await waitFor(() => HomeScreenComponent.getByText('Latest Products'));
//      expect(productsList).toBeInTheDocument();
//    // expect(screen.getByAltText('input')).toBeInTheDocument();
//  });
// })
//
// it("render correctly searchbox component", () => {
//     const SearchBoxComponent = renderer.create(<SearchBox />);
//     let tree = SearchBoxComponent.toJSON();
//     expect(tree).toMatchSnapshot();
// });