import React, { Component } from "react";
import BackgroundImage from "./image/BackgroundImage";
import { View, StyleSheet } from "react-native";
import { Input, Card, Text} from "react-native-elements";
import {Buttton} from "./composant";
export default class Accueil extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>

        <View style={styles.container}>
   

          <Card style = {{flex:1}}
             title='Best Or Better'>
             <Text style={{ marginBottom: 10 }}>
             Welcome to our application</Text>
             
             <View style= {{flexDirection: 'row'}} >
             <Buttton onPress={() => this.props.navigation.navigate('Login')} title='Log in' />
             <Text>     </Text>
             <Buttton onPress={() => this.props.navigation.navigate('Signup')} title='Sign up ' />
             </View>
          </Card></View>
          
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    flexDirection: 'row',
  },
  text: {
    textAlign: 'center',
    color: 'white',
    backgroundColor: 'rgba(0,0,0,0)',
    fontSize: 32
  }
});