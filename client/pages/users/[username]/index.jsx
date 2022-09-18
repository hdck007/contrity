import { Head } from 'next/head'
import { Link } from 'next/link'
import React, { useRef, useState } from 'react'
import fetchApi from '../../../lib/github/fetchApi';

function UserInfo({ username, pulls }) {
  
  return (
    <main className='mx-20 my-4'>
    {/* <span className='w-fit p-3 flex gap-2 cursor-pointer rounded-xl hover:bg-purple-400'>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
    </svg><p>Back</p>
    </span> */}
    <div className="flex flex-row justify-between">
      <p className='my-20 text-4xl font-semibold'>{username}'s PRs</p>
      <span className="flex items-center" >
        <button className="hover:bg-purple-400 btn btn-ghost h-100"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 mx-2">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
</svg>
 Sign Out</button>
      </span>
    </div>

      {pulls.items.map(pull => (
          <button 
            className="my-3 card border-2 lg:card-side bg-base-100 w-full cursor-pointer hover:bg-purple-400 hover:text-white"
            >
              <div className="card-body">
                <h2 className="card-title">{pull.title}</h2>
              </div>
              {ArrowElement}
          </button>
      ))}
    </main>
  )
}

const ArrowElement = (<div className="px-3 h-100 flex card-actions items-center justify-center transition duration-150 ease-out hover:ease-in">
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-10 h-10">
  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
</svg>
</div>);



export const getServerSideProps = async (context) => {
  const {username} = context.params;
  const pulls = await fetchApi(`https://api.github.com/search/issues?q=author%3A${username}+type%3Apr`);
  return {
    props: {
      username,
      pulls
    }
  }
}

export default UserInfo