import { jwtDecode } from 'jwt-decode'

const isExpired = (token) => {
    // when token is expired: function returns true, otherwise false
    let decodedToken;
    if (token != null) {
        decodedToken = jwtDecode(token);
    } else {
        return false;
    }

    let dateNow = new Date();
    return decodedToken.exp * 1000 < dateNow.getTime() ? true : false;
}

export default isExpired;