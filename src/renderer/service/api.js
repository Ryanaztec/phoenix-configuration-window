/*
 * @Author: your name
 * @Date: 2020-09-16 23:14:41
 * @LastEditTime: 2020-10-12 19:41:18
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \phoenix-configuration-window\src\renderer\service\api.js
 */
import axios from 'axios'
import {baseURL} from '../global'

export const checkName = (name, location) => {
  return axios({
    url: baseURL + '/api/v1/player/check-name',
    data: {name: name, location: location},
    method: 'post'
  })
}

export const updateInfo = (name, location, macAddress) => {
  return axios({
    url: baseURL + '/api/v1/player/player-info',
    data: {name: name, location: location, mac_address: macAddress},
    method: 'post'
  })
}
export const getInfo = (macAddress) => {
  return axios({
    url: baseURL + `/api/v1/player/player-info?mac_address=${macAddress}`,
    method: 'get'
  })
}
