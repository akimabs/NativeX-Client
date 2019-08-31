import React, { Component } from 'react'
import { View, StyleSheet, Text } from 'react-native'

import { white, night, yellow } from '../../styles/styles'

class register extends Component {
    render() {
        return (
            <View style={styles.body}>
                <View style={styles.container}>
                </View >
            </View >
        )
    }
}

export default register

const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: white
    },
    container: {
        flexDirection: 'column',
        height: '100%'
    }

})