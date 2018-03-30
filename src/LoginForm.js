import React, { Component } from "react";
import { StyleSheet, View,Text } from "react-native";
import { Buttton, Heaader, Card, CardItem, Input } from "./composant";
import { connect } from "react-redux";
import { loginUser } from "./actions";
import { Spinner } from "native-base";


class LoginForm extends Component {

    constructor() {
        super();
        this.state = {
            username: '',
            password: ''
        };
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.user){
            this.props.navigation.navigate('Comparaison');
        }
    }


    _onLoginPressed(){
        const{ username,password} = this.state;
        this.props.loginUser({username,password});
    }
    _renderButton(){
        if(this.props.loading){
            return <Spinner/>
        }
        return(
            <Buttton title='se connecter' onPress= {this._onLoginPressed.bind(this)} />
        );
    }

    _renderConnected(){
        if(this.props.user != ''  && this.props.user != null){
            return (
            <Text>You're now Connected </Text>);
        }
        return <Text>Vous n'etes pas connecte</Text>
    }
    render() {
        return (/* 
            <View style={{ flex: 1, backgroundColor: 'orange' }}>
                <View style={{ flex: 1 }}><Heaader /></View>
                <View style={styles.container}><Card style={{ flex: 1 }}>
                    <Form >
                        <View style= {{flexDirection:'row', flex:1,}} >
                            <Label>Username</Label>
                            <Item rounded>
                            <Input /></Item></View>
                        <Item stackedLabel last>
                            <Label>Password</Label>
                            <Input onChangeText={
                                (text) => console.log(text)
                            } />
                        </Item>
                        <Buttton title='Connexion' onPress={() => this.props.navigation.navigate('PagePrincipal')} />
                    </Form></Card></View>
            </View> */
            <View style= {styles.card} >
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
                    <CardItem>{this._renderConnected()}</CardItem>
                    <Text> {this.props.error} </Text>
                    <View style= {{alignItems: 'center',}} >
                        { this._renderButton() }
                    </View>
            {/* 
                    <Text style={styles.errorStyle}>{this.props.error}</Text> */}

                </Card></View>
        );
    }

}


const styles = StyleSheet.create({
    backgroundImage: {
        width: '100%',
        height: '100%',
    },
    container: {
        flex: 2,
    },
    card: {
        flex: 1,
        justifyContent: 'center', 
        /*alignItems: 'center', */
        backgroundColor: '#F5FCFF',
    },
});

const mapStateToProps = state =>{
    return {
        user: state.auth.user,
        loading: state.auth.loading,
        error: state.auth.error
    }
}

export default connect(mapStateToProps,{loginUser})(LoginForm);