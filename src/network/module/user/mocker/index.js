export const PasswordListMocker = async (params) => {
  const data = [];
  for (let i = 0; i < 10; i++) {
    data.push({
      id: i,
      url: "http://localhost:8000/user/login",
      notes: "",
      title: "localhost",
      username: "rockey@qq.com",
      password: "a123456",
    });
  }
  return { data };
};

export const UserMocker = async (params) => {
  return {
    id: "aaaa",
    username: "rockey",
    email: "rockey@qq.com",
    maxIdleTime: 10000,
    servicePlatformType: 1,
  };
};
