import React from 'react'
import { View } from 'react-native'
import SingleBlock from './SingleBlock'

export default Blocks = ({ blocks }) =>
  <View>
    {blocks.map((i, j) =>
      <View key={j} style={{ flexDirection: 'row' }}>
        {i.map((m, n) => <SingleBlock type={m} key={n} />)}
      </View>
    )}
  </View>
