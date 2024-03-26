import { alphabet, generateRandomString } from 'oslo/crypto'

export const generateApiKey = () =>
  `alq_${generateRandomString(30, alphabet('0-9', 'A-Z', 'a-z'))}`
