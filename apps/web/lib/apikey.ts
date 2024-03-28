export function maskApiKey(apikey: string) {
  // mask the last 8 characters
  let mask = apikey.slice(0, -20)

  for (let i = 0; i < apikey.length - 20; i++) {
    mask += '*'
  }

  return mask
}
