import React, { Component } from "react";
import { View, StyleSheet} from "react-native";
import { connect } from "react-redux";
import { Text } from "react-native-elements";
import { Spinner } from 'native-base';

import { Buttton,Card,Input, CardItem} from "./composant";
import { signUser } from "./actions";



class Signup extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
            email: ''
        }
    };

    componentWillReceiveProps(nextProps){
        if(nextProps.success){
            this.props.navigation.navigate('Login');
        }
    }
    
    _renderConnected(){
        if(this.props.message != ''  && this.props.message != null)
        return alert(this.props.message);
    }

    _onLoginPressed(){
        const{ username,password, email} = this.state;
        this.props.signUser({username,email,password});
    }
    _renderButton() {
        if (this.props.loading) {
            return <Spinner />
        }
        return (
            <Buttton title='Submit' onPress={this._onLoginPressed.bind(this)}/>
        );
    }

    render() {
        return (
            <View style= {{flex:1, justifyContent: 'center',backgroundColor: '#F5FCFF',}}>
                <Card>

                    <CardItem>
                        <Input
                            label='Username'
                            placeholder='Enter your username'
                            secureTextEntry={false}
                            onChangeText={(username) => this.setState({ username })}
                        />
                    </CardItem>

                    <CardItem>
                        <Input
                            label='Password'
                            placeholder='Enter your Password'
                            secureTextEntry
                            onChangeText={(password) => this.setState({ password })}
                        />
                    </CardItem>
              <CardItem>
              <Input
                            label='Email'
                            placeholder='Enter your Password'
                            secureTextEntry={false}
                            onChangeText={(email) => this.setState({ email })}
                        />
            </CardItem>
            {this._renderConnected()}
                 <View style= {{flex:1,alignItems: 'center',}} >
                 {this._renderButton()}</View>
          </Card>
          </View>
           /*     <View>

              <FormLabel>Username</FormLabel>
                 <FormInput onChangeText={(username) => this.setState({ username })} />
                 <FormLabel>Password</FormLabel>
                 <FormInput onChangeText={(password) => this.setState({ password })} />
                 <FormLabel>Email</FormLabel>
                 <FormInput onChangeText={(email) => this.setState({ email })} />
                 {this._renderConnected()}
                 {this._renderButton()}
            
         </View>*/
        );
    }
}


const mapStateToProps = state =>{
    return {
        success: state.sign.success,
        loading: state.sign.loading,
        message: state.sign.message,
    }
}

export default connect(mapStateToProps, { signUser })(Signup);