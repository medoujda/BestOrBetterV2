import React, { Component } from 'react';
import {
	AppRegistry,
	StyleSheet,
	Text,
	View,
	Image,
	AsyncStorage,
	FlatList,
	Dimensions,

} from 'react-native';


//import Draggable from 'react-native-draggable';
import Draggable from './Draggable';//first, run "npm run source" to get Draggable.js
import customData from './jsontest.json';


export default class Gagnant extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			tabWinner : [],
		}
	


	}

	getWidth() {
	    return {
		width: Dimensions.get('window').width
	    }
	}
	
	componentDidMount(){

		AsyncStorage.getItem('gagnantTab')
		.then(	gagnantTab =>this.saveDate(gagnantTab)
		);

	
	
	}
	
	saveDate(gagnantTab){	
		this.state.tabWinner = JSON.parse(gagnantTab);
		this.forceUpdate();


	
	}

	affichageDesGagnants(){

		if(this.state.tabWinner.length==3){
			return(
				
				<View  style={styles.container}>
					 <Text>	AFFICHAGE DES GAGNANTS </Text> 
					<Text> {this.state.tabWinner[0]}</Text>
					<Text> {this.state.tabWinner[1]}</Text>
					 <Text> {this.state.tabWinner[2]}</Text>

				</View>
			);

		}

	/*	else if(this.state.tabWinner.length==4){
			return(
				
				<View  style={styles.container}>
					<View>  <Text>	AFFICHAGE DES GAGNANTS </Text>   </View>
					<View> <Text> {this.state.tabWinner[0]}</Text>	</View>
					<View> <Text> {this.state.tabWinner[1]}</Text> </View>
					<View> <Text> {this.state.tabWinner[2]}</Text>	</View>
					<View> <Text> {this.state.tabWinner[3]}</Text>	</View>
	
				</View>
			);

		}

		else if(this.state.tabWinner.length==5){
			return(
				
				<View  style={styles.container}>
					<View>  <Text>	AFFICHAGE DES GAGNANTS </Text>   </View>
					<View> <Text> {this.state.tabWinner[0]}</Text>	</View>
					<View> <Text> {this.state.tabWinner[1]}</Text> </View>
					<View> <Text> {this.state.tabWinner[2]}</Text>	</View>
					<View> <Text> {this.state.tabWinner[3]}</Text>	</View>
					<View>  <Text> {this.state.tabWinner[4]}</Text>  </View>
	
				</View>
			);

		}*/

	}
  render() {
    return (
	   <View>
		<View style={[styles.topview, this.getWidth()]}> 
		</View>
	

		{this.affichageDesGagnants()}
	</View>
    );
  }




};


const styles = StyleSheet.create({
	container: {
       flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
	paddingTop : 100,
	  }, 
	 topview: {
	    height : 25,
	    backgroundColor: '#00ccff',
	  },
})
