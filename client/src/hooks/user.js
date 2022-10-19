import axios from "axios";

// Get Users
export const useGetUsers = (user, callback) => {
  const url = "/api/customer";

  axios
    .get(url, { params: user })
    .then(res => {
      console.log(res.data);
      callback(res.data, null);
    })
    .catch(err => {
      console.log(err);
      callback(null, err);
    });
};

// Add User
export const useAddUser = user => {
  const url = "/api/customer";

  return axios
    .post(url, JSON.stringify(user), {
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(res => {
      console.log(res);
      return null;
    })
    .catch(err => {
      console.log(err);
      return err;
    });
};

// Add Record
export const useAddRecord = (userID, record) => {
  const url = "/api/record";

  return axios
    .post(
      url,
      JSON.stringify({
        id: userID,
        record: record
      }),
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    )
    .then(res => {
      console.log(res);
      return null;
    })
    .catch(err => {
      console.log(err);
      return err;
    });
};
