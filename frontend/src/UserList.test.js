import { formatUserName } from "./utils";
import { render, screen, waitFor } from '@testing-library/react';
import UserList from "./UserList";
import '@testing-library/jest-dom'
import renderer from "react-test-renderer";
import React from "react";
import SearchBox from "./components/SearchBox";


//Блок describe - это набор тестов, а test - это тестовый кейс. В наборе тестов может быть несколько тестовых кейсов.
//Внутри тестового примера мы пишем утверждения (например, expect в Jest), которые проверяют успешность (зеленый)
// или ошибочность (красный) утверждения.

//Это модульный тест, который проверяет, есть преборазуюется ли username строка в вид: login: username.
describe('utils test', () => {
 test('formatUserName adds "login" at the beginning of the username', () => {
   expect(formatUserName('jc')).toBe('login: jc');
 });
});

//Мы используем функцию рендеринга mount и визуализируем отдельный компонент изолированно.
//Этот тест завершится неудачно только в том случае, если есть ошибка компиляции или ошибка
// в функциональном компоненте, которая препятствует его визуализации. Здесь не утверждений.
describe('UserList component', () => {
 test('it renders', () => {
   render(<UserList />);
 });
})

//Тот же тест, что и выше, но с утверждением.
//Проверка что компонент был срендерен, но также поиск элемента, присутствующего в DOM, с текстом «Users:»
describe('UserList component 1', () => {
 test('it renders 1', () => {
   render(<UserList />);

   expect(screen.getByText('Users:')).toBeInTheDocument();
 });
})

//Здесь происходит асинхронная операция (fetch), поэтому мы дожидаемся, когда завершится вызов у await и уже смотрим утверждение.
//Если не использовать await, то тест не выполнится, потому что вызов ассинхронной операции еще не выполнен.
describe('UserList component 2', () => {
 test('it displays a list of users', async () => {
   render(<UserList />);


   const userList = await waitFor(() => screen.getByTestId('user-list'));
   expect(userList).toBeInTheDocument();
 });
});


//Тест на основе снимка.
describe('UserList component render', () => {
    test("render correctly UserList component", () => {
        const UserListComponent = renderer.create(<UserList/>);
        let tree = UserListComponent.toJSON();
        expect(tree).toMatchSnapshot();
    });
})