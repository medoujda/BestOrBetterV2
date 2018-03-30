import React from "react";
import { View } from "react-native";
import { Button, Text } from 'native-base';
const Buttton = (props) => {

    return (
<View style={{flex:1}}>
<Button onPress= {props.onPress}><Text>{props.title}</Text></Button>
</View>
        /*<Button style={{flex:1}}
            icon={{ name: 'code' }}
            backgroundColor='#03A9F4'
            fontFamily='Lato'
            buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
            title={props.title}
            onPress={props.onPress}
    />*/);


}
export {Buttton};