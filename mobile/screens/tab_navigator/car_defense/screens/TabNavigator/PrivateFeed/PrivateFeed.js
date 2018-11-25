import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  Text,
  View,
  StyleSheet,
  ScrollView,
  RefreshControl,
  Image,
  TouchableOpacity
} from 'react-native';
import { NOTIFICATIONS_API } from '../const/Const'


export default class Feed extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      loading: true,
      height: 135,
      id: '',
      user: '',
    };
  }


  async componentDidMount() {
    const { state } = this.props.navigation;
    this.state.id = state.params ? (state.params.user.id ? state.params.user.id : state.params.user.user_id) : undefined;
    this.state.user = state.params ? (state.params.user.first_name ? state.params.user.first_name : state.params.user.username) : undefined;
    let url = NOTIFICATIONS_API + `/notifications/?ordering=-id&token=` + this.state.id

    return fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          loading: false,
          dataSource: responseJson,
        }, function () {

        });

      })
      .catch((error) => {
        console.error(error);
      });
  }

  _onRefresh = () => {
    this.setState({ refreshing: true });
    this.componentDidMount().then(() => {
      this.setState({ refreshing: false });
    });
  }

  _height = (height) => {
    if (height === 400) {
      this.state.height = 135
      this.setState({ refreshing: true });
      this.componentDidMount().then(() => {
        this.setState({ refreshing: false });
      });
    }
    else {
      this.state.height = 400
      this.setState({ refreshing: true });
      this.componentDidMount().then(() => {
        this.setState({ refreshing: false });
      });
    }
  }

  render() {

    if (!this.state.loading) {
      return (
        <View style={{ backgroundColor: '#00ACC1', flex: 1 }}>
          <ScrollView
            style={styles.item}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this._onRefresh}
              />
            }
          >
            <FlatList
              data={this.state.dataSource}
              renderItem={({ item }) => {
                return (
                  <View style={styles.item2}>
                    <Text style={styles.text1}>{item.title}</Text>
                    <Text style={styles.text}>{item.date} às {item.time}</Text>
                    <TouchableOpacity
                      onPress={() => { this._height(this.state.height) }}
                    >
                      <Image source={{ uri: item.image }}
                        style={{ height: this.state.height }} />
                    </TouchableOpacity>
                    <View style={{ marginTop: 10 }}>
                      <Text style={styles.text2}>{item.message}</Text>
                    </View>
                  </View>
                );
              }}
              keyExtractor={({ id }, index) => id.toString()}

            />
            <View style={styles.item2}>
              <Text style={styles.text1}>Olá {this.state.user}, seja bem Vindo!</Text>
              <View style={{ marginTop: 10 }}>
                <Text style={styles.text2}>Cadastre a placa do seu veículo para poder receber novas notificações.</Text>
              </View>
            </View>
          </ScrollView>
        </View>
      );
    }
    else {
      return (
        <View style={{ backgroundColor: '#00ACC1', flex: 1 }}>
          <ScrollView>
            <View style={styles.item2}>
              <Text style={styles.text1}>Olá {this.state.user}, seja bem Vindo!</Text>
              <View style={{ marginTop: 10 }}>
                <Text style={styles.text2}>Cadastre a placa do seu veículo para poder receber novas notificações.</Text>
              </View>
            </View>
            <View style={styles.container2}>
              <View
                style={[StyleSheet.absoluteFill, styles.maybeLoading]}>
                <ActivityIndicator
                  size={60}
                  color="white"
                />
              </View>
            </View>
          </ScrollView>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  item: {
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1
    },
    elevation: 4,
    marginTop: 20,
    marginBottom: 5
  },
  text: {
    color: "#B2EBF2",
    fontWeight: '600'
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
  container2: {
    paddingTop: "75%",
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
    backgroundColor: "white",
    flexGrow: 1,
    padding: 20,
    borderRadius: 15,
    elevation: 4,
    margin: 25,
    marginTop: 20,

  },
  icon1: {
    color: "#B2EBF2",
    fontWeight: '800',
    fontSize: 44,
    position: 'absolute',
    left: 10,
    marginTop: 5,
    bottom: 25// Keep some space between your left border and Image

  },
  text1: {
    color: "#26C6DA",
    fontWeight: '800',
    fontSize: 30
  },
  text2: {
    color: "#26C6DA",
    fontWeight: '800',
  },
  maybeLoading: {
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0)',
    justifyContent: 'center',
  },
});