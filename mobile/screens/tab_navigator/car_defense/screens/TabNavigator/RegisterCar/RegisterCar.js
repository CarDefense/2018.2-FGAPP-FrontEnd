import React, { Component } from "react";
import { TextField } from 'react-native-material-textfield';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Alert, FlatList, RefreshControl } from 'react-native';
// import Expo from 'expo'
// import { Permissions, Notifications } from 'expo'
import jwt_decode from 'jwt-decode';

// var tk
// async function register() {
//   const { status } = await Expo.Permissions.askAsync(
//     Expo.Permissions.NOTIFICATIONS
//   );
//   if (status != 'granted') {
//     alert('You need to enable permissions in settings');
//     return;
//   }

//   const value = await Expo.Notifications.getExpoPushTokenAsync();
//   tk = value;
//   console.log(status, value);
// }

// async function list() {
//   const { status: existingStatus } = await Permissions.getAsync(
//     Permissions.NOTIFICATIONS
//   );
//   let finalStatus = existingStatus;

//   // only ask if permissions have not already been determined, because
//   // iOS won't necessarily prompt the user a second time.
//   if (existingStatus !== 'granted') {
//     // Android remote notification permissions are granted during the app
//     // install, so this will only ask on iOS
//     const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
//     finalStatus = status;
//   }

//   // Stop here if the user did not grant permissions
//   if (finalStatus !== 'granted') {
//     return;
//   }
//   var value
//   var tk = await Promise
//     .resolve(value = await Notifications.getExpoPushTokenAsync())
//     .then(x => value);
//   return tk;

// }


export default class RegisterCar extends Component {

  constructor(props) {
    super(props);

    this.plateRef = this.updateRef.bind(this, 'plate');
    this.modelRef = this.updateRef.bind(this, 'model');
    this.colorRef = this.updateRef.bind(this, 'color');
    this.onFocus = this.onFocus.bind(this);

    this.state = {
      plate: '',
      model: '',
      color: '',
      refreshing: false
    };
  }

  onFocus() {
    let { errors = {} } = this.state;

    for (let text in errors) {
      let ref = this[text];

      if (ref && ref.isFocused()) {
        delete errors[text];
      }
    }

    this.setState({ errors });
  }

  onChangeText(words) {
    ['plate']
      .map((text) => ({ text, ref: this[text] }))
      .forEach(({ text, ref }) => {
        if (ref && ref.isFocused()) {
          this.setState({ [text]: words });
        }
      });
    ['model']
      .map((text) => ({ text, ref: this[text] }))
      .forEach(({ text, ref }) => {
        if (ref && ref.isFocused()) {
          this.setState({ [text]: words });
        }
      });
    ['color']
      .map((text) => ({ text, ref: this[text] }))
      .forEach(({ text, ref }) => {
        if (ref && ref.isFocused()) {
          this.setState({ [text]: words });
        }
      });
  }

  async componentDidMount() {
    this.setState({ hasError: false, errorMessage: '' })
    const { state } = this.props.navigation;
    var token = state.params ? state.params.token : undefined;
    user = jwt_decode(token)
    let link = 'http://192.168.15.5:8003/car/?token=' + user.user_id

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

  _onRefresh = () => {
    this.setState({ refreshing: true });
    this.componentDidMount().then(() => {
      this.setState({ refreshing: false });
    });
  }


  onPressButton = () => {
    let errors = {};
    let errorPlate = false;

    ['plate']
      .forEach((text) => {
        let value = this[text].value();

        if (!value) {
          errors[text] = 'Campo obrigatório.';
          errorPlate = true;
        } else {
          if ('plate' === text && value.length < 8) {
            errors[text] = 'Placa inválida. Ex.:AAA-0000';
            errorPlate = true;
          }
        }
      });

    ['plate']
      .forEach((text) => {
        let value = this[text].value();

        if (!value) {
          errors[text] = 'Campo obrigatório.';
          errorPlate = true;
        } else {
          if ('plate' === text && value.length < 8) {
            errors[text] = 'Placa inválida. Ex.:AAA-0000';
            errorPlate = true;
          }
        }
      });

    ['model']
      .forEach((text) => {
        let value = this[text].value();
      });

    ['color']
      .forEach((text) => {
        let value = this[text].value();
      });


    if (errorPlate == false) {

      const { state } = this.props.navigation;
      var token = state.params ? state.params.token : undefined;
      user = jwt_decode(token)

      const url = 'http://192.168.15.5:8003/validate_car/' //cars db models url

      let notification = JSON.stringify({
        id_token: user.user_id,
        plate: this.state.plate,
        model: this.state.model,
        color: this.state.color
      })

      console.log(notification)

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
        // this.setState({ registered: true, registerMessage: 'Veículo cadastrado!' })
        Alert.alert('Veículo cadastrado!')
      }
      ).catch(error => {
        console.log(error)
        Alert.alert('Erro ao cadastrar!')
      })
    }
    this.setState({ errors });
  }

  updateRef(text, ref) {
    this[text] = ref;
  }

  render() {

    let { errors = {}, ...data } = this.state;
    let { plate = 'text' } = data;
    let { model = 'text' } = data;
    let { color = 'text' } = data;

    return (
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh}
          />
        }
      >
        <View style={styles.container}>
          <Text style={styles.header}> Cadastro</Text>
          <TextField
            ref={this.plateRef}
            value={data.plate}
            autoCorrect={false}
            enablesReturnKeyAutomatically={true}
            onFocus={this.onFocus}
            onChangeText={(plate) => this.setState({ plate })}
            // onChangeText={this.onChangeText}
            // onSubmitEditing={this.onSubmitPLate}
            returnKeyType='next'
            label='Placa'
            tintColor="#760f9f"
            underlineColorAndroid="transparent"
            maxLength={8}
            autoCapitalize="characters"
            error={errors.plate}
          />
          <TextField
            ref={this.modelRef}
            value={data.model}
            autoCorrect={false}
            enablesReturnKeyAutomatically={true}
            onFocus={this.onFocus}
            onChangeText={(model) => this.setState({ model })}
            // onChangeText={this.onChangeText}
            // onSubmitEditing={this.onSubmitModel}
            returnKeyType='next'
            label='Modelo'
            tintColor="#760f9f"
          />
          <TextField
            ref={this.colorRef}
            value={data.color}
            autoCorrect={false}
            enablesReturnKeyAutomatically={true}
            onFocus={this.onFocus}
            onChangeText={(color) => this.setState({ color })}
            // onChangeText={this.onChangeText}
            // onSubmitEditing={this.onSubmitMessage}
            returnKeyType='next'
            label='Cor'
            tintColor="#760f9f"
          />
        </View>
        <View style={styles.container1}>
          <TouchableOpacity
            style={styles.button}
            color="#5c68c3"
            onPress={this.onPressButton}
            containerViewStyle={{ width: '40%' }}
          >
            <Text style={{ color: 'white' }} >Cadastrar</Text>
          </TouchableOpacity>
          {/* {this.state.registered ? <Text style={{ flexDirection: 'row', justifyContent: 'center', color: '#5c68c3', marginTop: 20 }}>{this.state.registerMessage}</Text> : null } */}

        </View>
        <View style={styles.container1}>
          <FlatList
            data={this.state.dataSource}
            renderItem={({ item }) => {
              return (
                <View style={styles.item2}>
                  <Text style={styles.text1}>{item.plate}</Text>
                </View>

              );
            }}
            keyExtractor={({ id }, index) => id.toString()}
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 16,
    paddingRight: 16
  },
  container1: {
    marginTop: 80,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  header: {
    color: '#760f9f',
    textAlign: 'center',
    fontWeight: '200',
    fontSize: 50,
    marginTop: 25
  },
  header2: {
    color: '#760f9f',
    textAlign: 'left',
    paddingLeft: 20,
    paddingTop: 35,
    fontWeight: '100',
    fontSize: 30,
  },
  button: {
    backgroundColor: "#760f9f",
    borderRadius: 15,
    height: 40,
    width: 120,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
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
    color: "#760f9f",
    fontWeight: '200',
  }
});