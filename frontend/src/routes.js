import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import { AuthPage } from './components/AuthPage'
import { GoodsPage } from './components/GoodsPage'
import { OrdersPage } from './components/OrdersPage'
import {CreatePage} from './components/CreatePage'
import { DetailPage } from './components/DetailPage'
import {LinksPage} from './components/LinksPage'

export const useRoutes = isAuthenticated => {
    if (isAuthenticated) {
        return (
            <Switch>
                <Route path="/goods/:id" exact>
                    <GoodsPage />
                </Route>
                <Route path="/orders" exact>
                    <OrdersPage />
                </Route>
                <Route path="/create" exact>
                    <CreatePage />
                </Route>
                <Route path="/detail/:id" exact>
                    <DetailPage />
                </Route>
                <Route path="/links" exact>
                    <LinksPage />
                </Route>
                <Redirect to="/create" />
            </Switch>
        )
    }

    return (
        <Switch>
            <Route path="/" exact>
                <AuthPage />
            </Route>
            <Redirect to="/" />
        </Switch>
    )

}