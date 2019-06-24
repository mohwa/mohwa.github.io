import React from 'react'

const Footer = ({ config }) => {
  return (
    <footer
      className='pa4 pa5-l black-70 bt b--black-10 mw8 center pv5'
      style={{ textAlign: 'center' }}>
      <div className='dt dt--fixed w-100'>
        <div className='dn dtc-ns v-mid'>
          <p className='f7 black-70 dib pr3 mb3'>
            <a className='link black hover-purple' href='https://github.com/mohwa' target='_blank' rel='mohwa on Github'>@mohwa</a>
          </p>
        </div>
      </div>
      <div className='db dn-ns'>
        <p className='f7 black-70 mt4 tc'>
          <a className='link black hover-purple' href='https://github.com/mohwa' target='_blank' rel='mohwa on Github'>@mohwa</a>
        </p>
      </div>
    </footer>
  )
}

export default Footer
