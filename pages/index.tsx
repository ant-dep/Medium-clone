import Head from 'next/head'
import Banner from '../components/Banner'
import Header from '../components/Header'

export default function Home() {
  return (
    <div className="mx-auto max-w-7xl">
      <Head>
        <title>Medium</title>
        <link rel="icon" href="/favicon.svg" />
      </Head>

      <Header />
      <Banner />
      <hr className="mx-auto mt-12 h-[0.5px] w-[95%] bg-[#757575]" />
    </div>
  )
}
