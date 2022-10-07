import axios from '../assets/api/auth'

export const followUser = (id) => {
  return new Promise((resolve, reject) => {
    try {
      axios.put(`/user/follow/${id}`)
        .then((res) => {
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    } catch (error) {
      reject(error)
    }

  })
}

export const unFollowUser = (id) => {
  return new Promise((resolve, reject) => {
    try {
      axios.put(`/user/unfollow/${id}`)
        .then((res) => {
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    } catch (error) {
      reject(error)
    }
  })
}