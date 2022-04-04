import Cookies from 'universal-cookie';

const cookies = new Cookies();

export function setJWT(token) {
    cookies.remove('jwt_token');

    let d = new Date();
    d.setTime(d.getTime() + (1*60*60*1000));

    cookies.set("jwt_token", token, {
        expires: d,
    });
}

export function getJWT() {
    return cookies.get('jwt_token');
}

export function invalidateJWT() {
    cookies.remove('jwt_token');
}

export function getBearerToken() {
    let token = cookies.get('jwt_token');
    if(token) {
        return {
            'Authorization': `Bearer ${ token }`,
        };
    }
    return {};
}