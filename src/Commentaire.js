import React, { Component } from "react";
import { Container, Header, Content, Footer, FooterTab, Button, Text, Item, Input } from 'native-base';
import { Col, Row, Grid } from "react-native-easy-grid";
import axios from "axios";

export default class Commentaire extends Component {
  constructor() {
    super();
    this.state = {
      textCommentaire: ''
    }
  };

  _postCommentaire() {
    const textCommentaire = this.state.textCommentaire;
    axios.post('http://10.0.2.2:3000/commentaire/newcommentaire',
      { textCommentaire: textCommentaire, emailUser: 'mohammedoujda16@gmail.com', nomClassement: 'joueur' })
      .then(resp => { alert("Commentaire sauvegardé"); })
      .catch(error => console.error(error));
  }

  render() {
    return (
      <Container>
        <Header />
        <Content >
        </Content>
        <Footer style={{ backgroundColor: '#00000000' }} >
          <Content style={{ flex: 1}}>
            <Grid>
              <Col style={{ backgroundColor: '#00000000', height: 200, flex:4 }}>
                <Item rounded>
                  <Input placeholder='votre commentaire ici' onChangeText={(textCommentaire) => this.setState({ textCommentaire })} />
                </Item>
              </Col>
              <Col style={{ backgroundColor: '#00000000', height: 200, flex:1 }}>
                <Button onPress = {()=> {this._postCommentaire.bind(this)}} rounded  >
                  <Text>Post</Text>
                </Button>
              </Col>
            </Grid>
          </Content>
        </Footer>
      </Container>
    );
  }
}
