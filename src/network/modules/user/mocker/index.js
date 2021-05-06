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
