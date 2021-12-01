/*
  Function Verify for acces Page
*/
import cookies from "next-cookies";

// If token on Cookies
export function ifLoginAuthorized(context) {
  return new Promise(resolve => {
    const allCookies = cookies(context);
    
    if(!allCookies.token) 
      return context.res.writeHead(302, {
        Location: '/auth/login'
      }).end();
    
    return resolve({
      token: allCookies.token,
      status: 'Authorized'
    });
  })
}

// If token on Cookies
export function ifLoginUnauthorized(context) {
  return new Promise(resolve => {
    const allCookies = cookies(context);
    
    if(allCookies.token) 
      return context.res.writeHead(302, {
        Location: '/admin'
      }).end();
    
    return resolve('Unauthorized');
  })
}