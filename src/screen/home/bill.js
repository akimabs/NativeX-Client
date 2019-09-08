import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/AntDesign'
import AsyncStorage from '@react-native-community/async-storage'
import { getCart } from '../../redux/_action/orders'


import { white, night, yellow } from '../../styles/styles'

class bill extends Component {

    constructor() {
        super()
        this.state = {
            table: '',
            total: ''
        }
    }


    _count = () => {
        totalku = 0
        this.props.orders.cart.map((item) => {
            let data = item.price * item.qty
            totalku = data + totalku
        })
        this.setState({
            total: totalku
        })
    }

    toRupiah = (number) => {
        let rupiah = '';
        let revNumber = number.toString().split('').reverse().join('');
        for (var i = 0; i < revNumber.length; i++) if (i % 3 == 0) rupiah += revNumber.substr(i, 3) + '.';
        return 'Rp. ' + rupiah.split('', rupiah.length - 1).reverse().join('');
    }

    async componentDidMount() {
        const table = await AsyncStorage.getItem('tableNumber')
        this.setState({
            table
        })
        await this.props.dispatch(getCart(this.props.transaction.id))
        await this._count()
    }

    renderItem = ({ item }) => {
        return (
            <View style={styles.body}>
                <View>
                    <Text style={{ fontSize: 15, color: yellow, fontWeight: 'bold' }}>{item.name}</Text>
                    <Text style={{ fontSize: 24, color: night, fontWeight: 'bold' }}>{this.toRupiah(item.price)}</Text>
                </View>
                <View>
                    <Icon name='checkcircle' color='#00a663' size={26} />
                </View>
            </View>
        )
    }

    render() {
        const extractKey = ({ menuId }) => menuId.toString()
        // const extractKey = this.props.orders.cart.menuId
        return (
            <View style={styles.container}>
                <View>
                    <View style={styles.der}>
                        <View>
                            <Text style={{ fontSize: 23, color: night, fontWeight: 'bold' }}>Nativex</Text>
                            <Text style={{ fontSize: 20, color: night, }}>Anything you need</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.header}>
                    <View>
                        <Text style={{ fontSize: 12, color: white, fontWeight: 'bold' }}>Pending payment</Text>
                    </View>

                    <View style={{ marginRight: 15 }}>
                        <Text style={{ fontSize: 24, color: white, fontWeight: 'bold' }}>{this.toRupiah(this.state.total)}</Text>
                    </View>
                </View>
                <Text style={{ fontSize: 24, color: night, fontWeight: 'bold', paddingTop: 10, textAlign: 'right', paddingRight: 30 }}>Detail Bill #{this.state.table}</Text>
                <View style={{ flexDirection: 'row', paddingLeft: 30, paddingRight: 30, paddingTop: 10 }}>
                    <View style={{ height: 3, backgroundColor: 'lightgrey', width: '60%' }} />
                    <View style={{ height: 3, backgroundColor: '#00a663', width: '40%' }} />
                </View>

                <FlatList
                    snapToInterval={270}
                    decelerationRate="normal"
                    showsVerticalScrollIndicator={false}
                    data={this.props.orders.cart}
                    renderItem={this.renderItem}
                    keyExtractor={extractKey}
                />


                <View style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity style={{ marginTop: 10, marginBottom: 10, height: 50, width: '90%', backgroundColor: yellow, borderRadius: 10, paddingLeft: 20, paddingRight: 20, justifyContent: 'center', alignContent: 'center', alignItems: 'flex-end' }} onPress={() => this.props.navigation.navigate('success')}>
                        <View>
                            <View>
                                <Text style={{ fontSize: 20, color: '#00a663', fontWeight: 'bold', marginBottom: 3 }}>Payment</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>

            </View >
        )
    }
}


const mapStateToProps = state => {
    return {
        transaction: state.transaction,
        orders: state.orders
    }
}


export default connect(mapStateToProps)(bill)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: white
    },
    body: {
        paddingTop: 10,
        paddingLeft: 20,
        paddingRight: 20,
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    header: {
        marginTop: 20,
        backgroundColor: '#00a663',
        height: 120,
        elevation: 3,
        borderBottomRightRadius: 10,
        borderTopRightRadius: 10,
        width: '70%',
        padding: 20,
        justifyContent: 'space-evenly',
        alignContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    },
    der: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'center',
        alignItems: 'center',
        padding: 10
    },
})