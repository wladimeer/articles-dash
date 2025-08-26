const convertToUSD = (amount: number, country: string, rates: Record<string, number>): number => {
  const rate = rates[country] || 1
  return amount * rate
}

export { convertToUSD }
