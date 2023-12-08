export const parse = (event) => {
  try {
    return JSON.parse(event.data)
  } catch (error) {
    return null
  }
}
