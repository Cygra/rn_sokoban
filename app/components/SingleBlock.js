import React from 'react'
import { Text, View } from 'react-native'

const content = {
  people: '😁',
  box: '⚽️',
  ok: '✅',
  aim: '❌',
}

export default SingleBlock = ({ type }) =>
  <View style={{
    width: 32,
    height: 32,
    backgroundColor: type === 'wall' ? '#FFBF4C' : '#35A067',
  }}>
    <Text style={{ fontSize: 28 }}>{content[type] || ''}</Text>
  </View>
