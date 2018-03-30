import React, { Component } from 'react';
import {
	Dimensions,
	AppRegistry,
	StyleSheet,
	Text,
	View,
	TextInput,
	Alert,
	Button,
	Image,
	TouchableHighlight,
	TouchableOpacity,
	findNodeHandler,
	Modal,
	AsyncStorage

} from 'react-native';


import axios from "axios"
//import Draggable from 'react-native-draggable';
import Draggable from './Draggable';//first, run "npm run source" to get Draggable.js
import customData from './jsontest.json';


export default class AlgoTri extends Component {


	componentWillMount(){
		axios.get('http://172.30.38.250:3000/elements/image')
		.then(function (response) {
			this.axiosTest(response);
		});
		
	}

	axiosTest(response){
		alert(response);
	}
	
	//Constructeur 
	constructor(props) {
		super(props);

			 
		this.state = {
			source: customData['Pool1'][0]['name'], // src, 1ère image
			source2: customData['Pool1'][1]['name'], // srx, 2ème image
			id : customData['Pool1'][0]['id'], // Id 1ère image
			id2 : customData['Pool1'][1]['id'],// Id 2ème image
			cpt: 2,// cpt qui permet de savoir quelles images doit on comparer
			tabIdGagnant : [],//  array regroupant les id des images gagnantes
			tabsrcGagnant : [],// array regroupant les src des images gagnantes 
			PoolActuelle : 1,// Pool actullement pour la premiere étape du tri
			nbPool : customData['nombrePool'],// nombre de pool que l'on reçoit
			elementRestantAtrier : 0,// nombre d'éléments restant à trier
			choixGagnantStep2 : false,// false à l'initialisation, permet de savoir si on passe à l'étape 2
			tabIdGagnantTemp:[],// Array temporaire pour pouvoir remttre à 0 l'array des ID gagnants
			tabsrcGagnantTemp:[],// Array temporaire pour pouvoir remttre à 0 l'array des src gagnants
			cptStep2 : 1,// Compteur pour l'étape 2
			cptTriDeuxADeuxImg1 : 0, //Correspond à l'image qui reste pour être triée avec toutes les autres
			cptTriDeuxADeuxImg2 : 1, // Correspond à l'image qui change face à l'image 1
			tabIdGagnantOrdre:[],// Array qui contiendra les id des gagnants du tri par ordre de score à la fin du tri. Cette array sera alors renvoyée au BackEnd pour enregistrer le résultat
			tabScoreGagnant:[], // Array contenant le nombre de victoires des images lors du tri deux à deux (derniere étape du tri)
			triDeuxADeux : false, // boolean qui permet de savoir si on est à l'étape de tri deux à deux
			tabDeuxADeuxGagnantTemp : [], // Array temporaire pour trier les gagnants du deux à deux
			nombreDeChoixPossible : 0, // nombre de comparaison réalisation lors du  2 à 2
			cptChoixPossible : 0, //numéro de la comparaison 2 à 2
			gagnant : 0, //permet de savoir quelle image à gagner la comparaison
			cptGagnant : 1, //cpt qui permet de savoir la place de l'élément lors d'un classement dans le localStorage de l'app
			tabTrie : [] //Comporte les éléments du podium triés 
		};


	

	}


	//renvoie la width de l'écran de téléphone
	getWidth() {
	    return {
		width: Dimensions.get('window').width
	    }
	}

	// set la zone pour déposer l'élément
	setDropZoneValues(event){      //Step 1
	    this.setState({
		dropZoneValues : event.nativeEvent.layout
	    });
	}

	//Algorithme qui réalise la comparaison 
	//Recoit l'ID de l'image sélectionnée
	choixGagnant(number){
		
		//test si on est à la dernière étape de tri (deux à deux)
		if(this.state.triDeuxADeux){

			if(number==this.state.id && this.state.cptTriDeuxADeuxImg1<this.state.tabIdGagnantTemp.length-1 && this.state.cptTriDeuxADeuxImg2<this.state.tabIdGagnantTemp.length && this.state.cptChoixPossible<this.state.nombreDeChoixPossible){
				if(this.state.tabScoreGagnant[this.state.cptTriDeuxADeuxImg1]==null){
					this.state.tabScoreGagnant[this.state.cptTriDeuxADeuxImg1] = 1;
					this.state.cptChoixPossible =  this.state.cptChoixPossible +1;
					this.forceUpdate();
				}
				else{
					this.state.tabScoreGagnant[this.state.cptTriDeuxADeuxImg1] = this.state.tabScoreGagnant[this.state.cptTriDeuxADeuxImg1]+1;
					this.state.cptChoixPossible =  this.state.cptChoixPossible +1;
					this.forceUpdate();
				}

				
				
			}

			else if(number==this.state.id2 && this.state.cptTriDeuxADeuxImg1<this.state.tabIdGagnantTemp.length-1 && this.state.cptTriDeuxADeuxImg2<this.state.tabIdGagnantTemp.length && this.state.cptChoixPossible<this.state.nombreDeChoixPossible){
				if(this.state.tabScoreGagnant[this.state.cptTriDeuxADeuxImg2]==null){
					this.state.tabScoreGagnant[this.state.cptTriDeuxADeuxImg2] = 1;
					this.state.cptChoixPossible =  this.state.cptChoixPossible +1;
					this.forceUpdate();
				}
				else{
					this.state.tabScoreGagnant[this.state.cptTriDeuxADeuxImg2] = this.state.tabScoreGagnant[this.state.cptTriDeuxADeuxImg2]+1;
					this.state.cptChoixPossible =  this.state.cptChoixPossible +1;
					this.forceUpdate();
				}
				
			}


			if(this.state.cptTriDeuxADeuxImg2<this.state.tabIdGagnantTemp.length-1 && this.state.cptTriDeuxADeuxImg1<this.state.tabIdGagnantTemp.length){
				this.setState({
					source2: this.state.tabsrcGagnantTemp[this.state.cptTriDeuxADeuxImg2+1],
					id2 : this.state.tabIdGagnantTemp[this.state.cptTriDeuxADeuxImg2+1],
					cptTriDeuxADeuxImg2: this.state.cptTriDeuxADeuxImg2+1,
				});


			}

			else if(this.state.cptTriDeuxADeuxImg1<this.state.tabIdGagnantTemp.length-2){
				this.setState({
					source: this.state.tabsrcGagnantTemp[this.state.cptTriDeuxADeuxImg1+1],
					id : this.state.tabIdGagnantTemp[this.state.cptTriDeuxADeuxImg1+1],
					cptTriDeuxADeuxImg1: this.state.cptTriDeuxADeuxImg1+1,
				});
			}
			if(this.state.nombreDeChoixPossible==this.state.cptChoixPossible){
				if(this.state.tabScoreGagnant[0] == null){
					this.state.tabScoreGagnant[0] = 1;
					this.forceUpdate();
				}
				for(var iter = 1; iter < this.state.nombreDeChoixPossible; iter++){
					if(this.state.tabScoreGagnant[this.state.gagnant]<this.state.tabScoreGagnant[iter]){
						this.state.gagnant=iter;
						this.forceUpdate();					
										
					}
				}

				for(var iter = 0; iter < this.state.nombreDeChoixPossible; iter++){
					if(this.state.tabScoreGagnant[iter]==null){
						this.state.tabScoreGagnant[iter]=0;
						this.forceUpdate();
					
					}
				}
				this.state.tabTrie.push(this.state.tabIdGagnantTemp[this.state.gagnant]);
				this.forceUpdate();	
				Alert.alert(
					"Bravo !",
					"Le gagnant du classement est " + this.state.tabIdGagnantTemp[this.state.gagnant],
								  
					
					[
					   {text: 'Afficher votre TOP ' + this.state.nombreDeChoixPossible + " !", onPress: () => this.triLesGagnants()},
					],
					{ cancelable: false }
					)
			}
		}

		else{
			//On regarde si on a réalisé la première étape de la comparaison
			if(this.state.choixGagnantStep2){	
			
				//Test pour savoir quelle image a gagné et on rempli le tableau des gagnants

				if(number==this.state.id2 && this.state.cpt<=(this.state.tabsrcGagnant.length/2)+1){
					this.setState({
						tabIdGagnantTemp:this.state.tabIdGagnantTemp.concat(this.state.tabIdGagnant[this.state.cptStep2 -2]),
						tabsrcGagnantTemp:this.state.tabsrcGagnantTemp.concat(this.state.tabsrcGagnant[this.state.cptStep2 -2]),
						elementRestantAtrier : this.state.elementRestantAtrier + 1,
						cptStep2  : this.state.cptStep2+2,
					
					});
				}

				else if(number==this.state.id && this.state.cpt<=(this.state.tabsrcGagnant.length/2)+1){
				
					this.setState({
						tabIdGagnantTemp:this.state.tabIdGagnantTemp.concat(this.state.tabIdGagnant[this.state.cptStep2-3]),
						tabsrcGagnantTemp:this.state.tabsrcGagnantTemp.concat(this.state.tabsrcGagnant[this.state.cptStep2-3]),
						elementRestantAtrier : this.state.elementRestantAtrier + 1,
						cptStep2  : this.state.cptStep2+2,
				
					});

				}

				// Test s'il reste des éléments à trier 
				//Si oui, on change les éléments à trier
				if(this.state.cpt<=this.state.tabsrcGagnant.length/2){
					this.setState({
						id2 : this.state.tabIdGagnant[this.state.cptStep2],
						source2: this.state.tabsrcGagnant[this.state.cptStep2 ],
						id : this.state.tabIdGagnant[this.state.cptStep2-1],
						source: this.state.tabsrcGagnant[this.state.cptStep2-1],
						cpt : this.state.cpt+1,
					});
			


				}
				//Sinon, on vide les tableaux et on lance triSuivant()
				else{
					this.setState({
						tabIdGagnant:[],
						tabsrcGagnant:[],
					});


					Alert.alert(
						  "Bravo !",
						  "Vous avez fini une étape de tri, il vous reste " + (this.state.elementRestantAtrier+1)+" éléments à trier",
						  
						 [
						 {text: 'Continuer !!', onPress: () => this.triSuivant(number)},
						 ],
						 { cancelable: false }
					)
				
				}

			}

			//Si c'est le premier tour de tri, on effectue cet algorithme
			else{
				//Test pour savoir quelle image a gagné et on rempli le tableau des gagnants

				if(number==this.state.id2 && this.state.cpt<=customData['cpt']){
					this.setState({
						tabIdGagnant:this.state.tabIdGagnant.concat(customData['Pool'+this.state.PoolActuelle][this.state.cpt-1]['id']),
						tabsrcGagnant:this.state.tabsrcGagnant.concat(customData['Pool'+this.state.PoolActuelle][this.state.cpt-1]['name']),
						elementRestantAtrier : this.state.elementRestantAtrier + 1,

					});
				}

				else if(number==this.state.id && this.state.cpt<=customData['cpt']){
					this.setState({
						tabIdGagnant:this.state.tabIdGagnant.concat(customData['Pool'+this.state.PoolActuelle][this.state.cpt-2]['id']),
						tabsrcGagnant:this.state.tabsrcGagnant.concat(customData['Pool'+this.state.PoolActuelle][this.state.cpt-2]['name']),
						elementRestantAtrier : this.state.elementRestantAtrier + 1,
				
					});

				}
			
				//Changement des images à trier
				if(this.state.cpt<=customData['cpt']-1){
					this.setState({
						id2 : customData['Pool'+this.state.PoolActuelle.toString()][this.state.cpt+1]['id'],
						source2: customData['Pool'+this.state.PoolActuelle.toString()][this.state.cpt+1]['name'],
						id : customData['Pool'+this.state.PoolActuelle.toString()][this.state.cpt]['id'],
						source: customData['Pool'+this.state.PoolActuelle.toString()][this.state.cpt]['name'],
						cpt : this.state.cpt+2,
					});
	

				}

				//Si la pool est comparée, on test s'il reste des pools à trier, si oui, on passe à la pool suivante, sinon on passe à l'étape suivante
				if(this.state.cpt>=customData['cpt']){

					if(this.state.PoolActuelle < this.state.nbPool){
						this.changementPool();
					}
					else{

						Alert.alert(
								  "Bravo !",
								  "Vous avez fini l'étape 1, il vous reste " + (this.state.elementRestantAtrier+1)+" éléments à trier",
								  
								  
								  [
								    {text: 'Continuer !!', onPress: () => this.triSuivant()},
							
								  ],
								  { cancelable: false }
								)
					}
				}
			}
		}
	}

	//Fonction qui va trier les gagnants et les mettre dans un tableau 
	triLesGagnants(){
		while(this.state.nombreDeChoixPossible>1){
			
			this.state.tabIdGagnantTemp.splice(this.state.gagnant,1);
			this.forceUpdate();
			this.state.nombreDeChoixPossible = this.state.nombreDeChoixPossible-1;
			this.forceUpdate();
			this.state.gagnant = 0;
			this.forceUpdate();
			for(var iter = 1; iter < this.state.nombreDeChoixPossible; iter++){
				if(this.state.tabScoreGagnant[this.state.gagnant]<this.state.tabScoreGagnant[iter]){
					this.state.gagnant = iter;
					this.forceUpdate();
					
					
				}
						
								
			
			}


			this.state.tabTrie.push(this.state.tabIdGagnantTemp[this.state.gagnant]);
			this.forceUpdate();
		}

		
		this.setAsyncStorage(JSON.stringify(this.state.tabTrie));
		//this.sendToDataBase();
		this.props.navigation.navigate('Gagnant');

	}


	setAsyncStorage(test){
		AsyncStorage.setItem('gagnantTab',test);


	}

	/*sendToDataBase(){
		axios.post('/user', {
		   	tab:JSON.stringify(this.state.tabTrie),
		
		  })
		  .then(function (response) {
		    console.log(response);
		  })
		  .catch(function (error) {
		    console.log(error);
		  });
	}*/


	//Fonction qui teste s'il reste plus de 5 éléments à trier ou non.
	// Si oui, on refait un tri de base, où l'on compare un élément avec un autre et on garde le gagnant seulement. 
	// Si non, on fait du tri deux à deux. 

	triSuivant(number){

		
		if(this.state.elementRestantAtrier+1>5){
			if(this.state.tabIdGagnantTemp.length+1>=6){
				this.setState({
					tabIdGagnant:this.state.tabIdGagnant.concat(this.state.tabIdGagnantTemp),
					tabsrcGagnant:this.state.tabsrcGagnant.concat(this.state.tabsrcGagnantTemp),	


				});

			}

			
			this.setState({
				choixGagnantStep2:true,

				
			});
			this.choixGagnantStep2();
		}

		else{
			Alert.alert(
				  "Bravo !",
				  "Vous avez fini les étapes intermédiaires, vous allez maintenant effectuer le TOP des éléments qu'ils vous reste en comparant tous les éléments restant un à un.",
				  
				 [
				    {text: 'Continuer !!', onPress: () => this.triDeuxADeux()},
				 ],
				 { cancelable: false }
			)
		}

	}


	triDeuxADeux(){
		this.setState({
			
			source: this.state.tabsrcGagnantTemp[0],
			source2: this.state.tabsrcGagnantTemp[1],
			id : this.state.tabIdGagnantTemp[0],
			id2 : this.state.tabIdGagnantTemp[1],
			cpt : 2,
			triDeuxADeux : true,
			choixGagnantStep2 :false,
				
			
		});
		
		this.state.nombreDeChoixPossible= this.state.tabIdGagnantTemp.length * (this.state.tabIdGagnantTemp.length-1) / 2;
		
	}

	//Function qui permet de changer de pool lors de l'étape 1
	changementPool(){
		this.setState({
			PoolActuelle : this.state.PoolActuelle+1,
			source: customData['Pool'+(this.state.PoolActuelle+1).toString()][0]['name'],
			source2: customData['Pool'+(this.state.PoolActuelle+1).toString()][1]['name'],
			id : customData['Pool'+(this.state.PoolActuelle+1).toString()][0]['id'],
			id2 : customData['Pool'+(this.state.PoolActuelle+1).toString()][1]['id'],
			cpt : 2,
		
		

			
		});

	}

	//Fonction qui réinitialise les différents attributs pour réaliser la seconde partie du tri 
	choixGagnantStep2(){
		this.setState({

			source: this.state.tabsrcGagnant[0],
			source2: this.state.tabsrcGagnant[1],
			id : this.state.tabIdGagnant[0],
			id2 : this.state.tabIdGagnant[1],
			elementRestantAtrier : 0,
			cpt :2,
			cptStep2:3,
			tabsrcGagnantTemp:[],
			tabIdGagnantTemp:[],

			
		});
	}




	render() {
		return (
			<View>
					
					<View style={[styles.topview, this.getWidth()]}> 
					
									
					</View>

				         <View 
					       style={styles.dropZone}>
					    <Text style={styles.text}>Drop me here!</Text>
					 </View>
					


					<Draggable renderShape='image' 
						imageSource={this.state.source} renderSize={150} offsetX={-20} offsetY={120} 
						longPressDrag={()=>console.log('long press')}
						pressDrag={()=>console.log('press drag')} 
						pressInDrag={()=>console.log('in press')}
						pressOutDrag={()=>console.log('out press')}
						//pressDragRelease={()=>alert(Dragabble.getxy())}
					/>
				

					<TouchableHighlight underlayColor="#ccffff" style={{width:50,height : 50,top : 320,left:250 }} onPress={()=>this.choixGagnant(this.state.id2)}>
					      <Image
					
						style={styles.buttonLike}
						source={require('./img/like.png')}
					      />
					</TouchableHighlight>


					<Draggable renderShape='image' imageSource={this.state.source2} renderSize={150} offsetX={170} offsetY={120} 
						longPressDrag={()=>console.log('long press')}
						pressDrag={()=>console.log('press drag')}
						//pressInDrag={()=>this.callFun()}
						pressOutDrag={()=>console.log('out press')}
					/>

					 <TouchableHighlight underlayColor="#ccffff" style={{width:50,height : 50,top : 270,left:60 }} onPress={()=>this.choixGagnant(this.state.id)}>
						      <Image
							style={styles.buttonLike}
							source={require('./img/like.png')}
						      />
					 </TouchableHighlight>


					<TouchableHighlight
						 style={styles.bouttonAide}
						 onPress={()=>Alert.alert(
						  "Aide !",
						  "Choisissez l'élément préféré en glissant l'image ou en appuyant sur le pouce",
						  [
						    {text: 'OK', onPress: () => console.log('OK Pressed')},
						  ],
						  { cancelable: true }
						)}
					>
						<Text> En savoir plus ! </Text>
					</TouchableHighlight>

			
					
			</View>
		);
	}

}



const styles = StyleSheet.create({
  topview: {
    height : 25,
    backgroundColor: '#00ccff',
  },

  imgBox: {
	height: 20,
	borderWidth: 0.5,
   	borderColor: '#00ccff',
	marginHorizontal : 10,
  },

  bouttonAide: {
	position: 'absolute', 
	bottom: -415,
	alignItems: 'center',
	backgroundColor: '#DDDDDD',
	width : 360,
	padding : 20
  },

  img :{
        width: 150,
	height: 200,
  },
  buttonLike:{
	width:50,
	height : 50,	
  },
    dropZone    : {
        height         : 100,
        backgroundColor:'#2c3e50'
    },
    text        : {
        marginTop   : 25,
        marginLeft  : 5,
        marginRight : 5,
        textAlign   : 'center',
        color       : '#fff'
    }


});
