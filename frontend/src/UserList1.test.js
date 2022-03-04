import axios from "axios";
import {render, screen, waitFor} from "@testing-library/react";
import UserList from "./UserList";
import '@testing-library/jest-dom'

//Mocking (имитация).
// Цель имитации - изолировать тестируемый код от внешних зависимостей, таких как вызовы API.
// Это достигается заменой зависимостей управляемыми объектами, которые моделируют эти зависимости.

jest.mock('axios'); //Имитация зависимостей

const fakeUsers = [{
  "id": 1,
  "name": "Test User 1",
  "username": "testuser1",
 }, {
  "id": 2,
  "name": "Test User 2",
  "username": "testuser2",
 },
    {
  "id": 3,
  "name": "Test User 3",
  "username": "testuser3",
 }];

describe('UserList component 3', () => {

 test('it renders 3', async () => {
   axios.get.mockResolvedValue({ data: fakeUsers }); //Подделка выходов функции
   render(<UserList />);

   expect(screen.getByText('Users:')).toBeInTheDocument();
 });

 test('it displays a list of users', async () => {
   axios.get.mockResolvedValue({ data: fakeUsers }); //Подделка выходов функции

   render(<UserList />);

   const userList = await waitFor(() => screen.getByTestId('user-list'));
   expect(userList).toBeInTheDocument();
 });

 test('it displays a row for each user', async () => {
   axios.get.mockResolvedValue({ data: fakeUsers }); //Подделка выходов функции
   render(<UserList />);

   const userList = await waitFor(() => screen.findAllByTestId('user-item'));
   expect(userList).toHaveLength(3);
 });
});