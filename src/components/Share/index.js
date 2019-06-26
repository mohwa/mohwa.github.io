import React, { Component } from 'react'
import {
  FacebookShareButton,
  TwitterShareButton,
} from 'react-share'
import './Share.scss'
import config from '../../../config'

class Share extends Component {
  openShareModel (text, url) {
    navigator.share({
      title: document.title,
      text,
      url,
    });
  }

  render () {
    const { title, slug, excerpt } = this.props
    const realPrefix = config.pathPrefix === '/' ? '' : config.pathPrefix
    const url = config.siteUrl + realPrefix + slug

    const isSupportedNavigatorShare = navigator.share ? true : false
    let shareHtml


    if (isSupportedNavigatorShare) {
      shareHtml =
        <div className='Share flex justify-end pa3'>
          <a className='share-icon' onClick={ () => this.openShareModel(title, url) }></a>
        </div>
    } else {
      shareHtml =
        <div className='pv4 ph3 ph5-ns tc'>
          <div className='dib mr3' style={{ cursor: 'pointer' }}>
            <TwitterShareButton url={url} title={title}>
              <span className='link grow gray dib h1 h2-ns w1 w2-ns br-100 pa2 bg-near-white ba b--black-10'>
                <svg data-icon='twitter' viewBox='0 0 32 32' style={{ fill: 'currentcolor' }}>
                  <title>twitter icon</title>
                  <path
                    d='M2 4 C6 8 10 12 15 11 A6 6 0 0 1 22 4 A6 6 0 0 1 26 6 A8 8 0 0 0 31 4 A8 8 0 0 1 28 8 A8 8 0 0 0 32 7 A8 8 0 0 1 28 11 A18 18 0 0 1 10 30 A18 18 0 0 1 0 27 A12 12 0 0 0 8 24 A8 8 0 0 1 3 20 A8 8 0 0 0 6 19.5 A8 8 0 0 1 0 12 A8 8 0 0 0 3 13 A8 8 0 0 1 2 4' />
                </svg>
              </span>
            </TwitterShareButton>
          </div>
          <div className='dib mr3' style={{ cursor: 'pointer' }}>
            <FacebookShareButton url={url} quote={excerpt}>
              <span className='link grow gray dib h1 h2-ns w1 w2-ns br-100 pa2 bg-near-white ba b--black-10'>
                <svg data-icon='facebook' viewBox='0 0 32 32' style={{ fill: 'currentcolor' }}>
                  <title>facebook icon</title>
                  <path
                    d='M8 12 L13 12 L13 8 C13 2 17 1 24 2 L24 7 C20 7 19 7 19 10 L19 12 L24 12 L23 18 L19 18 L19 30 L13 30 L13 18 L8 18 z' />
                </svg>
              </span>
            </FacebookShareButton>
          </div>
        </div>
    }

    return shareHtml
  }
}

export default Share
