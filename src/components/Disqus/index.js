import React, { Component } from 'react'
// import ReactDisqusComments from 'react-disqus-comments'
import config from '../../../config'

class Disqus extends Component {
  constructor (props) {
    super(props)
    this.state = {
      toasts: [],
    }
    this.notifyAboutComment = this.notifyAboutComment.bind(this)
    this.onSnackbarDismiss = this.onSnackbarDismiss.bind(this)
  }

  onSnackbarDismiss () {
    const [, ...toasts] = this.state.toasts
    this.setState({ toasts })
  }

  notifyAboutComment () {
    const toasts = this.state.toasts.slice()
    toasts.push({ text: 'New comment available!' })
    this.setState({ toasts })
  }

  render () {
    // const { title, slug } = this.props
    if (!config.disqusShortname) {
      return null
    }
    // const url = config.siteUrl + slug
    return (
      <section className='mb3 pa3 pa5-l center'>
        <script src='https://utteranc.es/client.js'
                repo='mohwa/mohwa.github.io'
                issue-term='pathname'
                theme='github-light'
                crossOrigin='anonymous'
                async>
        </script>
      </section>
    )
  }
}

export default Disqus
