import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getFaq, postFile, postIssue, postContact } from '../services/support.service'

export const useSupportStore = defineStore('support', () => {
  const loadingFaq = ref(false)
  const faqError = ref(null)
  const faq = ref([])
  async function fetchFaq(payload) {
    try {
      loadingFaq.value = true
      const res = await getFaq({ depth: payload?.depth || 1 })
      faq.value = res.data.data
    } catch (e) {
      console.error(e)
      faqError.value = e
    } finally {
      loadingFaq.value = false
    }
  }

  async function submitFile(payload) {
    return await postFile(payload)
  }

  const processingIssue = ref(false)
  const issueError = ref(null)
  const issue = ref(null)
  async function submitIssue(payload) {
    try {
      processingIssue.value = true
      const res = await postIssue(payload)
      issue.value = res.data.data
    } catch (e) {
      console.error(e)
      issueError.value = e
    } finally {
      processingIssue.value = false
    }
  }

  const processingContact = ref(false)
  const contactError = ref(null)
  const contact = ref(null)
  async function submitContact(payload) {
    try {
      processingContact.value = true
      const res = await postContact(payload)
      contact.value = res.data.data
    } catch (e) {
      console.error(e)
      contactError.value = e
    } finally {
      processingContact.value = false
    }
  }

  return {
    loadingFaq,
    faqError,
    faq,
    fetchFaq,
    submitFile,
    submitIssue,
    processingContact,
    contactError,
    contact,
    processingIssue,
    issueError,
    issue,
    submitContact
  }
})
