const required = { required: true, message: "不能为空" };
const optional = { required: false, message: "不能为空" };

//请输入10~20位至少两种类型的字符,仅允许数字、字母,中文和标点符号
const passwordRegex = /^(?![0-9]+$)(?![a-zA-Z]+$)(?!([^(0-9a-zA-Z)])+$).{6,20}$/;
const emailRegex = /^[A-Za-z0-9]+([_.][A-Za-z0-9]+)*@([A-Za-z0-9-]+\.)+[A-Za-z]{2,6}$/;
const urlRegex = /(?:^|\s)((https?:\/\/)?(?:localhost|[\w-]+(?:\.[\w-]+)+)(:\d+)?(\/\S*)?)/;

const password = {
  message: "请输入10~20位至少两种类型的字符,仅允许数字、字母,中文和标点符号",
  validator: (value, rule) => {
    //vant 表单无论required是否为true  都会进行校验
    const isRequired = false;
    if (!isRequired && value.length === 0) return true;
    return passwordRegex.test(value);
  },
};

const regexRules = {
  required,
  optional,
  rules: {
    email: [required, { pattern: emailRegex, message: "邮箱格式不正确" }],
    password: [required, password],
    servicePlatformType: [required],
    url: [required, { pattern: urlRegex, message: "网址格式不正确" }],
    title: [required],
    username: [required],
    maxIdleTime: [required],
    oldPassword: [password],
    newPassword: [password],
    newPassword2: [password],
    captchaCode: [password],
  },
};

export default regexRules;
