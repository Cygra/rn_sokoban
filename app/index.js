import React, {Component} from 'react'
import { View } from 'react-native'
import * as ut from './utils'
import Blocks from './components/Blocks'
import ControlButton from './components/ControlButton'


export default class Index extends Component {
  state = {
    current: ut.deepClone(ut.current),
    history: [],
  }

  onBtnClick = dir => {
    let temp = ut.deepClone(this.state.current)
    let nextPos
    switch (dir) {
      case 'up':
        nextPos = temp.style[temp.row - 1][temp.col]
        break
      case 'dn':
        nextPos = temp.style[temp.row + 1][temp.col]
        break
      case 'lf':
        nextPos = temp.style[temp.row][temp.col - 1]
        break
      case 'rt':
        nextPos = temp.style[temp.row][temp.col + 1]
        break
      default:
        break
    }

    if (nextPos === ut.w) {
      // 撞墙了
      return
    } else if ([ut.b, ut.o].includes(nextPos)) {
      // 前方位置是箱子或者ok
      let nextnextPos
      switch (dir) {
        case 'up':
          nextnextPos = temp.style[temp.row - 2][temp.col]
          break
        case 'dn':
          nextnextPos = temp.style[temp.row + 2][temp.col]
          break
        case 'lf':
          nextnextPos = temp.style[temp.row][temp.col - 2]
          break
        case 'rt':
          nextnextPos = temp.style[temp.row][temp.col + 2]
          break
        default:
          break
      }
      if ([ut.w, ut.b, ut.o].includes(nextnextPos)) {
        // 箱子或者ok前边是墙
        return
      } else if(nextnextPos === ut.a) {
        // 箱子或者ok前边是坑
        // 坑变ok，nextPos变人，人变草或坑
        switch (dir) {
          case 'up':
            temp.style[temp.row - 2][temp.col] = ut.o
            temp.style[temp.row - 1][temp.col] = ut.p
            temp.style[temp.row][temp.col] = [ut.a, ut.o].includes(ut.current.style[temp.row][temp.col])
              ? ut.a
              : ut.g
            temp.row = temp.row - 1
            break
          case 'dn':
            temp.style[temp.row + 2][temp.col] = ut.o
            temp.style[temp.row + 1][temp.col] = ut.p
            temp.style[temp.row][temp.col] = [ut.a, ut.o].includes(ut.current.style[temp.row][temp.col])
              ? ut.a
              : ut.g
            temp.row = temp.row + 1
            break
          case 'lf':
            temp.style[temp.row][temp.col - 2] = ut.o
            temp.style[temp.row][temp.col - 1] = ut.p
            temp.style[temp.row][temp.col] = [ut.a, ut.o].includes(ut.current.style[temp.row][temp.col])
              ? ut.a
              : ut.g
            temp.col = temp.col - 1
            break
          case 'rt':
            temp.style[temp.row][temp.col + 2] = ut.o
            temp.style[temp.row][temp.col + 1] = ut.p
            temp.style[temp.row][temp.col] = [ut.a, ut.o].includes(ut.current.style[temp.row][temp.col])
              ? ut.a
              : ut.g
            temp.col = temp.col + 1
            break
          default:
            break
        }
      } else {
        // 箱子或者ok前边是空
        // 空变箱子，nextPos变人，人变草或坑
        switch (dir) {
          case 'up':
            temp.style[temp.row - 2][temp.col] = ut.b
            temp.style[temp.row - 1][temp.col] = ut.p
            temp.style[temp.row][temp.col] = [ut.a, ut.o].includes(ut.current.style[temp.row][temp.col])
              ? ut.a
              : ut.g
            temp.row = temp.row - 1
            break
          case 'dn':
            temp.style[temp.row + 2][temp.col] = ut.b
            temp.style[temp.row + 1][temp.col] = ut.p
            temp.style[temp.row][temp.col] = [ut.a, ut.o].includes(ut.current.style[temp.row][temp.col])
              ? ut.a
              : ut.g
            temp.row = temp.row + 1
            break
          case 'lf':
            temp.style[temp.row][temp.col - 2] = ut.b
            temp.style[temp.row][temp.col - 1] = ut.p
            temp.style[temp.row][temp.col] = [ut.a, ut.o].includes(ut.current.style[temp.row][temp.col])
              ? ut.a
              : ut.g
            temp.col = temp.col - 1
            break
          case 'rt':
            temp.style[temp.row][temp.col + 2] = ut.b
            temp.style[temp.row][temp.col + 1] = ut.p
            temp.style[temp.row][temp.col] = [ut.a, ut.o].includes(ut.current.style[temp.row][temp.col])
              ? ut.a
              : ut.g
            temp.col = temp.col + 1
            break
          default:
            break
        }
      }
    } else {
      // 草或坑变人，人变草或坑
      switch (dir) {
        case 'up':
          temp.style[temp.row - 1][temp.col] = ut.p
          temp.style[temp.row][temp.col] = [ut.a, ut.o].includes(ut.current.style[temp.row][temp.col])
            ? ut.a
            : ut.g
          temp.row = temp.row - 1
          break
        case 'dn':
          temp.style[temp.row + 1][temp.col] = ut.p
          temp.style[temp.row][temp.col] = [ut.a, ut.o].includes(ut.current.style[temp.row][temp.col])
            ? ut.a
            : ut.g
          temp.row = temp.row + 1
          break
        case 'lf':
          temp.style[temp.row][temp.col - 1] = ut.p
          temp.style[temp.row][temp.col] = [ut.a, ut.o].includes(ut.current.style[temp.row][temp.col])
            ? ut.a
            : ut.g
          temp.col = temp.col - 1
          break
        case 'rt':
          temp.style[temp.row][temp.col + 1] = ut.p
          temp.style[temp.row][temp.col] = [ut.a, ut.o].includes(ut.current.style[temp.row][temp.col])
            ? ut.a
            : ut.g
          temp.col = temp.col + 1
          break
        default:
          break
      }
    }

    this.setState({
      current: ut.deepClone(temp)
    })
  }

  render() {
    return (
      <View style={{
        marginTop: 120,
        alignItems: 'center',
      }}>
        <Blocks blocks={this.state.current.style} />
        <ControlButton
          onBtnClick={this.onBtnClick}
        />
      </View>
    )
  }
}
