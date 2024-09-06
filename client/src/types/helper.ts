/* eslint-disable @typescript-eslint/no-explicit-any */
import cookie from 'js-cookie'

export const getLocalStorage = (key: string) => {
  if (window) {
    return localStorage.getItem(key)
  }
}
//set in localStorage
export const setLocalStorage = (key: string, value: any) => {
  if (window) {
    const storedValue =
      typeof value === 'string' ? value : JSON.stringify(value)
    localStorage.setItem(key, storedValue)
  }
}
//remove in localStorage
export const removeLocalStorage = (key: string) => {
  if (window) {
    localStorage.removeItem(key)
  }
}

//set in cookie
export const setcookie = (key: string, value: string) => {
  if (window) {
    cookie.set(key, value, {
      expires: 100 / 24, // 100 hours converted to days
    })
  }
}
//remove in cookie
export const removecookie = (key: string) => {
  if (window) {
    cookie.remove(key, {
      expires: 1,
    })
  }
}

//get cookie
export const getcookie = (key: string) => {
  if (window) {
    console.log(cookie.get(key))
    return cookie.get(key)
  }
}

export const isAuth = () => {
  if (typeof window !== 'undefined') {
    const user = getcookie('user')
    return user !== undefined && user !== null && user.length > 0
  }
  return false
}

export const getLocalNotification = () => {
  if (window) {
    if (!localStorage.getItem('notification')) {
      return JSON.parse(localStorage.getItem('notification') ?? '')
    } else {
      return false
    }
  }
}
//store token and user data in storage
export const authenticate = (response: { data: string }) => {
  setcookie('user', response.data)

  const expirationDate = new Date(
    new Date().getTime() + 60 * 60 * 24 * 10 * 1000
  )
  setcookie('expirationDate', expirationDate.toDateString())
}
