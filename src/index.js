import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { applyMiddleware, createStore } from "redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import reducer from "./reducers/root";
import thunk from "redux-thunk";
import { Provider } from "react-redux";

const store = createStore(reducer, {}, applyMiddleware(thunk));

const ScrollToTop = () => {
  window.scrollTo(0, 0);
  return null;
};


ReactDOM.render(
  <Provider store={store}>
     <Router>
      <Route component={ScrollToTop}></Route>
      <Switch>
        <Route path="/" component={App} />
      </Switch>
    </Router>
   </Provider>
  ,
  document.getElementById('root')
);
