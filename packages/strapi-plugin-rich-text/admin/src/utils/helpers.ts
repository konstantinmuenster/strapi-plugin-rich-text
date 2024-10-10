export const addRemoveFromList = <T>(list: Array<T>, val: T) => {
  if (!list.includes(val)) {
    list.push(val);
  } else {
    list.splice(list.indexOf(val), 1);
  }

  return list;
};
