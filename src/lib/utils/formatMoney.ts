const getMoney = (num) =>
  !!num
    ? `${num?.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
      })}`
    : null

export default getMoney
