import React, { Component } from 'react'
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ActivityIndicator, StatusBar } from 'react-native'
import { white, night, yellow } from '../../styles/styles'
import { Button } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage'
import axios from 'axios';
import { connect } from 'react-redux'
import { addTransaction, getTransactions } from '../../redux/_action/transaction'


class splash extends Component {
    constructor() {
        super()
        this.state = {
            table: null

        }
    }

    onTable = (table) => { this.setState({ table }) }
    tableSend = async () => {
        if (this.state.table == null) {
            return false
        } else {
            await AsyncStorage.setItem('tableNumber', this.state.table)
            await this.props.dispatch(addTransaction({
                tableNumber: this.state.table,
                isPaid: 0
            }))
            await AsyncStorage.setItem('transactionId', `${this.props.transaction.data.id}`)
            await this.props.navigation.navigate('publicNav')
        }
    }

    render() {
        return (
            <View style={styles.body}>
                <StatusBar
                    backgroundColor={white}
                    barStyle='dark-content'
                />
                <View>
                    <TextInput placeholder='Masukan nomor antrian' keyboardType={'numeric'} style={styles.TextInput} underlineColorAndroid={night} onChangeText={this.onTable}></TextInput>
                    <Button type={'solid'} title='SUBMIT' style={{ backgroundColor: night }} onPress={this.tableSend} />

                </View>
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        transaction: state.transaction
    }
}

export default connect(mapStateToProps)(splash)

const styles = StyleSheet.create({
    body: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        backgroundColor: white
    },
    TextInput: {
        width: '70%',
        fontSize: 16
    }
})