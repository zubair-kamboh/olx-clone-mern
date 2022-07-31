import axios from 'axios'

const url = '/api'

// POST ADS
const postAd = async (data) => {
  const token = JSON.parse(localStorage.getItem('token'))
  const header = {
    Authorization: `Bearer ${token}`,
    // 'Content-Type': 'multipart/form-data',
  }

  const ad = await axios({
    method: 'post',
    url: `${url}/post`,
    headers: header,
    data,
  })

  console.log(ad.data)
  return ad.data
}

// GET ADS
const getAds = async () => {
  const ads = await axios.get(`${url}/items`)

  return ads.data
}

// GET ITEM USER
const getItemUser = async (userId) => {
  console.log(userId)
  const user = await axios({
    method: 'get',
    url: `${url}/item/user`,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: { userId },
  })

  return user.data
}

const adsService = {
  postAd,
  getAds,
  getItemUser,
}

export default adsService
