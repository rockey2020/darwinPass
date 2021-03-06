async function keywordsMatcher(obj = {}, keywords) {
  const keywordsArray = keywords.split(" ");
  const wordsArray = Object.values(obj);
  return Boolean(
    wordsArray.find((value) => {
      let matchCount = 0;
      value = String(value).trim().toLowerCase();
      if (value.match(keywords)) return true;
      for (let i of keywordsArray) {
        if (value.match(i)) matchCount++;
      }
      if (matchCount === keywordsArray.length) return true;
    })
  );
}

export default (list = [], keywords = "") => {
  return new Promise((resolve) => {
    const newList = [];
    keywords = String(keywords).toLowerCase().trim();
    if (keywords.length === 0) return resolve(list);

    for (let value of list) {
      newList.push(
        keywordsMatcher(value, keywords).then((isHas) => {
          if (isHas) {
            return value;
          } else {
            return null;
          }
        })
      );
    }

    Promise.all(newList).then((res) => {
      resolve(res.filter((value) => value));
    });
  });
};
