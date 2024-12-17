const fs = require("fs");
function sorter(array, sortType, searchString) {
  if (sortType) {
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
  }
  if (searchString) {
    let filteredArray = [];
    // array.forEach((eachElement, i) => {
    //   if (eachElement["title"].includes(searchString)) {
    //     filteredArray.push(eachElement);
    //   }
    // });

    for (let i = 0; i < array.length; i++) {
        // for(let j =0; j< array[i]['title'])
      if (array[i]["title"].indexOf(searchString) !== -1) {
        filteredArray.push(array[i]);
      }
    }
    array = filteredArray;
  }

  return array;
}

const args = process.argv.slice(2);

try {
  const array = JSON.parse(fs.readFileSync(args[0]));
  const sortType = args[1];
  const searchString = args[2];

  console.log(sorter(array, sortType, searchString));
} catch {
  console.error("Invalid input. ");
}
