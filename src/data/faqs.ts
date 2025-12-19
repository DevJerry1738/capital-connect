import type { FAQ } from '../types/faq'

const faqs: FAQ[] = [
  { id: 'f1', question: 'What does "Verified provider" mean?', answer: 'Verified providers have completed our basic verification checks; this indicates higher trust but is not a guarantee.' },
  { id: 'f2', question: 'How do I contact a provider?', answer: 'Open the provider detail page and use the listed contact actions such as WhatsApp, phone, or email.' },
  { id: 'f3', question: 'How can service providers get verified?', answer: 'Service providers can apply for verification via the provider onboarding flow (coming soon). It requires identity and business proof.' },
  { id: 'f4', question: 'Is abuja-connect free to use?', answer: 'Yes. The platform is free for users. Some provider features may be monetized in the future.' }
]

export default faqs
