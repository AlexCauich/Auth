import React, { Component } from 'react';
import ReactDOM from 'react-dom';
// import App component
import App from './components/App';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import taskEdit from './components/taskEdit';

if (document.getElementById('root')) {
    ReactDOM.render(
        <BrowserRouter>
            <div>
                <Switch>
                    <Route path="/:id/edit" component={taskEdit} exact={true}/>
                    <App />
                </Switch>
            </div>
        </BrowserRouter>,
        document.getElementById('root')
    );
}