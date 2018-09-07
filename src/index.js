import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { reducer } from './redux/reducer'
import 'semantic-ui-css/semantic.min.css';
import actionCable from 'actioncable'


const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

const CableApp = {}
CableApp.cable = actionCable.createConsumer(`ws://${window.location.hostname}:3000/cable`)

ReactDOM.render(
  <Provider store={store}>
    <App cableApp={CableApp}/>
  </Provider>
  , document.getElementById('root'));
