import React, { Component } from 'react'
import { StyleSheet, View, Text, StatusBar, TextInput, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native'
// import { Icon } from 'react-native-elements'
import Icon from 'react-native-vector-icons/AntDesign'
import { connect } from 'react-redux'
import { Card } from 'react-native-elements'
import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage'

import env from '../../env/env'
import { white, night, yellow } from '../../styles/styles'
import { getCategories } from '../../redux/_action/categories'


class home extends Component {

    constructor() {
        super()
        this.state = {
            table: '',
            count: null
        }
    }


    async componentWillMount() {
        const table = await AsyncStorage.getItem('tableNumber')
        this.setState({
            table
        })
    }

    componentDidMount() {
        this.props.dispatch(getCategories())
    }

    loading = () => {
        return (<View style={{
            justifyContent: 'center',
            alignItems: 'center',
            alignContent: 'center'
        }}>
            <ActivityIndicator size={0} color={yellow} />
        </View>)
    }


    renderItem = ({ item }) => {
        return (
            <View style={styles.FlatList}>
                <TouchableOpacity underlayColor='white' onPress={() => this.props.navigation.navigate('menu', { rows: item })}>
                    <Card
                        image={{ uri: item.image }}
                    >
                        <Text style={{ fontWeight: 'bold' }}>{item.name}</Text>
                    </Card>
                </TouchableOpacity>
            </View >
        )
    }

    render() {
        const extractKey = ({ id }) => id.toString()
        console.log(this.props.categories)
        return (
            <View style={styles.container}>
                <StatusBar
                    backgroundColor={white}
                    barStyle='dark-content'
                />
                <View style={styles.header}>
                    <View>
                        <Text style={styles.textHeader}>Nativex</Text>
                        <Text style={{
                            fontSize: 20,
                            color: night,
                        }}>Anything you need</Text>
                    </View>
                </View>
                <View style={styles.footer}>
                    <View style={styles.search}>
                        <Icon name='search1' size={26} />
                        <TextInput style={styles.textContent} placeholder='Search anything...' />
                    </View>
                    <View style={styles.qr_code}>
                        <TouchableOpacity>
                            <View style={{ justifyContent: 'space-evenly' }}>
                                <Icon name='shoppingcart' size={26} />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.table}>
                    <Text style={{ color: night, fontWeight: 'bold' }}>No: {this.state.table}</Text>
                    <Text style={{ color: night }}>30.23.00</Text>
                </View>
                <View>
                    {
                        this.props.categories.isLoading == true &&
                        this.loading()
                    }
                    {this.props.categories.isLoading == false &&
                        <View style={{ paddingBottom: 80 }}>
                            <FlatList
                                showsVerticalScrollIndicator={false}
                                numColumns={2}
                                data={this.props.categories.data}
                                renderItem={this.renderItem}
                                keyExtractor={extractKey}
                                style={{ marginBottom: 100 }}
                            />
                        </View>
                    }
                </View>
            </View >
        )
    }
}

const mapStateToProps = state => {
    return {
        categories: state.categories
    }
}


export default connect(mapStateToProps)(home)

const styles = StyleSheet.create({
    table: {
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    container: {
        flex: 1,
        backgroundColor: white,
        paddingLeft: 20,
        paddingRight: 20
    },
    FlatList: {
        flex: 1,
        padding: 0
    },
    header: {
        flexDirection: 'row',
        marginBottom: 30,
        justifyContent: 'space-between',
        alignContent: 'center',
        alignItems: 'center'
    },
    textContent: {
        marginLeft: 20,
        fontSize: 15,
        color: night,
        width: '70%'
    },
    textHeader: {
        fontSize: 23,
        color: night,
        fontWeight: 'bold'
    },
    footer: {
        flexDirection: 'row'
    },
    search: {
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center',
        backgroundColor: '#eeeeee',
        height: 50,
        width: '80%',
        borderRadius: 30,
        paddingLeft: 20
    },
    qr_code: {
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        marginLeft: 20,
        backgroundColor: yellow,
        height: 50,
        width: '20%',
        borderTopLeftRadius: 30,
        borderBottomLeftRadius: 30,
        padding: 10
    },
    bottom: {
        height: '10%',
        width: '80%',
        backgroundColor: night,
        borderRadius: 30
    }
})
