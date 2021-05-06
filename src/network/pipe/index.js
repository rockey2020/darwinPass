import { Notify as notify } from "vant";

class Pipe extends Promise {
  constructor(processTaskHandle) {
    super(processTaskHandle);
  }

  makePipeline(...args) {
    for (let callback of args) {
      this.then((res) => {
        callback.bind(this, res)();
      });
    }
    return this;
  }

  makeResponseStatusMessage({ message = "", duration = 3000 }) {
    this.then(async (e) => {
      notify({ type: "success", message, duration });
    });
    this.catch(async (e) => {
      notify({ type: "danger", message, duration });
    });
    return this;
  }
}

export default Pipe;
