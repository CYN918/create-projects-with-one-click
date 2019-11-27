import Cookies from 'js-cookie'

const TokenKey = 'Admin-token'
const userIofo = 'user-Name'

export function getToken () {
  return localStorage.getItem(TokenKey)
}

export function setToken (token) {
  return  localStorage.setItem(TokenKey , token)  
}

export function removeToken () {
  return  localStorage.removeItem(TokenKey)
}

export function getUser () {
  return localStorage.getItem(userIofo)
}

export function setUser (Iofo) {
  return  localStorage.setItem(userIofo , Iofo)
}

export function removeIofo () {
  return  localStorage.removeItem(userIofo)
}