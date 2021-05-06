export const DefaultConverter = async (response) => {
  return response ?? {};
};

export const ListDefaultConverter = async (response) => {
  const {
    data = [],
    currentPage = 1, //当前页数
    pageSize = 0, //一个多少条数据
    totalCount = 0, //总数
  } = response ?? {};
  return { data, currentPage, pageSize, totalCount };
};

export const EmptyDefaultConverter = async (response) => {
  return null;
};
