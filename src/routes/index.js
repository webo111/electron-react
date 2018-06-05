import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import AdminManage from '../components/AdminManage';

export default class CRouter extends Component {
    requireAuth = (permission, component) => {
        const { auth } = this.props;
        const { permissions } = auth.data;
        // const { auth } = store.getState().httpData;
        if (!permissions || !permissions.includes(permission)) return <Redirect to={'login'} />;
        return component;
    };
    render() {
        return (
            <Switch>
                <Route exact path="/app/auth/adminManage" component={(props) => this.requireAuth('auth/testPage', <AdminManage {...props} />)} />
                <Route render={() => <Redirect to="/404" />} />
            </Switch>
        )
    }
}