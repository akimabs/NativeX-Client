import React, { Component } from 'react'
import { createSwitchNavigator, createAppContainer } from 'react-navigation'
import { Provider } from 'react-redux'

import store from './src/redux/store'
import publicStack from './src/navigation/public-stack'


const AppSwicth = createSwitchNavigator({
  publicStack: {
    screen: publicStack
  }
}, {
    initialRouteName: 'publicStack'
  })

const AppContainer = createAppContainer(AppSwicth)

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    )
  }
}

export default App
