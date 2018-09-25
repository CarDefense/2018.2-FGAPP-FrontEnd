/*
    Screen provided to present the products already ordered by a certain user.
*/

import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text
} from 'react-native';
import ProductImage from '../components/ProductImage';
import { Container, Header, Textarea, Content, Form, Item, Input, Label, Button } from 'native-base'

class CreateProduct extends Component {
    render() {
        return (
            <View style={styles.container}>
              
              <ProductImage style= { styles.image } productImage='http://www.piniswiss.com/wp-content/uploads/2013/05/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef-300x199.png'>
              </ProductImage>
              <Form style={styles.description}>
                <Item floatingLabel>
                  <Label>Titulo</Label>
                  <Input />
                </Item>
                <Item floatingLabel>
                  <Label>Preco</Label>
                  <Input />
                </Item>
                <Textarea rowSpan={2} underline placeholder="Description" />
              </Form>
              <View style={styles.buttonContainer}>
                <Button style={{justifyContent: 'center', height: 40, width: 100}} danger><Text style={{color: 'white'}}> CANCELAR </Text></Button>
                <Button style={{justifyContent: 'center', height: 40, width: 100}} success><Text style={{color: 'white'}}> SALVAR </Text></Button>
              </View>
              
            </View>
        );
    }
}
export default CreateProduct;

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#171717',
        flex: 1
    },
    image: {
      width: '100%',
      height: '30%',
    },
    description: {
      flex: 1,
      height: '35%',
      width: '95%',
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      paddingBottom: 10,
    },
});
