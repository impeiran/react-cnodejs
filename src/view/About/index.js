import React from 'react'
import styled from 'styled-components'

const AboutWrapper = styled.div`
  padding: 15px;
  color: #333;
  font-size: 14px;
  line-height: 1.4;

  p {
    margin-bottom: 15px;
  }
`

const About = () => {
  return (
    <AboutWrapper style={{ padding: '15px' }}>
      <p>CNode 社区为国内最大最具影响力的 Node.js 开源技术社区，致力于 Node.js 的技术研究。</p>
      <p>CNode 社区由一批热爱 Node.js 技术的工程师发起，目前已经吸引了互联网各个公司的专业技术人员加入，我们非常欢迎更多对 Node.js 感兴趣的朋友。</p>
      <p>CNode 的 SLA 保证是，一个9，即 90.000000%。</p>
      <p>社区目前由 @alsotang 在维护，有问题请联系：<a href='https://github.com/alsotang'>https://github.com/alsotang</a></p>
      <p>请关注我们的官方微博：<a href='http://weibo.com/cnodejs'>http://weibo.com/cnodejs</a></p>
    </AboutWrapper>
  )
}

export default About
