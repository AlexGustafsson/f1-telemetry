import type {
  fetchAllLabelsWithValues,
  fetchLabelValues,
  fetchLabels,
  performQuery,
} from './api'

declare global {
  interface Window {
    api: {
      performQuery: typeof performQuery
      fetchLabels: typeof fetchLabels
      fetchLabelValues: typeof fetchLabelValues
      fetchAllLabelsWithValues: typeof fetchAllLabelsWithValues
    }
  }
}
