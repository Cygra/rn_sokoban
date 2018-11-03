
import React from 'react'
import { View, TouchableOpacity, Text } from 'react-native'

const em = {
  up: '⬆️',
  dn: '⬇️',
  lf: '⬅️',
  rt: '➡️',
  mid: '⭕️',
}

export default ControlButton = ({ onBtnClick }) => {
  const btn = dir =>
    <TouchableOpacity onPress={() => onBtnClick(dir)}>
      <Text style={{ fontSize: 50 }}>{em[dir]}</Text>
    </TouchableOpacity>

  return (
    <View style={{
      marginTop: 120,
      alignItems: 'center',
    }}>
      {btn('up')}
      <View style={{ flexDirection: 'row' }}>
        {btn('lf')}{btn('mid')}{btn('rt')}
      </View>
      {btn('dn')}
    </View>
  )
}
