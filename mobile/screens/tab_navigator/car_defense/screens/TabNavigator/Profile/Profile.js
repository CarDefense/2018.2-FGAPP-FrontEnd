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
            refreshing: false
        };
    }

    // getCar = () => {
    //     const { state } = this.props.navigation;
    //     var id = state.params ? (state.params.user.id ? state.params.user.id : state.params.user.user_id) : undefined;
    //     let link = CAR_API + '/car/?token=' + id

    //     return fetch(link)
    //         .then((response) => response.json())
    //         .then((responseJson) => {

    //             this.setState({
    //                 isLoading: false,
    //                 dataSource: responseJson,
    //             }, function () {

    //             });

    //         })
    //         .catch((error) => {
    //             console.error(error);
    //         });
    // }

    async componentDidMount() {
        const { state } = this.props.navigation;
        var id = state.params ? (state.params.user.id ? state.params.user.id : state.params.user.user_id) : undefined;
        let link = CAR_API + '/car/?token=' + id

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
        const { state } = this.props.navigation;
        var id = state.params ? (state.params.user.id ? state.params.user.id : state.params.user.user_id) : undefined;
        url = CAR_API + '/delete_car/'


        let car = JSON.stringify({
            id_token: id,
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

    render() {
        const { state } = this.props.navigation;
        var user = state.params ? (state.params.user.name ? state.params.user.name : state.params.user.username) : undefined;


        return (
            <View style={{ backgroundColor: "#8bd4da", flex: 1 }}>
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this._onRefresh}
                        />
                    }
                >
                    <View style={styles.header}>
                        <View style={styles.headerContent}>
                            <Image style={styles.avatar}
                                source={{ uri: 'http://cardefense2.eastus.cloudapp.azure.com:8002/media/hehehehhehehehheeh.png' }} />

                            <Text style={styles.name}>Olá, {user}! Tudo bem?</Text>
                            {/* <Text style={styles.userInfo}>jhonnydoe@mail.com </Text> */}
                            {/* <Text style={styles.userInfo}>Florida </Text> */}
                            <Text style={styles.userInfo}>Aqui estão os seus carros</Text>
                        </View>
                    </View>

                    <View style={{ backgroundColor: '#8bd4da' }}>
                        <FlatList
                            style={{ backgroundColor: '#8bd4da' }}
                            data={this.state.dataSource}
                            renderItem={({ item }) => {
                                return (
                                    <View style={styles.item2}>
                                        <Text style={styles.text1}>{item.plate}</Text>
                                        <Text style={styles.text2}>Modelo: {item.model}   Cor: {item.color}</Text>
                                        <Icon
                                            type='FontAwesome'
                                            name="car"
                                            style={styles.icon1}
                                        />
                                        <TouchableOpacity
                                            color="grey"
                                            onPress={ () => { this._onPressButton(item.plate) } }
                                            containerViewStyle={{ width: '10%' }}
                                        >
                                            <Icon
                                                type='FontAwesome'
                                                name="trash"
                                                style={{ color: "red" }}
                                            />
                                        </TouchableOpacity>
                                        {/* <Button
                                        title='press'
                                    >
                                        <Icon
                                        type='FontAwesome'
                                        name="car"
                                        />
                                        </Button> */}
                                    </View>

                                );
                            }}
                            keyExtractor={({ id }, index) => id.toString()}
                        />
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: "#8bd4da",
    },

    headerContent: {
        padding: 30,
        alignItems: 'center',
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 63,
        borderWidth: 4,
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
        flexDirection: 'row',
    },

    icon: {
        width: 30,
        height: 30,
        marginTop: 20,
    },
    info: {
        fontSize: 18,
        marginTop: 20,
        color: "#FFFFFF",
    },
    item2: {
        alignItems: "center",
        backgroundColor: "white",
        flexGrow: 1,
        padding: 20,
        borderRadius: 15,
        elevation: 4,
        margin: 25,
        marginTop: 2,

    },
    icon1: {
        color: "#8bd4da",
        fontWeight: '800',
        fontSize: 44,
        position: 'absolute',
        left: 10,
        marginTop: 5,
        bottom: 25// Keep some space between your left border and Image

    },
    text1: {
        color: "#8bd4da",
        fontWeight: '800',
        fontSize: 30
    },
    text2: {
        color: "#8bd4da",
        fontWeight: '800',
        fontSize: 12
    }
});