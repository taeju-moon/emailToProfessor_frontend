import axios from 'axios';
const API_URL = 'http://3.35.11.39:8000/auth';

class useAuth {
  login(user_id, password) {
    return axios
      .post(API_URL + '/login', {
        user_id,
        password,
      })
      .then((response) => {
        console.log(response.data);
        console.log(response.data.token);
        if (response.token) {
          localStorage.setItem('user', JSON.stringify(response));
        }
        return response;
      });
  }

  logout() {
    localStorage.removeItem('user');
  }

  verify() {
    return axios.get(API_URL + '/verify');
  }

  isLoggedIn() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.token) {
      return true;
    }
    return true;
  }
}

export default new useAuth();
