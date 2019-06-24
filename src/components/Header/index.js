import React from 'react'
import { Link } from 'gatsby'
import * as config from '../../../config'
// import Socials from '../Socials'

const Header = () => (
  <header className='bg-white black-80 tc pv4 avenir'>
    <h1 className='mt2 mb0 baskerville i fw1 f1'><Link className='link black-80' to='/'>{ config.siteTitle }</Link></h1>
    <h2 className='mt2 mb0 f6 fw4 ttu tracked'>{ config.siteSubTitle }</h2>
    <nav className='bt bb tc mw8 center mt4'>
      <Link className='f6 link black-80 dib pa3' to='/'>Home</Link>
      <Link className='f6 link black-80 dib pa3' to='/search'>Search</Link>
      {/*<Link className='f6 f5-l link bg-animate black-80 hover-bg-light-green dib pa3 ph4-l' to='/about'>About</Link>*/}
      {/*<Link className='f6 f5-l link bg-animate black-80 hover-bg-light-yellow dib pa3 ph4-l' to='/contact'>Contact</Link>*/}
    </nav>
  </header>
)

export default Header
