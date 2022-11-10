export const requestHandle = (delay, flag = true) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (flag) {
        resolve("test Promise");
      } else {
        reject("occur error Promise");
      }
    }, delay);
  });
};

export const requestAll = async (promises) => {
  return Promise.all(promises)
    .then((res) => {
      console.log(res, "all res");
    })
    .catch((e) => {
      console.log(e, "error all");
    });
};
