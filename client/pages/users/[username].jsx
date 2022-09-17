import { Head } from 'next/head'
import React, { useRef, useState } from 'react'
import fetchApi from '../../lib/github/fetchApi';

const UserInfo = ({ username, repos }) => {
  
  return (
    <>
    <main className='mx-20 my-4'>
    {/* <span className='w-fit p-3 flex gap-2 cursor-pointer rounded-xl hover:bg-purple-400'>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
    </svg><p>Back</p>
    </span> */}
      <p className='my-20 text-4xl font-semibold'>{username}'s Repos</p>

      {repos.map(repo => (
        <div 
          className="my-3 card border-2 lg:card-side bg-base-100 cursor-pointer hover:bg-purple-400 hover:text-white"
          >
          <div className="card-body">
            <h2 className="card-title">{repo.full_name}</h2>
          </div>
          {ArrowElement}
        </div>
      ))}
    </main>
    </>
  )
}

const ArrowElement = (<div className="px-3 h-100 flex card-actions items-center justify-center transition duration-150 ease-out hover:ease-in">
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10">
  <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
</svg>
</div>);
export const getStaticPaths = () => {
  return {
    paths: [{params: {username: 'harshalkaigaonkar'}}],
    fallback: false
  }
}

export const getStaticProps = async (context) => {
  const username = context.params.username;
  const repos = await fetchApi(`https://api.github.com/users/${username}/repos`);
  return {
    props: {
      username,
      repos
    }
  }
}

export default UserInfo