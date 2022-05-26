import { useRouter } from 'next/router'

const Campaign = () => {
  const router = useRouter()
  const { id } = router.query

  return <p>Campaign: {id}</p>
}

export default Campaign