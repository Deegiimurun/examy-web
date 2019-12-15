import axios from 'axios';

const url = 'http://examy.live';

const auth = {
  authenticate: cred => {
    return axios({
      method: 'post',
      url: `${url}/login`,
      data: {
        username: cred.username,
        password: cred.password
      }
    });
  }
};

export default auth;
