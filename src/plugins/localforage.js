import localforage from "localforage";
import packageInfo from "../../package";

const store = localforage.createInstance({
  name: packageInfo.name,
  storeName: "v1",
});
export default store;
