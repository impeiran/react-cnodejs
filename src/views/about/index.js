import React from 'react'
import './about.scss'

const About = () => {
  return (
    <section className="about-page">
      <h3>关于此项目</h3>
      <ul>
        <li>拥抱新特性，使用React 16 Hooks全面编写，封装多个基础Hook</li>
        <li>自行实现多种常见交互，下拉刷新上拉加载等等</li>
        <li>作者chaser，wechat: peiran0502</li>
      </ul>
    </section>
  )
}

export default About