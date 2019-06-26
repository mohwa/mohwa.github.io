import React from 'react'

const UTTERANCES_SCRIPT_URL = 'https://utteranc.es/client.js'
const GIT_HUB_REPO = 'mohwa/mohwa.github.io'
const ISSUE_TERM = 'pathname'

class Utterances extends React.Component {
  commentElem = React.createRef()

  componentDidMount () {
    const utterances = document.createElement('script')
    const utterancesConfig = {
      src: UTTERANCES_SCRIPT_URL,
      repo: GIT_HUB_REPO,
      async: true,
      'issue-term': ISSUE_TERM,
    }

    Object.keys(utterancesConfig).forEach(k => {
      utterances.setAttribute(k, utterancesConfig[k])
    })

    this.commentElem.current.appendChild(utterances)
  }

  render () {
    return (
      <div className="utterances" ref={this.commentElem} />
    )
  }
}

export default Utterances
