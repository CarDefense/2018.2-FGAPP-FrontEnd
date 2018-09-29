import React, { Component } from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, TextInput, Button, Alert } from 'react-native';
import Expo from 'expo'

var tk

async function register() {
  const { status } = await Expo.Permissions.askAsync(
    Expo.Permissions.NOTIFICATIONS
  );
  if (status != 'granted') {
    alert('You need to enable permissions in settings');
    return;
  }

  const token = await Expo.Notifications.getExpoPushTokenAsync();
   tk = token;
  console.log(status, token);
}


export default class RegisterCar extends Component {
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
    this.state = {
      plate: '',
    }
    
  }

  handlePlate = (text) => {
    this.setState({ plate: text })
  }



  onPressButton = () => {
    const url = `http://192.168.0.4:8002/carprofiles/`//car profiles db models url

    let notification = JSON.stringify({
      notification_token: tk,
      plate: this.state.plate,
    })

    fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: notification
    }).then(response => { return response.json() }
    ).then(jsonResponse => {
      console.log(jsonResponse);
    }
    ).catch(error => {
      console.log(error)
    })

  }


  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.header}> Cadastrar carro</Text>
          <TextInput
            style={styles.input}
            placeholderTextColor="#c8cdea"
            placeholder="Placa do carro"
            underlineColorAndroid="transparent"
            onChangeText={this.handlePlate}
          />
        </View>
        <View style={styles.container1}>
          <Button
            title="Cadastrar"
            color="#5c68c3"
            onPress={this.onPressButton}
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
  container1: {
    marginTop: 50
  },
  header: {
    color: '#5c68c3',
    textAlign: 'center',
    fontWeight: '200',
    fontSize: 50,
    marginTop: 25
  },
  header2: {
    color: '#5c68c3',
    textAlign: 'left',
    paddingLeft: 20,
    paddingTop: 35,
    fontWeight: '100',
    fontSize: 30,
  },
  input: {
    width: 300,
    height: 30,
    borderBottomWidth: 1,
    alignSelf: 'center',
    textAlign: 'left',
    borderBottomColor: '#5c68c3',
    marginTop: 70,
  },

});