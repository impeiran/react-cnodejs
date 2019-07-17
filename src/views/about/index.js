import React from 'react'
import aboutList from '@/assets/about.json'

import './about.scss'

const About = () => {

  return (
    <section className="about-page">
      <h3>关于此项目</h3>
      <ul>
      {
        aboutList.map((item, index) => {
          return (
            <li key={index}>{ item }</li>
          )
        })
      }
      </ul>
    </section>
  )
}

export default About