import React, { Component } from 'react'
import { View } from 'react-native'
import * as ut from './utils'
import Blocks from './components/Blocks'
import ControlButton from './components/ControlButton'

const UP = 'up'
const DN = 'dn'
const LF = 'lf'
const RT = 'rt'
const MID = 'mid'

export default class Index extends Component {
  state = {
    current: ut.deepClone(ut.current),
    history: [],
  }

  goBack = () => {
    const { history } = this.state
    const len = history.length

    if (len === 0) return
    this.setState({
      current: ut.deepClone(len === 1 ? ut.current : history[len - 2]),
      history: len === 1 ? [] : history.filter((i, index) => index !== len - 1 )
    })
  }

  onBtnClick = dir => {
    if (dir === MID) return this.goBack()

    let temp = ut.deepClone(this.state.current)

    // 当前位置在原地图中为 aim 或者 ok
    // 则小人移走时应变回 aim
    // 其余则变为空
    const currentPosWas = [ut.a, ut.o].includes(ut.current.style[temp.row][temp.col]) ? ut.a : ut.g

    const pos = step => {
      switch (dir) {
        case UP:
          return temp.style[temp.row - step][temp.col]
        case DN:
          return temp.style[temp.row + step][temp.col]
        case LF:
          return temp.style[temp.row][temp.col - step]
        case RT:
          return temp.style[temp.row][temp.col + step]
        default:
          break
      }
    }

    const nextPos = pos(1)
    if (nextPos === ut.w) {
      // 撞墙了
      return
    } else if ([ut.b, ut.o].includes(nextPos)) {
      // 前方位置是箱子或者ok
      // 则看再前方位置是什么
      const nextnextPos = pos(2)
      if ([ut.w, ut.b, ut.o].includes(nextnextPos)) {
        // 箱子或者ok前边是墙
        return
      } else if(nextnextPos === ut.a) {
        // 箱子或者ok前边是坑
        // 坑变ok，nextPos变人，人变草或坑
        switch (dir) {
          case UP:
            temp.style[temp.row - 2][temp.col] = ut.o
            temp.style[temp.row - 1][temp.col] = ut.p
            temp.style[temp.row][temp.col] = currentPosWas
            temp.row --
            break
          case DN:
            temp.style[temp.row + 2][temp.col] = ut.o
            temp.style[temp.row + 1][temp.col] = ut.p
            temp.style[temp.row][temp.col] = currentPosWas
            temp.row ++
            break
          case LF:
            temp.style[temp.row][temp.col - 2] = ut.o
            temp.style[temp.row][temp.col - 1] = ut.p
            temp.style[temp.row][temp.col] = currentPosWas
            temp.col --
            break
          case RT:
            temp.style[temp.row][temp.col + 2] = ut.o
            temp.style[temp.row][temp.col + 1] = ut.p
            temp.style[temp.row][temp.col] = currentPosWas
            temp.col ++
            break
          default:
            break
        }
      } else {
        // 箱子或者ok前边是空
        // 空变箱子，nextPos变人，人变草或坑
        switch (dir) {
          case UP:
            temp.style[temp.row - 2][temp.col] = ut.b
            temp.style[temp.row - 1][temp.col] = ut.p
            temp.style[temp.row][temp.col] = currentPosWas
            temp.row --
            break
          case DN:
            temp.style[temp.row + 2][temp.col] = ut.b
            temp.style[temp.row + 1][temp.col] = ut.p
            temp.style[temp.row][temp.col] = currentPosWas
            temp.row ++
            break
          case LF:
            temp.style[temp.row][temp.col - 2] = ut.b
            temp.style[temp.row][temp.col - 1] = ut.p
            temp.style[temp.row][temp.col] = currentPosWas
            temp.col --
            break
          case RT:
            temp.style[temp.row][temp.col + 2] = ut.b
            temp.style[temp.row][temp.col + 1] = ut.p
            temp.style[temp.row][temp.col] = currentPosWas
            temp.col ++
            break
          default:
            break
        }
      }
    } else {
      // 草或坑变人，人变草或坑
      switch (dir) {
        case UP:
          temp.style[temp.row - 1][temp.col] = ut.p
          temp.style[temp.row][temp.col] = currentPosWas
          temp.row --
          break
        case DN:
          temp.style[temp.row + 1][temp.col] = ut.p
          temp.style[temp.row][temp.col] = currentPosWas
          temp.row ++
          break
        case LF:
          temp.style[temp.row][temp.col - 1] = ut.p
          temp.style[temp.row][temp.col] = currentPosWas
          temp.col --
          break
        case RT:
          temp.style[temp.row][temp.col + 1] = ut.p
          temp.style[temp.row][temp.col] = currentPosWas
          temp.col ++
          break
        default:
          break
      }
    }

    const newCurrent = ut.deepClone(temp)
    this.setState({
      current: newCurrent,
      history: [...this.state.history, newCurrent],
    })
  }

  render() {
    return (
      <View style={{
        marginTop: 120,
        alignItems: 'center',
      }}>
        <Blocks blocks={this.state.current.style} />
        <ControlButton onBtnClick={this.onBtnClick} />
      </View>
    )
  }
}
