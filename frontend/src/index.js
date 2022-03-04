import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import store from './store'
import './index.css';
import './bootstrap.min.css'
import App from './App';
import reportWebVitals from './reportWebVitals';

//Это точка, в которой наше приложение начинает работу.
//Происходит рендеринг компонента App.
//Для использование store в компоненте нам необходимо передавать его в пропсы(почти аргументы) через Provider.
//Рендеринг — это процесс, в рамках которого React опрашивает ваши компоненты, требуя от них актуальное описание
// той секции пользовательского интерфейса, за которую они отвечают, основываясь на текущей комбинации
// пропсов (props) и состояния (state).
//Есть два этапа:
//этап рендеринга (render phase) — рендеринг всех компонентов и вычисление изменений;
// этап фиксации (commit phase) — процесс применения изменений к DOM.
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
