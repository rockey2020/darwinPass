import { Notify as notify } from "vant";

class Message extends Promise {
  constructor(args) {
    super(args);
  }

  makeMessageConfig({ message = "", duration = 3000 }) {
    this.then(async (e) => {
      notify({ type: "success", message, duration });
    });
    this.catch(async (e) => {
      notify({ type: "danger", message, duration });
    });
    return this;
  }
}

export default Message;
