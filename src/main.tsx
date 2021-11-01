import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from './store';
import { routes } from './routes';
import './styles/main.scss';

const store = configureStore();

const App: React.FC = () => (
  <Provider store={store}>
    <BrowserRouter>{renderRoutes(routes)}</BrowserRouter>
  </Provider>
);

ReactDOM.render(<App />, document.getElementById('root'));
