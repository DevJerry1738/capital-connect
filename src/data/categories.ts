// Centralized list of service categories used across the app
const CATEGORIES = [
  'Plumbing',
  'Electrical services',
  'Cleaning',
  'Tailoring',
  'Carpentry',
  'AC repair',
  'Generator repair',
  'Appliance repair',
  'Painting',
  'Auto mechanic',
  'IT / computer repair',
  'Pest control',
  'Security',
  'Landscaping',
  'Courier',
]

export type Category = typeof CATEGORIES[number]

export default CATEGORIES
