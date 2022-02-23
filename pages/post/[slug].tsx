import { useState } from 'react'
import Head from 'next/head'
import { GetStaticProps } from 'next'
import Header from '../../components/Header'
import { urlFor } from '../../lib/sanity'
import { sanityClient } from '../../lib/sanity.server'
import { Post } from '../../typings'
import PortableText from 'react-portable-text'
import { useForm, SubmitHandler } from 'react-hook-form'
import toast, { Toaster } from 'react-hot-toast'
import { type } from 'os'

interface Props {
  post: Post
}
interface IFormInput {
  _id: string
  name: string
  email: string
  comment: string
}

const errorName = () =>
  toast.error('The Name field is required!', {
    id: 'name',
  })
const errorEmail = () =>
  toast.error('The Email field is required!', {
    id: 'email',
  })
const errorComment = () =>
  toast.error('The Comment field is required!', {
    id: 'comment',
  })
const successSubmit = () =>
  toast.success('Yayy comment submitted', {
    id: 'successSubmit',
  })

const Post = ({ post }: Props) => {
  const [submitted, setSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>()

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    fetch('/api/createComment', {
      method: 'POST',
      body: JSON.stringify(data),
    })
      .then(() => {
        console.log(data)
        setSubmitted(true)
      })
      .catch((err) => {
        console.log(err)
        setSubmitted(false)
      })
  }

  return (
    <>
      <div>
        <Toaster />
      </div>
      <Head>
        <title>{post.slug.current}</title>
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <main>
        <Header minScroll={0} />

        <img
          className="h-38 mt-20 w-full object-cover"
          src={urlFor(post.mainImage).url()!}
          alt=""
        />

        <article className="mx-auto max-w-3xl p-5">
          <h1 className="mt-10 mb-3 text-3xl">{post.title}</h1>
          <h2 className="mb-3 text-xl font-light text-gray-500">
            {post.description}
          </h2>

          <div className="flex items-center space-x-2">
            <img
              className="h-10 w-10 rounded-full border border-green-500"
              src={urlFor(post.author.image).url()!}
              alt=""
            />
            <p className="text-sm font-extralight">
              Blog post by{' '}
              <span className="text-green-600">{post.author.name}</span> -
              Published at {new Date(post._createdAt).toLocaleString()}
            </p>
          </div>

          <div className="mt-10">
            <PortableText
              className=""
              dataset={process.env.NEXT_PUBLIC_SANITY_DATASET!}
              projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!}
              content={post.body}
              serializers={{
                h1: (props: any) => (
                  <h1 className="my-5 text-2xl font-bold" {...props} />
                ),
                h2: (props: any) => (
                  <h1 className="my-5 text-xl font-bold" {...props} />
                ),
                li: ({ children }: any) => (
                  <li className="ml-4 list-disc">{children}</li>
                ),
                link: ({ href, children }: any) => (
                  <a href={href} className="text-blue-500 hover:underline">
                    {children}
                  </a>
                ),
              }}
            />
          </div>
        </article>
        <hr className="my-5 mx-auto max-w-lg border border-[#ffc017]" />

        {submitted ? (
          <div className="my-10 mx-auto flex flex-col bg-[#ffc017] p-10 text-white">
            <h3 className="text-3xl font-bold">
              Thank you for submitting your comment!
            </h3>
            <p>Once it has been approved, it will appear below!</p>
            <div className="hidden">{successSubmit()}</div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mx-auto mb-10 flex max-w-2xl flex-col p-5"
          >
            <h3 className="text-base font-semibold text-[#ffc017]">
              Enjoyed the article?
            </h3>
            <h4 className="text-2xl font-bold">Leave a comment below!</h4>
            <hr className="mt-2 py-3" />

            <input
              {...register('_id')}
              type="hidden"
              name="_id"
              value={post._id}
            />

            <label className="mb-5 block">
              <span className="text-gray-700 ">Name</span>
              <input
                {...register('name', { required: true })}
                className="form-input mt-1 block w-full rounded border py-2 px-3 shadow focus:outline-[#3f8dce] "
                type="text"
                placeholder="Shubh Porwal"
              />
            </label>
            <label className="mb-5 block">
              <span className="text-gray-700 ">Email</span>
              <input
                {...register('email', { required: true })}
                className="form-input mt-1 block w-full rounded border py-2 px-3 shadow focus:outline-[#3f8dce] "
                type="email"
                placeholder="Shubh Porwal"
              />
            </label>
            <label className="mb-5 block">
              <span className="text-gray-700 ">Comment</span>
              <textarea
                {...register('comment', { required: true })}
                className="form-textarea mt-1 block w-full rounded border py-2 px-3 shadow focus:outline-[#3f8dce] "
                placeholder="Shubh Porwal"
                rows={8}
              />
            </label>

            {/* Errors */}
            {errors.name && <div className="hidden">{errorName()}</div>}
            {errors.email && <div className="hidden">{errorEmail()}</div>}
            {errors.comment && <div className="hidden">{errorComment()}</div>}

            <input
              type="submit"
              className="focus:shadow-outline cursor-pointer rounded bg-[#ffc017] py-2 px-4 font-bold text-white shadow hover:text-black focus:outline-none"
            />
          </form>
        )}

        <div className="my-10 mx-auto flex max-w-2xl flex-col space-y-2 rounded p-10 shadow shadow-[#ffc017]">
          <h3 className="text-3xl font-semibold">Comments</h3>
          <hr className="pb-2" />
          {post.comments.map((comment) => (
            <div key={comment._id}>
              <p>
                <span className="font-medium text-[#ffc017]">
                  {comment.name}:
                </span>{' '}
                {comment.comment}
              </p>
            </div>
          ))}
        </div>
      </main>
    </>
  )
}

export default Post

// fetch data from sanity with current slugghy
export const getStaticPaths = async () => {
  const query = `*[_type == "post"]{
        _id,
        slug {
        current
        }
      }`

  const posts = await sanityClient.fetch(query)

  const paths = posts.map((post: Post) => ({
    params: {
      slug: post.slug.current,
    },
  }))

  return {
    paths,
    fallback: 'blocking',
  }
}

// get props for post from params
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const query = `*[_type == "post" && slug.current == $slug][0]{
        _id,
        _createdAt,
        title,
        author -> {
        name,
        image
        },
        'comments': *[
          _type == "comment" &&
          post._ref == ^._id &&
          approved == true],
        description,
        mainImage,
        slug,
        body
      }`

  const post = await sanityClient.fetch(query, {
    slug: params?.slug,
  })

  if (!post) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      post,
    },
    revalidate: 60,
  }
}
