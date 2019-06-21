import React, { Component } from 'react'
import Helmet from 'react-helmet'
import { graphql, Link } from 'gatsby'

import ArticleList from '../components/ArticleList'
import config from '../../config'
import Layout from '../components/Layout'

const PaginationLink = props => {
  if (!props.isVisible) {
    return (
      <Link to={props.url}
        className='f5 no-underline black bg-animate hover-bg-black hover-white inline-flex items-center pa3 ba border-box'>
        <span className='pl1'>{props.text}</span>
      </Link>
    )
  } else {
    return (
      null
    )
  }
}

export default class IndexPage extends Component {
  render () {
    const { pageContext } = this.props
    const { group, index, first: hasFirstPage, last: hasLastPage } = pageContext
    const previousPageUrl = (index - 1) === 1 ? '/' : (index - 1).toString()
    const nextPageUrl = (index + 1).toString()

    const websiteSchemaOrgJSONLD = {
      '@context': 'http://schema.org',
      '@type': 'WebSite',
      url: config.siteUrl,
      name: config.siteTitle,
      alternateName: config.siteTitleAlt ? config.siteTitleAlt : '',
    }

    return (
      <Layout>
        <Helmet>
          <title>Home | The Leaky Cauldron Blog</title>
          {/* Schema.org tags */}
          <script type='application/ld+json'>
            {JSON.stringify(websiteSchemaOrgJSONLD)}
          </script>
          <link rel='canonical' href='https://theleakycauldronblog.com/' />
        </Helmet>
        <div>

          <ArticleList posts={group} />
          <div className='flex items-center justify-center pa4'>
            <PaginationLink isVisible={hasFirstPage}
              url={previousPageUrl}
              text='PREV'
            />
            <PaginationLink isVisible={hasLastPage}
              url={nextPageUrl}
              text='NEXT'
            />
          </div>
        </div>
      </Layout>
    )
  }
}
