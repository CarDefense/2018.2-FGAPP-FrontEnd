import React, { Component } from "react";
import { TextField } from 'react-native-material-textfield';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Alert, Image, RefreshControl } from 'react-native';
import { CAR_API } from '../const/Const'
import { Icon } from "native-base";


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
      var id = state.params ? (state.params.user.id ? state.params.user.id : state.params.user.user_id) : undefined;

      const url = CAR_API + '/validate_car/' //cars db models url


      let car = JSON.stringify({
        id_token: id,
        plate: this.state.plate,
        model: this.state.model,
        color: this.state.color
      })

      console.log(car)

      fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: car
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
    const { state } = this.props.navigation;
    var user = state.params ? (state.params.user.name ? state.params.user.name : state.params.user.username) : undefined;


    return (
      <View style={{ backgroundColor: "#8bd4da", flex: 1 }}>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Image style={styles.avatar}
              source={{ uri: 'http://cardefense2.eastus.cloudapp.azure.com:8002/media/ssssssssssssssssssssssssssss.png' }}
            />
            <Text style={styles.name}>Olá, {user}! Cadastre seus carros!</Text>
          </View>
        </View>
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
          tintColor="white"
          underlineColorAndroid="transparent"
          maxLength={8}
          autoCapitalize="characters"
          error={errors.plate}
          textColor="white"
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
          tintColor="white"
          textColor="white"
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
          tintColor="white"
          textColor="white"

        />
        <View style={styles.container1}>
          <TouchableOpacity
            style={styles.button}
            color="white"
            onPress={this.onPressButton}
            containerViewStyle={{ width: '40%' }}
          >
            <Text style={{ color: '#8bd4da', fontWeight: '800', fontSize: 15 }} >Cadastrar</Text>
          </TouchableOpacity>
          {/* {this.state.registered ? <Text style={{ flexDirection: 'row', justifyContent: 'center', color: '#5c68c3', marginTop: 20 }}>{this.state.registerMessage}</Text> : null } */}

        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 16,
    paddingRight: 16
  },
  container1: {
    marginTop: 13,
    flexDirection: 'row',
    justifyContent: 'center'
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
    backgroundColor: "white",
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
  },
  avatar: {
    width: 170,
    height: 170,
    borderRadius: 63,
    borderWidth: 7,
    borderColor: "white",
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    color: "white",
    fontWeight: '800',
  },
  headerContent: {
    padding: 30,
    alignItems: 'center',
  },
  box: {
    color: 'white'
  },
  header: {
    backgroundColor: "#8bd4da",
  },
  userInfo: {
    fontSize: 15,
    color: "white",
    fontWeight: '800',
    marginTop: 30,
    marginBottom: 15
},
});
