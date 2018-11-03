export const p = 'people'
export const g = 'grass'
export const b = 'box'
export const o = 'ok'
export const w = 'wall'
export const a = 'aim'

export const current = {
  col: 2,
  row: 2,
  style: [
    [w, w, w, w, w, w, w, w],
    [w, w, w, g, g, g, w, w],
    [w, a, p, b, g, g, w, w],
    [w, w, w, g, b, a, w, w],
    [w, a, w, w, b, g, w, w],
    [w, g, w, g, a, g, w, w],
    [w, b, g, o, b, b, a, w],
    [w, g, g, g, a, g, g, w],
    [w, w, w, w, w, w, w, w],
  ],
}

export const deepClone = (obj = {}) => JSON.parse(JSON.stringify(obj))
