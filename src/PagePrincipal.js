
import React,{ Component } from 'react';
import { View, StyleSheet, TouchableOpacity,AsyncStorage, Text} from "react-native";
import {Header,Foooter,Heaader} from "./composant";





class PagePrincipal extends Component {
    static navigationOptions = ({ navigation }) => {
        const logoutBtnStyle = { paddingLeft: 10 };
        const { params = {} } = navigation.state;
  
        const headerRight = (
          <TouchableOpacity style={logoutBtnStyle} onPress={params.logout}>
            <Text>Logout</Text>
          </TouchableOpacity>
        );
  
        return { headerRight };
      };
      componentDidMount() {
        this.props.navigation.setParams({ logout: this._logout.bind(this) });
      }

      _logout() {
        AsyncStorage.removeItem('app_token');
        this.props.navigation.navigate('Login');
      }
    render() {
        return (
            <View style={{ flex: 1 }}>
                    
                <View
                    style={{ flex: 1 }} ><Foooter /></View>
            </View>

        );
    }
}

export default PagePrincipal;