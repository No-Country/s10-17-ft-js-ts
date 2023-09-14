export async function request (URL: string) {
  try {
    const response = await fetch(URL)
    const data = await response.json()
    return data
  } catch (e) {
    throw new Error('Something went wrong when fetching ' + URL + '\n\n' + e)
  }
}
