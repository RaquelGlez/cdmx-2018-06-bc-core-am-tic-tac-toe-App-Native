import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class Header extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
        Tic Tac Toe
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 50,
    backgroundColor: 'yellow',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  title: {
    height: 100,
    color:'black',
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  }
});
