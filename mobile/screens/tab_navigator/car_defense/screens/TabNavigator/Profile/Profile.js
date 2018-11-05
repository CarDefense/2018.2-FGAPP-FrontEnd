import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    FlatList,
    ScrollView,
    RefreshControl
} from 'react-native';
import { CAR_API } from '../const/Const'

export default class UserProfileView extends Component {

    constructor(props) {
        super(props);

        this.state = {
            refreshing: false
        };
    }

    getCar = () => {
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

    async componentDidMount() {
        this.getCar();
    }

    _onRefresh = () => {
        this.setState({ refreshing: true });
        this.componentDidMount().then(() => {
            this.setState({ refreshing: false });
        });
    }

    render() {
        const { state } = this.props.navigation;
        var user = state.params ? (state.params.user.username ? state.params.user.username : state.params.user.username) : undefined;


        return (
            <View style={{ flex: 1 }}>
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

                <ScrollView
                    // style={styles.body}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this._onRefresh}
                        />
                    }
                >
                    <FlatList
                        style={{ backgroundColor: '#8bd4da' }}
                        data={this.state.dataSource}
                        renderItem={({ item }) => {
                            return (
                                <View style={styles.item2}>
                                    <Text style={styles.text1}>Placa = {item.plate}</Text>
                                    <Text style={styles.text1}>Modelo = {item.model}</Text>
                                    <Text style={styles.text1}>Cor = {item.color}</Text>
                                </View>

                            );
                        }}
                        keyExtractor={({ id }, index) => id.toString()}
                    />
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
        fontWeight: '500',
        marginTop: 30,
        marginBottom: 15
    },
    body: {
        backgroundColor: "#778899",
        height: 500,
        alignItems: 'center',
    },
    item: {
        flexDirection: 'row',
    },
    infoContent: {
        flex: 1,
        alignItems: 'flex-start',
        paddingLeft: 5
    },
    iconContent: {
        flex: 1,
        alignItems: 'flex-end',
        paddingRight: 5,
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
        backgroundColor: "#ffffff",
        flexGrow: 1,
        margin: 4,
        padding: 20,
        shadowColor: "#000000",
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 1
        },
        elevation: 4
    },
    text1: {
        color: "#8bd4da",
        fontWeight: '800',
        fontSize: 14
    }
});