import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, Button } from 'react-native';
import { MaterialCommunityIcons as Icon } from 'react-native-vector-icons'

import Header from './Header'

export default class App extends React.Component {

  constructor(props){
    super(props);
    
    this.state = {
      gameState: [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
      ],
      currentPlayer: 1,
    }
  }

  componentDidMount (){
    this.initializeGame();
  }

  initializeGame = () => {
    this.setState({gameState:
      [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
      ],
      currentPlayer: 1,
    });
  }

  //Para identificar al ganador; Devuelve 1 si el jugador 1 ganó, -1 si el jugador 2 ganó o 0 si nadie ha ganado

  getWinner = () => {
    const NUM_TITLES = 3;
    var arr = this.state.gameState;
    var sum;

    //revisando renglones
    for(var i=0; i<NUM_TITLES; i++){
      sum = arr[i][0]+ arr[i][1] + arr[i][2];
      if (sum ==3){return 1;}
      else if (sum == -3){ return -1;}
    }

    //revisando columnas
    for(var i=0; i<NUM_TITLES; i++){
      sum = arr[0][i] + arr[1][i] + arr[2][i];
      if (sum ==3){return 1;}
      else if (sum == -3){ return -1;}
    }

    //revisando las diagonales
    sum = arr[0][0]+arr[1][1]+arr[2][2];
    if (sum ==3){return 1;}
    else if (sum == -3){ return -1;}

    sum = arr[2][0]+arr[1][1]+arr[0][2];
    if (sum ==3){return 1;}
    else if (sum == -3){ return -1;}

    //cuando no hay ganador
    return 0;
  }

  onTitlePres = (row, col) => {
    //evitar seleccionar otro title una vez jugado
    var value = this.state.gameState[row][col];
    if (value !== 0){ return; }

    let currentPlayer = this.state.currentPlayer;
    
    // para un jugador, imprime las x
    let arr = this.state.gameState.slice();
    arr[row][col] = currentPlayer;
    this.setState({gameState: arr});

    //para otro jugador
    let nextPlayer = (currentPlayer == 1) ? -1 : 1;
    this.setState({currentPlayer: nextPlayer});

    //notificando al ganador
    var winner = this.getWinner();
    if (winner == 1){
      Alert.alert("El jugador 1 es el ganador");
      this.initializeGame();
    } else if (winner == -1){
      Alert.alert("El jugador 2 es el ganador");
      this.initializeGame();
    }
  }

  onNewGamePress =()=> {
    this.initializeGame();
  }

  renderIcon = (row,col) => {
    let value = this.state.gameState[row][col];
    switch (value) 
    {
      case 1: return <Icon name="close" style = {styles.titleX} /> 
      case -1: return <Icon name="circle-outline" style = {styles.titleO} />
      default: return <View />
    }
  }


  render() {
    return (
      <View style={styles.container}>
        <Header />
        <View style={{flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
          <TouchableOpacity onPress={() => this.onTitlePres(0, 0)} style={[styles.title, {borderLeftWidth:0, borderTopWidth: 0}]}>
            {this.renderIcon(0, 0)}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onTitlePres(0, 1)} style={[styles.title, {borderTopWidth: 0}]}>
            {this.renderIcon(0, 1)}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onTitlePres(0, 2)} style={[styles.title, {borderTopWidth: 0, borderRightWidth: 0}]}>
            {this.renderIcon(0, 2)}
          </TouchableOpacity>
        </View>

        <View style={{flexDirection: "row"}}>
          <TouchableOpacity onPress={() => this.onTitlePres(1, 0)} style={[styles.title, {borderLeftWidth:0}]}>
            {this.renderIcon(1, 0)}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onTitlePres(1, 1)} style={[styles.title, {}]}>
            {this.renderIcon(1, 1)}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onTitlePres(1, 2)} style={[styles.title, {borderRightWidth: 0}]}>
            {this.renderIcon(1, 2)}
          </TouchableOpacity>
        </View>

        <View style={{flexDirection: "row"}}>
          <TouchableOpacity onPress={() => this.onTitlePres(2, 0)} style={[styles.title, {borderLeftWidth:0, borderBottomWidth: 0}]}>
            {this.renderIcon(2, 0)}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onTitlePres(2, 1)} style={[styles.title, {borderBottomWidth: 0}]}>
            {this.renderIcon(2, 1)}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onTitlePres(2, 2)} style={[styles.title, {borderBottomWidth: 0, borderRightWidth: 0}]}>
            {this.renderIcon(2, 2)}
          </TouchableOpacity>
        </View>
        
        <View style={{paddingTop: 40}} />
        <Button title="Nuevo juego" onPress={this.onNewGamePress} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    borderWidth: 10,
    width: 100,
    height: 100,
  },

  titleX: {
    color: "red",
    fontSize: 60,
    // flex:1,
    // alignItems: "center",
    // justifyContent: "center",
  },

  titleO: {
    color: "green",
    fontSize: 60,
    // flex:1,
    // alignItems: "center",
    // justifyContent: "center",
  }
});
