import { useRouter } from 'next/router'

const Campaign = () => {
  const router = useRouter()
  const { id } = router.query

  return <p>Campaign: {id}</p>
}

export async function getServerSideProps({ params }) {
  console.log({
    params
  })
  return {
    props: params
  }
}

export default Campaign