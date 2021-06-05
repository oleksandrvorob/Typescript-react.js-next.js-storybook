import LoanSpecs from '.'

export default { title: 'Loan Specs' }

export const Example = () => <LoanSpecs paidToDate="05/02/2020" />
export const withNoProps = () => <LoanSpecs />
