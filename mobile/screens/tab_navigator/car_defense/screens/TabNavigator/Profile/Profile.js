import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    FlatList,
    ScrollView,
    RefreshControl,
    TouchableOpacity,
    Alert
} from 'react-native';
import { Icon } from 'native-base';
import { CAR_API } from '../const/Const'

export default class UserProfileView extends Component {

    constructor(props) {
        super(props);

        this.state = {
            refreshing: false,
            id: '',
            user: '',
            source: null
        };
    }

    async componentDidMount() {
        const { state } = this.props.navigation;
        this.state.id = state.params ? (state.params.user.id ? state.params.user.id : state.params.user.user_id) : undefined;
        this.state.user = state.params ? (state.params.user.first_name ? state.params.user.first_name : state.params.user.username) : undefined;
        this.state.source = state.params.user.picture ? { uri: state.params.user.picture.data.url } : require('../../../../../../images/hehehehhehehehheeh.png');
        let link = CAR_API + '/car/?token=' + this.state.id

        return fetch(link)
            .then((response) => response.json())
            .then((responseJson) => {

                this.setState({
                    isLoading: false,
                    dataSource: responseJson,
                }, function () {

                });

            })
            .catch((error) => {
                console.error(error);
            });
    }

    _onPressButton = (plate) => {
        url = CAR_API + '/delete_car/'

        let car = JSON.stringify({
            id_token: this.state.id,
            plate: plate
        })

        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: car
        }).then(response => { return response.json() }
        ).then(jsonResponse => {
            Alert.alert(jsonResponse)
            this.setState({ refreshing: true });
            this.componentDidMount().then(() => {
                this.setState({ refreshing: false });
            });
        }).catch(error => {
            Alert.alert("Falha na conexão")
        })
    }

    _onRefresh = () => {
        this.setState({ refreshing: true });
        this.componentDidMount().then(() => {
            this.setState({ refreshing: false });
        });
    }

    registerCar = () => {
        const { state } = this.props.navigation;
        var user = state.params ? state.params.user : undefined;
        this.props.navigation.navigate('RegisterCar', { user: user })
    }

    render() {

        return (
            <View style={{ backgroundColor: "#00ACC1", flex: 1 }}>
                <ScrollView
                    style={styles.item}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this._onRefresh}
                        />
                    }
                >
                    <View style={styles.headerContent}>
                        <Image style={styles.avatar}
                            source={this.state.source}
                        />
                        <Text style={styles.name}>Olá, {this.state.user}! Tudo bem?</Text>
                        <Text style={styles.userInfo}>Aqui estão os seus carros</Text>
                    </View>

                    <View>
                        <FlatList
                            data={this.state.dataSource}
                            renderItem={({ item }) => {
                                return (
                                    <View style={styles.item2}>
                                        <Icon
                                            type='FontAwesome'
                                            name="car"
                                            style={styles.icon1}
                                        />
                                        <View style={styles.container}>
                                            <Text style={styles.text1}>{item.plate}</Text>
                                            <Text style={styles.text2}>Modelo: {item.model}</Text>
                                            <Text style={styles.text2}>Cor: {item.color}</Text>
                                        </View>
                                        <View>
                                            <TouchableOpacity
                                                color="grey"
                                                onPress={() => { this._onPressButton(item.plate) }}
                                                containerViewStyle={{ width: '10%' }}
                                            >
                                                <Icon
                                                    type='FontAwesome'
                                                    name="trash"
                                                    style={styles.icon}
                                                />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                );
                            }}
                            keyExtractor={({ id }, index) => id.toString()}
                        />
                    </View>
                    <View style={styles.container}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => this.registerCar()}
                            containerViewStyle={{ width: '40%' }}
                        >
                            <Text style={styles.text} >+</Text>

                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center'
    },
    text: {
        color: "white",
        fontSize: 30,
    },
    button: {
        backgroundColor: "#B2EBF2",
        borderRadius: 20,
        height: 40,
        width: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerContent: {
        padding: 30,
        alignItems: 'center',
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 40,
        borderWidth: 5,
        borderColor: "white",
        marginBottom: 10,
    },
    name: {
        fontSize: 22,
        color: "white",
        fontWeight: '800',
    },
    userInfo: {
        fontSize: 15,
        color: "white",
        fontWeight: '800',
        marginTop: 30,
        marginBottom: 15
    },
    item: {
        marginTop: 20,
        marginBottom: 5
    },
    item2: {
        alignItems: "center",
        backgroundColor: "white",
        flexGrow: 1,
        paddingVertical: 20,
        borderRadius: 15,
        elevation: 4,
        margin: 25,
        marginTop: 2,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    icon: {
        color: "red",
        fontWeight: '800',
        fontSize: 30,
        marginRight: 20
    },
    icon1: {
        color: "#26C6DA",
        fontWeight: '800',
        fontSize: 44,
        marginLeft: 20
    },
    text1: {
        color: "#26C6DA",
        fontWeight: '800',
        fontSize: 30
    },
    text2: {
        color: "#26C6DA",
        fontWeight: '800',
        fontSize: 12
    },
});