import React, { Component } from 'react';
import {
  TouchableOpacity,
  View,
  ActivityIndicator,
  Text,
  Alert,
  StyleSheet,
  AppRegistry,
  TextInput,
  Button,
  FlatList,
} from 'react-native';
import Field from './components/Field';
import { PROFILE_API } from './tab_navigator/car_defense/screens/TabNavigator/const/Const'

export default class App extends Component {

  constructor(props) {
      super(props);
      this.state = {
        username: '', 
        password: ''
      };
  }

  _onPressButton = async () => {

    var registration_path = PROFILE_API + '/users/';
      fetch(registration_path,{
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
        'username': this.state.username,
        'password': this.state.password
      }),
  })
  .then((response) => response.json())
  .then((responseJson) => {
    console.log(responseJson);
    // //Campo de username
    // if (responseJson.username != undefined){
    //   this.setState({ username_field_alerts: responseJson.username})
    //   this.setState({ username_field_is_bad: true })
    // }
    // else{
    //   this.setState({ username_field_alerts: ['']})
    //   this.setState({ username_field_is_bad: false })
    // }
    // //Campo de password
    // if (responseJson.password != undefined){
    //   this.setState({ password_field_alerts: responseJson.password})
    //   this.setState({ password_field_is_bad: true })
    // }
    // else{
    //   this.setState({ password_field_alerts: ['']})
    //   this.setState({ password_field_is_bad: false })
    // }
    // //Sem campo
    // if (responseJson.non_field_errors != undefined){
    //   this.setState({ non_field_alert: responseJson.non_field_errors})
    // }
    // else{
    //   this.setState({ non_field_alert: ['']})
    // }
    // //Sucesso
   if (responseJson.token != undefined ||
       responseJson.key != undefined){
        Alert.alert("Conta criada com sucesso!");
        this.props.navigation.navigate('WelcomeScreen')
      }
   })

   .catch( err => {
     if (typeof err.text === 'function') {
       err.text().then(errorMessage => {
         this.props.dispatch(displayTheError(errorMessage))
       });
     } else {
       Alert.alert("Erro na conexão.");
       console.log(err)
     }
   });
  }

  render(){
    return(
     <View style={{paddingTop: 50, paddingLeft: 30 , paddingRight: 30}}>
     <Text> Cadastro </Text>
     <View style={{height: 20}} />

       <Field
        placeholder={"username"}
        badInput={this.state.username_field_is_bad}
        fieldAlert={this.state.username_field_alerts}
        keyExtractor={'username'}
        onChangeText={(username) => this.setState({username})}
       />

       <Field
        placeholder={"Senha"}
        badInput={this.state.password_field_is_bad}
        fieldAlert={this.state.password_field_alerts}
        keyExtractor={'password'}
        onChangeText={(password) => this.setState({password})}
        secureTextEntry
       />

       <Button
             onPress={this._onPressButton}
             title="Cadastro"
       />
       <View style={{height: 20}} />
       <FlatList
           data={this.state.non_field_alert}
           renderItem={({item}) => <Text style ={{color: 'red'}}>{item}</Text>}
           keyExtractor={item => 'non_field_errors'}
         />

  </View>
    );
  }
}
