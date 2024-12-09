const fs = require("fs");
function sorter(array, sortType, searchString) {
  for (let i = 0; i < array.length; i++) {
    let minimumValueIndex = i;
    let j = i + 1;
    for (j; j < array.length; j++) {
      if (array[j][sortType] < array[minimumValueIndex][sortType]) {
        minimumValueIndex = j;
      }
    }
    if (minimumValueIndex !== i) {
      [array[minimumValueIndex], array[i]] = [
        array[i],
        array[minimumValueIndex],
      ];
    }
  }
  if (searchString) {

  }

  return array;
}

const args = process.argv.slice(2);

try {
  const array = JSON.parse(fs.readFileSync(args[0]));
  const sortType = args[1];

  console.log(sorter(array, sortType));
} catch {
  console.error("Invalid input. ");
}
