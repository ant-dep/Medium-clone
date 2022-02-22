import Head from 'next/head'
import Banner from '../components/Banner'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Posts from '../components/Posts'
import { sanityClient } from '../lib/sanity.server'
import { Post } from '../typings'
interface Props {
  posts: [Post]
}

export default function Home({ posts }: Props) {
  return (
    <div>
      <Head>
        <title>Medium Clone</title>
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <Header />
      <Banner />
      <div className="mx-auto max-w-7xl">
        <Posts posts={posts} />
        <hr className="mx-auto mt-12 h-[0.5px] w-[95%] bg-[#757575]" />
        <Footer />
      </div>
    </div>
  )
}

export const getServerSideProps = async () => {
  const query = `*[_type == "post"]{
    _id,
    title,
    author -> {
     name,
     image
   },
    description,
    mainImage,
    slug
  }`

  const posts = await sanityClient.fetch(query)

  return {
    props: {
      posts,
    },
  }
}
