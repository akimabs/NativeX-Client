import React from 'react'
import { createBottomTabNavigator, createAppContainer } from 'react-navigation'
// import { Icon } from 'react-native-elements'
import Icon from 'react-native-vector-icons/AntDesign'

import home from '../screen/home/home'
import login from '../screen/auth/login'

import { white, yellow, night } from '../styles/styles'

const PublicNav = createBottomTabNavigator({
    home: {
        screen: home,
        navigationOptions: {
            tabBarLabel: 'Home',
            tabBarIcon: ({ tintColor }) => (
                <Icon name="home" color={tintColor} size={25} />
            )
        }
    },
    login: {
        screen: login,
        navigationOptions: {
            tabBarLabel: 'Login',
            tabBarIcon: ({ tintColor }) => (
                <Icon name="user" color={tintColor} size={25} />
            )
        }
    }
}, {
        tabBarOptions: {
            activeTintColor: yellow,
            inactiveTintColor: night,
            style: {
                backgroundColor: white,
                borderTopWidth: 0,
                shadowOffset: { width: 6, height: 6 },
                shadowColor: 'black',
                shadowOpacity: 0.5,
                elevation: 6,
                paddingTop: 10
            }
        }
    })

export default createAppContainer(PublicNav)