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

export default async (list = [], keywords = "") => {
  keywords = String(keywords).toLowerCase().trim();
  if (keywords.length === 0) return list;

  return list.filter(async (value) => await keywordsMatcher(value, keywords));
};
