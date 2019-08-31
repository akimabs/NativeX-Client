import React, { Component } from 'react'
import { createStackNavigator, createAppContainer } from 'react-navigation'

import home from '../screen/home/home'
import login from '../screen/auth/login'
import publicNav from './public-nav'

const AppStack = createStackNavigator({
    home: {
        screen: home
    },
    login: {
        screen: login
    },
    publicNav: {
        screen: publicNav
    }

}, {
        headerMode: 'none',
        initialRouteName: 'publicNav'
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