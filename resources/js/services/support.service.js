import axios from '../utils/axios'
import { API_PREFIX, API_ENDPOINT_PREFIX, API_ENDPOINT_SUFFIX } from '../utils/config'

const getFaq = (params) => axios.get(`${API_ENDPOINT_PREFIX}/faq/${API_ENDPOINT_SUFFIX}`, params)
const postFile = (body) => axios.post(`${API_PREFIX}/files`, body)
const postIssue = (body) => axios.post(`${API_ENDPOINT_PREFIX}/issues/${API_ENDPOINT_SUFFIX}`, body)
const postContact = (body) =>
  axios.post(`${API_ENDPOINT_PREFIX}/enquiries/${API_ENDPOINT_SUFFIX}`, body)

export {
  getFaq,
  postFile,
  postIssue,
  postContact
}
