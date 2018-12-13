var fs = require('fs');
var gameA = fs.readFileSync('games/100Boxes.txt').toString().split('\n');
// var gameB = fs.readFileSync('games/696.txt').toString().split('\n');

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

    max = result[i][result[i].reduce(
      (prev, current, index, arr) =>
        arr[prev].length > current.length ? prev : index,
      0
    )].length

    for (j in result[i]) {
      ij = result[i][j]
      len = ij.length
      len < max && (result[i][j] = ij.padEnd(max))
    }
    max = 0

    obj[title] = result[i]
  }

  return obj
}

fs.writeFile(
  'games.js',
  `export const games = JSON.parse('${JSON.stringify({ ...getFromTxt(gameA) })}')`,
  { flag: 'w' },
  err =>  console.log(err)
)
