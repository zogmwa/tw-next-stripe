import React from 'react'

export const getServerSideProps = async ({ query }) => {
  const services = query.services
  return {
    props: {
      services,
    },
  }
}

export default function CompareList(services) {
  console.log(services)
  return <></>
}
