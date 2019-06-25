import { Link } from 'gatsby'
import React from 'react'
import './PageLink.scss'

export default class PageLink extends React.Component {
  render () {
    const { text, url, linkStyle } = this.props

    return (
      <Link
        to={url}
        className='PageLink f5 no-underline items-center pa3 ba border-box'
        style={{
          ...linkStyle,
        }}>
        <span className='title pl1'>{text}</span>
      </Link>
    )
  }
}
