const ALGORITHM = 'aes-256-ctr'
const SECRET_KEY = process.env.SECRET_KEY || 'mysecretkey1234567890'
const PORT = process.env.PORT || 3000

export { ALGORITHM, SECRET_KEY, PORT }
