import { Notify as notify } from "vant";

const STATUS_DESC_TEXT = {
  success: "成功",
  fail: "失败",
};

class Pipe extends Promise {
  constructor(processTaskHandle) {
    super(processTaskHandle);
  }

  makeResponseStatusMessage({
    message = "",
    duration = 3000,
    hasDefaultSuffix = true,
    successMessage = "",
    failMessage = "",
    className = "",
  } = {}) {
    let parseMessage = `${message}`;

    const makeMessageParams = {
      message: parseMessage,
      duration,
    };

    this.then(async (e) => {
      if (hasDefaultSuffix) {
        makeMessageParams.message += `${STATUS_DESC_TEXT.success}`;
      }
      if (successMessage) makeMessageParams.message = successMessage;
      notify({
        ...makeMessageParams,
        type: "success",
      });
    });

    this.catch(async (e) => {
      if (hasDefaultSuffix) {
        makeMessageParams.message += `${STATUS_DESC_TEXT.fail}`;
      }
      if (failMessage) makeMessageParams.message = failMessage;
      notify({ ...makeMessageParams, type: "danger" });
    });

    return this;
  }
}

export default Pipe;
