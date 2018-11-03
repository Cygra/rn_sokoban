import React, { Component } from 'react'
import { Text, View } from 'react-native'
import Index from './app/index'

export default class App extends Component {
  state = { showInit: true }

  render = () => this.state.showInit
    ? <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
      }}>
        <Text style={{
          fontSize: 32,
          textAlign: 'center',
          margin: 10,
        }}>
          Welcome to SOKOBAN!
        </Text>
        <Text style={{ fontSize: 24 }}>To get started, click&nbsp;
          <Text
            style={{
              color: '#F15B50',
              fontWeight: 'bold',
            }}
            onPress={() => this.setState({showInit: !this.state.showInit})}
          >
            HERE!
          </Text>
        </Text>
      </View>
    : <Index />
}
