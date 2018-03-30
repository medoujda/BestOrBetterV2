import React, { Component } from 'react';
import { Image, Text, StyleSheet,View, ImageBackground } from 'react-native';

export default class BackgroundImage extends Component {

    render() {
        return (
            <ImageBackground source={require('./imageAccueil.jpg')} style={styles.backgroundImage}>
                <View style = {styles.container}> 
                {this.props.children}
                </View>
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    backgroundImage: {
        width: '100%',
        height: '100%',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
   },

});