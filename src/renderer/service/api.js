import axios from 'axios'
import {baseURL} from '../global'

export const checkName = (name, location) => {
  return axios({
    url: baseURL + '/api/v1/player/check-name',
    data: {name: name, location: location},
    method: 'post'
  })
}
