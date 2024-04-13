import React from 'react'
import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div className='py-20 px-8 max-6xl mx-auto'>
      <h1 className='text-5xl font-bold mb-4 text-blue-600 text-center' >About Memwa</h1>
      <h2 className='text-3xl text-slate-700 mb-4'>Our Story</h2>
      <p className='mb-4 text-slate-700'>Memwa was conceived after the passing of my maternal grandmother in 2020 during the covid shutdowns. My grandma and I had a deep realtionship, filled with many conversations ranging from her childhood stories to her points of view on thrash tv like Jerry springer. After her passing I missed being able to hear her voice, seeing her smile when she was telling a story and I feared that I would lose the stories and the details she use to tell and I would not be able to do them justice in attempting to retell them to my nieces and nephews. I had so few videos of our countless moments that I sunk into despair I lost her forever with not enough lasting memories. I may have missed out for my grandma but I could capture stories of all the other folks I loved. So I set out to create a way for stories to be captured and shared for future generations to come. I didn't want anyone else to lose out on the encyclopedic knowledge of our elders.</p>
      <p className='mb-4 text-slate-700'> As I began to dive deeper in the popoluation I found it wasn't just a memory preservation problem for me. The biggest population is the aging population, with the increased isolation and loneliness that comes with aging, nostalgia is often what offers a bit of happiness in their day. I wanted to provide a platform that could serve as a timecapsule, a meeting ground, a connector. So Memwa aims to be a key in providing that platform. I set out to build something that was simple, easy and accessible to that demographic. Secondly, the any generation can benefit from accessing a historical, encyclopedic-like vault of information, from the first hand accounts. The younger generations love retro, they love ancestry, they love anything that proves uniqueness or commonality that connects and unites them. </p>
      <p className='mb-4 text-slate-700'>I had all these little stories from my grandma about her helping people, but if I had to retell those stories I couldn't remember the little details that captivated me when she was telling them to me. I realized that I wished I had just recorded a few of them so I can have them to replay for myself and others that wanted to get to know who she was and how she helped shape me. I decided to work on something to help people capture stories in the most vivid way possible, video, where you can hear the  tone, see the body language and grasp the full effect of the stories being told from a first person point of view. I wanted to provide a way for people to tell their stories, to preserve their own history that could be passed down to future generations, a way for them to capture their own memoirs if you will. The capturing of these memories and leaving a 1st person pov memoire is why I chose the name "memwa". Memwa in creole, my native language, means memories, to remember and also serves are a homophone for the english word memoire. To put it simply, Memwa is about cpaturing memories from the most trusted source possible self, of historical events to be preserved and shared with those you love, all the little stories you don’t want to forget, the memories you can look back on they take you back to that moment. I hope you dive in to collect some of your memories.</p>
      <p className='mb-4 text-slate-700'>Memwa is still in its early stages, but we are committed to making Memwa the best video platform to preserve and share stories around the world. Feel free to reach out anytime with suggestions and comments at<span> </span>  
       <Link 
            to={`mailto:pascale@memwa.app?subject=Regarding Memwa app`}
            className='text-blue-500 underline hover:opacity-95'>
              pascale@memwa.app
      </Link> 
      </p>
    </div>
  )
}




