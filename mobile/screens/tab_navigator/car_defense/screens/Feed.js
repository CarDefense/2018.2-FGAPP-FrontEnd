import React from 'react';
import { FlatList, Text, View, StyleSheet, ScrollView, RefreshControl, Image } from 'react-native';
import { NOTIFICATIONS_API, PROFILE_API } from './TabNavigator/const/Const.js'

var tk

async function register() {
  const { status } = await Expo.Permissions.askAsync(
    Expo.Permissions.NOTIFICATIONS
  );
  if (status != 'granted') {
    alert('You need to enable permissions in settings');
    return;
  }

  const value = await Expo.Notifications.getExpoPushTokenAsync();
  tk = value;
  console.log(status, value);
  
}

export default class Feed extends React.Component {
  componentWillMount() {
    register();
    this.listener = Expo.Notifications.addListener(this.listen);
  }
  componentWillUnmount() {
    this.listener && Expo.Notifications.addListener(this.listen);
  }

  listen = ({ origin, data }) => {
    console.log('cool data', origin, data);
  }

  constructor(props) {
    super(props);
    this.state = { refreshing: false, }
  }

  async componentDidMount() {
    const {state} = this.props.navigation;
    var id = state.params ? (state.params.user.id ? state.params.user.id : state.params.user.user_id ) : undefined;
    
    let profile =  JSON.stringify({
      id_token: id,
      notification_token: tk,
    }) 
    console.log(profile);
    fetch(PROFILE_API + '/set_token/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: profile
    }).then(response => { return response.json() }
    ).then(jsonResponse => {
      console.log(jsonResponse);
    }
    ).catch(error => {
      console.log(error)
    })

    return fetch(NOTIFICATIONS_API + '/emergencynotifications/')
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
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
  render() {
    return (
      <ScrollView style={styles.item}
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
                <Image source={{uri:item.image}}
                  style={{width: 400, height: 200}} />
                <Text style={styles.text}>{item.message}</Text>
              </View>
            );
          }}
          keyExtractor={({ id }, index) => id.toString()}

        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#ffffff",
    margin: 4,
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1
    },
    elevation: 4
  },
  item2: {
    alignItems: "center",
    justifyContent: 'center',
    backgroundColor: "#ffffff",
    flexGrow: 1,
    margin: 4,
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1
    },
    elevation: 4
  },
  text: {
    color: "#540b71",
    fontWeight: '100'
  },
  text1: {
    color: "#540b71",
    fontWeight: 'bold',
  }
});
