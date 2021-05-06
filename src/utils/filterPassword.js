function domainMatcher(url = "") {
  const { hostname } = location;
  let urlParsing = new URL(url);
  urlParsing = urlParsing.hostname;

  const notWWWHostname = hostname.replace("www.", "");
  const notWWWUrlParsing = urlParsing.replace("www.", "");

  const notWWWHostnameArray = notWWWHostname.split(".");
  const notWWWUrlParsingArray = notWWWUrlParsing.split(".");

  if (hostname === urlParsing) return true;
  if (notWWWHostname === notWWWUrlParsing) return true;

  if (
    notWWWHostnameArray[0] === notWWWUrlParsingArray[0] &&
    notWWWHostnameArray[1] === notWWWUrlParsingArray[1]
  ) {
    return true;
  }

  if (
    notWWWHostnameArray.find((value) =>
      notWWWUrlParsingArray.includes(value)
    ) &&
    notWWWHostnameArray[notWWWHostnameArray.length - 1] ===
      notWWWUrlParsingArray[notWWWUrlParsingArray.length - 1] &&
    notWWWHostnameArray[notWWWHostnameArray.length - 2] ===
      notWWWUrlParsingArray[notWWWUrlParsingArray.length - 2]
  ) {
    return true;
  }

  if (
    notWWWUrlParsingArray.find((value) =>
      notWWWHostnameArray.includes(value)
    ) &&
    notWWWHostnameArray[notWWWHostnameArray.length - 1] ===
      notWWWUrlParsingArray[notWWWUrlParsingArray.length - 1] &&
    notWWWHostnameArray[notWWWHostnameArray.length - 2] ===
      notWWWUrlParsingArray[notWWWUrlParsingArray.length - 2]
  ) {
    return true;
  }

  return false;
}

export default async (list = []) => {
  return list.filter((value) => domainMatcher(value.url));
};
