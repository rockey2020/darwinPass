import { Notify as notify } from "vant";

class Pipe extends Promise {
  constructor(processTaskHandle) {
    super(processTaskHandle);
  }

  makeResponseStatusMessage({ message = "", duration = 3000 } = {}) {
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
