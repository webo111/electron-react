import React from 'react';
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux';
import Root from './containers/Root'
import configureStore from './store/configureStore'
import registerServiceWorker from './registerServiceWorker';

const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <Root store={store} />
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();
