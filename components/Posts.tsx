import Link from 'next/link'
import { urlFor } from '../lib/sanity'
import { Post } from '../typings'

interface Props {
  posts: [Post]
}

const Posts = ({ posts }: Props) => {
  console.log('posts', posts)
  return (
    <div className="grid grid-cols-1 gap-3 py-2 sm:grid-cols-2 md:gap-6 md:py-6 lg:grid-cols-3">
      {posts &&
        posts.map((post) => (
          <Link key={post._id} href={`/post/${post.slug.current}`}>
            <div className="group cursor-pointer overflow-hidden rounded-lg border">
              <img
                className="h-60 w-full object-cover transition-transform duration-200 ease-in-out group-hover:scale-105"
                src={urlFor(post.mainImage).url()!} // ! means that we don't want to get null
                alt=""
              />
              <div className="flex justify-between bg-white p-5">
                <div>
                  <p className="text-lg font-bold">{post.title}</p>
                  <p className="text-xs">
                    {post.description} by {post.author.name}
                  </p>
                  <p className=""></p>
                </div>
                <img
                  className="h-12 w-12 rounded-full"
                  src={urlFor(post.author.image).url()!}
                  alt=""
                />
              </div>
            </div>
          </Link>
        ))}
    </div>
  )
}

export default Posts
