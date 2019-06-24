import { Link } from 'gatsby'
import React from 'react'

export default class PageLink extends React.Component {
  render () {
    const { text, url, linkStyle } = this.props

    return (
      <Link
        to={url}
        className='f5 no-underline black items-center pa3 ba border-box'
        style={{
          borderRadius: '4px',
          color: '#dc46a4',
          ...linkStyle,
        }}>
        <span
          className='pl1'
          style={{
            fontSize: '1rem',
          }}>
          {text}
        </span>
      </Link>
    )
  }
}
