import axios from 'axios'

const url = '/api'

// POST ADS
const postAd = async (data) => {
  const token = JSON.parse(localStorage.getItem('token'))
  const header = {
    Authorization: `Bearer ${token}`,
  }

  const ad = await axios({
    method: 'post',
    url: `${url}/post`,
    headers: header,
    data,
  })

  return ad.data
}

// GET ADS
const getAds = async () => {
  const ads = await axios.get(`${url}/items`)

  return ads.data
}

// GET ITEM USER
const getItemUser = async (userId) => {
  const user = await axios({
    method: 'post',
    url: `${url}/item/user`,
    data: { userId },
  })

  return user.data
}

// MY ADS
const myads = async () => {
  const token = JSON.parse(localStorage.getItem('token'))

  const header = {
    Authorization: `Bearer ${token}`,
  }

  const user = await axios({
    method: 'get',
    url: `${url}/myads`,
    headers: header,
  })

  return user.data
}
// DELETE AD
const deleteAd = async (id) => {
  const token = JSON.parse(localStorage.getItem('token'))

  const header = {
    Authorization: `Bearer ${token}`,
  }

  const user = await axios({
    method: 'delete',
    url: `${url}/item/delete/${id}`,
    headers: header,
  })

  return user.data
}
// UPDATE AD
const updateAd = async ({ id, ad }) => {
  console.log(ad)
  const token = JSON.parse(localStorage.getItem('token'))

  const header = {
    Authorization: `Bearer ${token}`,
  }

  const user = await axios({
    method: 'put',
    url: `${url}/item/update/${id}`,
    data: ad,
    headers: header,
  })

  return user.data
}

const adsService = {
  postAd,
  getAds,
  getItemUser,
  myads,
  deleteAd,
  updateAd,
}

export default adsService
