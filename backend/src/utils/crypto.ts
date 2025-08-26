import crypto from 'crypto'
import { ALGORITHM, SECRET_KEY } from '../constants/default'

const KEY = crypto.createHash('sha256').update(SECRET_KEY).digest()

const encrypt = (plain: string): string => {
  const iv = crypto.randomBytes(16)
  const cipher = crypto.createCipheriv(ALGORITHM, KEY, iv)
  const encrypted = Buffer.concat([cipher.update(plain, 'utf8'), cipher.final()])

  return Buffer.concat([iv, encrypted]).toString('base64')
}

const decrypt = (encrypted: string): string => {
  const input = Buffer.from(encrypted, 'base64')

  const iv = input.subarray(0, 16)
  const data = input.subarray(16)

  const decipher = crypto.createDecipheriv(ALGORITHM, KEY, iv)
  const decrypted = Buffer.concat([decipher.update(data), decipher.final()])

  return decrypted.toString('utf8')
}

export { encrypt, decrypt }
