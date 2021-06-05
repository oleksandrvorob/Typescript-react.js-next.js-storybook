import { FC } from 'react'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'

import MyLoanTaskView from 'containers/MyLoanTaskView'

const Page: FC<{ id: number }> = ({ id: number }) => {
  const router = useRouter()
  const handleBack = () => {
    router.back()
  }

  return <MyLoanTaskView onBack={() => handleBack()} />
}

export default Page


export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { id } = query
  return { props: { id } }
}
