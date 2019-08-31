import React, { Component } from 'react'
import { StyleSheet, View, Text, StatusBar, TextInput, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native'
// import { Icon } from 'react-native-elements'
import Icon from 'react-native-vector-icons/AntDesign'
import { connect } from 'react-redux'
import { Card } from 'react-native-elements'

import env from '../../env/env'
import { white, night, yellow } from '../../styles/styles'
import { getCategories } from '../../redux/_action/categories'

class home extends Component {

    componentDidMount() {
        this.props.dispatch(getCategories())
    }

    loading = () => {
        return (<View style={{
            justifyContent: 'center',
            alignItems: 'center',
            alignContent: 'center'
        }}>
            <ActivityIndicator size={50} color={yellow} />
        </View>)
    }

    renderItem = ({ item }) => {
        return (
            <View style={styles.FlatList}>
                <TouchableOpacity underlayColor='white'>
                    <Card
                        image={{ uri: 'https://scm-assets.constant.co/scm/unilever/2bb5223be0548fcc55c230aa5f951219/c5b644d4-7bd0-4021-b3d1-085021fa1b97.jpg' }}
                    >
                        <Text>{item.name}</Text>
                    </Card>
                </TouchableOpacity>
            </View >
        )
    }

    render() {
        const extractKey = ({ id }) => id.toString()
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
                            <Icon name='scan1' size={26} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View>
                    {
                        this.props.categories.isLoading == true &&
                        this.loading()
                    }
                    {this.props.categories.isLoading == false &&
                        < FlatList
                            showsVerticalScrollIndicator={false}
                            numColumns={2}
                            data={this.props.categories.data}
                            renderItem={this.renderItem}
                            keyExtractor={extractKey}
                            style={{ marginBottom: 100 }}
                        />
                    }

                </View>
            </View>
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
        marginBottom: 30
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
