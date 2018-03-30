import React from "react";
import { Header } from "react-native-elements";
import { View } from 'react-native';


const Heaader = () => {

    return (<Header
        statusBarProps={{ barStyle: 'light-content', showHideTransition: 'slide' }}
        centerComponent={{ text: 'Accueil', style: { color: '#fff' } }}
        outerContainerStyles={{ backgroundColor: '#3D6DCC' }}
        innerContainerStyles={{ justifyContent: 'space-around', }}
    />);        

}

export {Heaader};