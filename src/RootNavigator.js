import React from "react";
import { StackNavigator } from "react-navigation";

import AlgoTri from "./AlgoTri";
import AfficheGagnant from "./Gagnant";
import Accueil from "./Accueil";
import LoginForm from "./LoginForm";
import PagePrincipal from "./PagePrincipal";
import Signup from "./Signup";
import Splash from "./Splash";
import Commentaire from "./Commentaire";


const RootNavigator = StackNavigator({

    // Commentaire: {
    //     screen: Commentaire,
    //     navigationOptions:{
    //         header: null,
    //     }

    // },
    Splash: {
        screen: Splash,
        navigationOptions : {
            header: null,
        }
    },
    Home :{
        screen: Accueil,
        navigationOptions : {
            header: null,
        }
    },
    Signup :{
    screen: Signup,
    navigationOptions : {
        title: 'Signup',
    }

    },
    
    Login :{
        screen: LoginForm,
        navigationOptions : {
            header: null,
        }
    },
    Comparaison :{
        screen: AlgoTri,
        navigationOptions : {
            header: null,
        },
    },
   Gagnant :{
        screen: AfficheGagnant,
        navigationOptions : {
            header: null,
        },
    },
    PagePrincipal:{
        screen: PagePrincipal,
        navigationOptions : {
            title: 'Accueil',
        },
    
        
    }

});

export default RootNavigator;  