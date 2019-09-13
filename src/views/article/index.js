import React, { useState, useEffect, useCallback, useRef } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { useMappedState } from 'redux-react-hook'

import { Button, Icon, Loader } from 'semantic-ui-react'
import { Toast } from 'antd-mobile'
import Carousel, { Modal, ModalGateway } from 'react-images'
import { format } from 'timeago.js'
import Avatar from '@/components/avatar'
import codePrettify from 'code-prettify'

import cnodeSDK from '@/utils/cnodeSDK.js'

import './article.scss'

const Article = props => {
  const { match } = props
  const { id } = match.params

  const [info, setInfo] = useState({})
  const [replies, setReplies] = useState([])
  const [hasRendered, setHasRendered] = useState(false)

  const [previewImgs, setPreviewImgs] = useState([])
  const [previewIndex, setPreviewIndex] = useState(false)
  const [showPreview, setShowPreview] = useState(false)

  const storeArticle = useMappedState(state => state.article) || {}
  const loginStatus = useMappedState(state => state.hasLogin)

  const $article = useRef()

  // 点击收藏
  const goCollect = async status => {
    if (!loginStatus) {
      Toast.fail('请点击右上角用户图标进行登录！', 1)
      return
    }

    let result
    if (status) {
      result = await cnodeSDK.deCollectTopic(id)
    } else {
      result = await cnodeSDK.collectTopic(id)
    }

    if (result.data.success) {
      setInfo({
        ...info,
        is_collect: !status
      })
    } else {
      Toast.fail('操作失败', 1)
    }
  }

  // 初始化图片预览
  const InitPreview = useCallback(
    () => {
      const imgs = []
      const doms = $article.current.querySelectorAll('img')
      doms.forEach((dom, idx) => {
        imgs.push({
          src: dom.src
        })
        dom.addEventListener('click', e => {
          e.stopPropagation()
          setPreviewIndex(idx)
          setShowPreview(true)
        })
      })
      setPreviewImgs(imgs)
    }, [])
  
  useEffect(() => {
    window.scrollTo(0, 0)

    const hasStoreInfo = Object.keys(storeArticle).length && storeArticle.id === id

    if (hasStoreInfo) {
      setInfo({
        ...storeArticle
      })

      // nextTick to fix the code highlight, will be modified soon
      setTimeout(() => {
        codePrettify.prettyPrint()
        InitPreview()
      }, 20)
    }

    // 存储并清除unmount之后的request
    let request = cnodeSDK.getTopicDetail(id)
    request.then(res => {
      const result = res.data.data
      const replies = result.replies.slice(0)

      delete result.replies
      
      setInfo(result)
      setReplies(replies)
      setHasRendered(true)
      InitPreview()
      codePrettify.prettyPrint()
    })

    return () => {
      request = null
    }
  }, [InitPreview, id, storeArticle])
  
  // 渲染评论
  const renderReplies = () => {
    if (!hasRendered) return (
      <Loader active inline='centered' size="medium">玩命加载中</Loader>
    )

    if (!replies.length) return (
      <div className="reply-item empty">
        暂无评论
      </div>
    )

    return (
      <div>
        <h4>共{replies.length}条评论：</h4>
        {
          replies.map( (item, index) => {
            return (
              <div
                className="reply-item"
                key={item.id}
              >
                <div className="reply-item-head">
                  <Avatar
                    target={item.author.loginname}
                    size={30}
                    src={item.author.avatar_url}
                  />
                  <ul className="reply-item-info">
                    <li>
                      <Link to={'/user/' + item.author.loginname}>
                        { item.author.loginname }
                        { item.author.loginname === info.author.loginname ? ' (作者)' : '' }
                      </Link>
                    </li>
                    <li>
                      { index + 1 }楼
                      &nbsp;&nbsp;&nbsp;
                      { format(info.create_at, 'zh_CN') }
                    </li>
                  </ul>

                  <div>
                    <Icon name={ item.is_uped ? 'thumbs up' : 'thumbs up outline' }/>
                    { item.ups.length }
                  </div>
                </div>
    
                <div className="markdown-body reply-item-body" dangerouslySetInnerHTML={{__html: item.content}}></div>
              </div>
            )
          })
        }
      </div>
    )
  }

  return (
    Object.keys(info).length
    ? <section className="article-page">
        <h1>{ info.title }</h1>
        <div className="article-head">
          <Avatar
            target={info.author.loginname}
            size={28}
            src={info.author.avatar_url}
          />

          <ul className="sub-bar">
            <li>{info.author.loginname}</li>
            <li>发布于{ format(info.create_at, 'zh_CN')  }</li>
            <li>{ info.visit_count }次浏览</li>
          </ul>

          <Button
            size="mini"
            loading={!hasRendered}
            color={ hasRendered && info.is_collect ? 'teal' : 'green'}
            onClick={ e => goCollect(info.is_collect) }
          >{ info.is_collect ? '已收藏' : '+ 收藏'}</Button>

        </div>

        <div ref={$article} className="markdown-body article-body" dangerouslySetInnerHTML={{__html: info.content}}></div>

        { renderReplies() }

        <ModalGateway>
        {showPreview ? (
          <Modal onClose={() => setShowPreview(false)}>
            <Carousel views={previewImgs} currentIndexNumber={previewIndex} />
          </Modal>
        ) : null}
        </ModalGateway>

      </section>
    : <Loader active inline='centered' size="medium">玩命加载中</Loader>
  )
}

export default withRouter(Article)

// index.js:1375 Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.
//     in Article (created by Context.Consumer)
//     in withRouter(Article) (created by Context.Consumer)