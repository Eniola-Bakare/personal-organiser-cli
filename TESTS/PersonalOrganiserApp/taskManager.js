const testArray = [
  {
    title: "A good girl",
    priority: 3,
    dueDate: "2024-12-12",
  },
  {
    title: "Faier enough",
    priority: 23,
    dueDate: "2024-12-21",
  },
  {
    title: "Excellent",
    priority: 2,
    dueDate: "2024-12-10",
  },
];

function taskManager(array, sortType = "", searchString) {
  if (!array) return;

  if (sortType) {
    for (let i = 0; i < array.length; i++) {
      let minimumIndex = i;

      for (let j = i + 1; j < array.length; j++) {
        if (array[j][sortType] < array[minimumIndex][sortType]) {
          minimumIndex = j;
        }
      }

      if (minimumIndex !== i) {
        [array[i], array[minimumIndex]] = [array[minimumIndex], array[i]];
      }
    }
    return array;
  }

  if (searchString) {
    array = array.filter((eachEl, i) => {
      return eachEl.title.toLowerCase().includes(searchString.toLowerCase());
    });
    return array;
  }
}
