const Banner = () => {
  return (
    <div className="bg-[#ffc017]">
      <div className="mx-auto flex max-w-7xl items-center justify-between border-y border-black bg-[#ffc017] pt-28 pb-10 lg:pt-20 lg:pb-0 xl:border-hidden">
        <div className="space-y-5 px-10 lg:py-6">
          <h1 className="md:7xl ma-w-xl w-11/12 font-serif text-6xl sm:w-9/12">
            Medium is a place to write, read and connect.
          </h1>
          <h2 className="w-9/12 font-normal">
            It's easy and free to post your thinking on any topic and connect
            with millions of readers.
          </h2>
          <button className="rounded-full border border-black bg-white px-4 py-2 font-medium transition duration-100 active:scale-90">
            Start Writing
          </button>
        </div>

        <img
          className="hidden h-40 sm:inline-flex lg:h-80 xl:h-full"
          src="/M.png"
          alt=""
        />
      </div>
    </div>
  )
}

export default Banner
