import React, { Component } from 'react'
import { createStackNavigator, createAppContainer } from 'react-navigation'

import home from '../screen/home/home'
import menu from '../screen/home/menu'
import login from '../screen/auth/login'
import publicNav from './public-nav'
import splash from '../screen/splash/splash'

const AppStack = createStackNavigator({
    home: {
        screen: home
    }, menu: {
        screen: menu
    },
    login: {
        screen: login
    },
    publicNav: {
        screen: publicNav
    },
    splash: {
        screen: splash
    }

}, {
        headerMode: 'none',
        initialRouteName: 'splash'
    })


const AppContainer = createAppContainer(AppStack)


class PublicStack extends Component {
    render() {
        return (
            <AppContainer />
        )
    }
}

export default PublicStack