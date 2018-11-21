
import { TextField } from 'react-native-material-textfield';
import { Constants, ImagePicker, Permissions } from 'expo';
import React, { Component } from 'react';
import {
  ActivityIndicator,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Image,
  KeyboardAvoidingView,
  Picker,
  TouchableHighlight
} from 'react-native';
import { NOTIFICATIONS_API } from './tab_navigator/car_defense/screens/TabNavigator/const/Const'
import { Icon } from "native-base";


export default class PrivateNotifications extends Component {

  constructor(props) {
    super(props);

    this.plateRef = this.updateRef.bind(this, 'plate');
    this.messageRef = this.updateRef.bind(this, 'message');
    this.onFocus = this.onFocus.bind(this);

    this.state = {
      title: 'Notificação',
      plate: '',
      message: '',
      image: null,
      uploading: false,
    }
  }
  updateTitle = (title='') => {
    this.setState({ title: title })
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
    ['message']
      .map((text) => ({ text, ref: this[text] }))
      .forEach(({ text, ref }) => {
        if (ref && ref.isFocused()) {
          this.setState({ [text]: words });
        }
      });
  }

  // onSubmitFirstName() {
  //   this.lastname.focus();
  // }

  onPressButton = () => {
    let errors = {};
    const url = NOTIFICATIONS_API + '/send_push_message/' //function send_push_message url
    let errorPlate = false;
    let errorMessage = false;
    const { state } = this.props.navigation;
    var id = state.params ? (state.params.user.id ? state.params.user.id : state.params.user.user_id) : undefined;
   
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

    ['message']
      .forEach((text) => {
        let value = this[text].value();

        if (!value) {
          errors[text] = 'Campo obrigatório.';
          errorMessage = true;
        } else {
          if ('message' === text && value.length < 5) {
            errors[text] = 'Forneça mais detalhes do ocorrido.';
            errorMessage = true;
          }
        }
      });

    if (errorPlate == false && errorMessage == false) {
      let notification = JSON.stringify({
        sender_id: id,
        title: this.state.title,
        plate: this.state.plate,
        message: this.state.message,
        image: this.state.image
      })

      console.log(notification);

      fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: notification
      }).then(response => { return response.json() }
      ).then(jsonResponse => {
        Alert.alert(jsonResponse)
        if (jsonResponse == "Notificação enviada!") {
          this.props.navigation.goBack()
        }
      }
      ).catch(error => {
        console.log(error)
        Alert.alert("Veículo não cadastrado!")
      })
    }
    this.setState({ errors });
  }

  updateRef(text, ref) {
    this[text] = ref;
  }

  render() {
    let { image } = this.state;
    let { errors = {}, ...data } = this.state;
    let { plate = 'text' } = data;
    let { message = 'text' } = data;

    return (
      <View style={{ backgroundColor: '#00ACC1', flex: 1 }}>
        <KeyboardAvoidingView behavior="position">
          <ScrollView>
            <View style={styles.container}>
              <View style={styles.header}>
                <View style={styles.headerContent}>
                  <Image style={styles.avatar}
                    source={require('../images/oie_transparent.png')}
                  />
                </View>
              </View>
              <View style={styles.borderContainer}>
                <View style={styles.border}>
                  <Picker
                    selectedValue={this.state.title}
                    onValueChange={this.updateTitle}
                    mode="dropdown"
                    style={{ color: "#26C6DA", backgroundColor: 'white' }}
                  >
                    <Picker.Item label="Clique para selecionar o tipo de notificação" value="Outro" />
                    <Picker.Item label="Vidro aberto" value="Vidro aberto" />
                    <Picker.Item label="Farol aceso" value="Farol aceso" />
                    <Picker.Item label="Pneu furado" value="Pneu furado" />
                    <Picker.Item label="Alarme disparado" value="Alarme disparado" />
                    <Picker.Item label="Local estacionado" value="Local estacionado" />
                  </Picker>
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
                    placeholderTextColor="white"
                    inputContainerStyle={{ marginHorizontal: 20 }}
                    labelPadding={50}
                  />
                  <TextField
                    ref={this.messageRef}
                    value={data.message}
                    autoCorrect={false}
                    enablesReturnKeyAutomatically={true}
                    onFocus={this.onFocus}
                    onChangeText={(message) => this.setState({ message })}
                    maxLength={50}
                    // onChangeText={this.onChangeText}
                    // onSubmitEditing={this.onSubmitMessage}
                    returnKeyType='next'
                    label='Detalhes'
                    tintColor="white"
                    error={errors.message}
                    textColor="white"
                    placeholderTextColor="white"
                    inputContainerStyle={{ marginHorizontal: 20 }}
                  />
                  <View style={styles.alternativeLayoutButtonContainer}>
                    <TouchableOpacity
                      color="#B2EBF2"
                      onPress={this._takePhoto}
                      containerViewStyle={{ width: '10%' }}
                    >
                      <Icon
                        type='FontAwesome'
                        name="camera"
                        style={{ color: "#26C6DA" }}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      color="#B2EBF2"
                      onPress={this._pickImage}
                      containerViewStyle={{ width: '10%' }}
                    >
                      <Icon
                        type='FontAwesome'
                        name="image"
                        style={{ color: "#26C6DA" }}
                      />
                    </TouchableOpacity>
                  </View>
                  {this._maybeRenderImage()}
                  {this._maybeRenderUploadingOverlay()}
                  <View style={styles.container1}>
                    <TouchableOpacity
                      style={styles.button3}
                      color="#B2EBF2"
                      onPress={this.onPressButton}
                      containerViewStyle={{ width: '40%' }}
                    >
                      <Text style={{ color: '#26C6DA', fontWeight: '800' }} >Enviar</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    );
  }

  _maybeRenderUploadingOverlay = () => { //done
    if (this.state.uploading) {
      return (
        <View
          style={styles.maybeRenderUploading}>
          <ActivityIndicator color="#313869" size="large" />
        </View>
      );
    }
  };

  _maybeRenderImage = () => { //done
    let {
      image
    } = this.state;

    if (!image) {
      return;
    }

    // onPress={this._copyToClipboard}
    // onLongPress={this._share}

    return (
      <View
        style={styles.maybeRenderContainer}>
        <View
          style={styles.maybeRenderImageContainer}>
          <Image source={{ uri: image }} style={styles.maybeRenderImage} />
        </View>
      </View>
    );
  };

  _share = () => {
    Share.share({
      message: this.state.image,
      title: 'Check out this photo',
      url: this.state.image,
    });
  };

  _copyToClipboard = () => {
    Clipboard.setString(this.state.image);
    alert('Copied image URL to clipboard');
  };

  _takePhoto = async () => { //Done
    const {
      status: cameraPerm
    } = await Permissions.askAsync(Permissions.CAMERA);

    const {
      status: cameraRollPerm
    } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    // only if user allows permission to camera AND camera roll
    if (cameraPerm === 'granted' && cameraRollPerm === 'granted') {
      let pickerResult = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
      });

      this._handleImagePicked(pickerResult);
    }
  };

  _pickImage = async () => {
    const {
      status: cameraRollPerm
    } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    // only if user allows permission to camera roll
    if (cameraRollPerm === 'granted') {
      let pickerResult = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,

      });

      this._handleImagePicked(pickerResult);
    }
  };

  _handleImagePicked = async pickerResult => {
    let uploadResponse, uploadResult;

    try {
      this.setState({
        uploading: true
      });

      if (!pickerResult.cancelled) {
        uploadResponse = await uploadImageAsync(pickerResult.uri);
        uploadResult = await uploadResponse.json();

        console.log(uploadResult.image)

        this.setState({
          image: uploadResult.image
        });
      }
    } catch (e) {
      console.log({ uploadResponse });
      console.log({ uploadResult });
      console.log({ e });
      alert('Falha de Upload, tente novamente.');
    } finally {
      this.setState({
        uploading: false
      });
    }
  };
}

async function uploadImageAsync(uri) {
  let apiUrl = NOTIFICATIONS_API + '/notificationsimage/';

  // Note:
  // Uncomment this if you want to experiment with local server
  //
  // if (Constants.isDevice) {
  //   apiUrl = `https://your-ngrok-subdomain.ngrok.io/upload`;
  // } else {
  //   apiUrl = `http://localhost:3000/upload`
  // }

  let uriParts = uri.split('.');
  let fileType = uriParts[uriParts.length - 1];

  let formData = new FormData();
  formData.append('image', {
    uri,
    name: `photo.${fileType}`,
    type: `image/${fileType}`,
  });

  console.log(uri)

  let options = {
    method: 'POST',
    body: formData,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
  };
  return fetch(apiUrl, options);
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 16,
    paddingRight: 16,
    flex: 1,
    marginBottom: 20
  },
  text: {
    paddingTop: 16,
    color: "#B2EBF2",
    fontWeight: 'bold',
  },
  alternativeLayoutButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingTop: 4,
    paddingRight: 4,
    marginTop: 20
  },
  button: {
    backgroundColor: "white",
    borderRadius: 15,
    height: 30,
    width: 190,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  button2: {
    backgroundColor: "white",
    borderRadius: 15,
    height: 40,
    width: 120,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  button3: {
    backgroundColor: "white",
    borderRadius: 15,
    height: 40,
    width: 120,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  container1: {
    paddingTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    bottom: 12
  },
  header: {
    marginTop: 25,
  },
  maybeRenderUploading: {
    paddingTop: 8,
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.0)',
    justifyContent: 'center',
  },
  maybeRenderContainer: {
    width: '100%',
    height: '39%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
    elevation: 2,
    marginTop: 10,
    shadowColor: 'rgba(0,0,0,1)',
    shadowOpacity: 0.2,
    shadowOffset: {
      height: 4,
      width: 4,
    },
    shadowRadius: 5
  },
  maybeRenderImageContainer: {
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
    overflow: 'hidden',
  },
  maybeRenderImage: {
    height: 200,
    width: 310,
  },
  avatar: {
    width: 130,
    height: 130,
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    color: "#B2EBF2",
    fontWeight: '800',
  },
  headerContent: {
    padding: 30,
    alignItems: 'center',
  },
  input: {
    marginBottom: 5,
    paddingLeft: 10,
    paddingRight: 10
  },
  border: {
    borderWidth: 5,
    borderRadius: 15,
    borderColor: "white",
    backgroundColor: '#B2EBF2',
  },
  borderContainer: {
    paddingBottom: 20,
    marginBottom: 20
  }
});
