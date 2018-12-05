var fs = require('fs');
var gameA = fs.readFileSync('games/100Boxes.txt').toString().split('\n');
var gameB = fs.readFileSync('games/696.txt').toString().split('\n');

function getFromTxt(array) {
  var result = []
  var temp = []
  for(i in array) {
    if (array[i] == ''){
      result.push(temp)
      temp = []
    } else {
      temp.push(array[i])
    }
  }

  result.pop()

  var len, ij, title, max = 0;
  var obj = {}

  for (i in result) {
    title = result[i][result[i].length - 1].replace(' ;', '').replace('; ', '')
    result[i].pop()

    max = findMaxLength(result[i])

    for (j in result[i]) {
      ij = result[i][j]
      len = ij.length
      len < max && (result[i][j] = ij + spaces(max - len))
    }
    max = 0

    obj[title] = result[i]
  }

  return obj
}

function spaces(len) {
  var temp = ''
  for (var i = 0; i < len; i++) {
    temp = temp + ' '
  }
  return temp
}

function findMaxLength(arr) {
  var _max = 0
  var _len = 0

  arr.forEach(i => {
    _len = i.length
    if (_len > _max) _max = _len
  });
  return _max
}

fs.writeFile('games.js', `export const games = JSON.parse('${JSON.stringify({
  ...getFromTxt(gameA),
  ...getFromTxt(gameB),
})}')`, {
  flag: 'w',
}, function(err) {
  console.log(err)
})
