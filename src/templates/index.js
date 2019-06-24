import React, { Component } from 'react'
import Helmet from 'react-helmet'

import ArticleList from '../components/ArticleList'
import config from '../../config'
import Layout from '../components/Layout'
import PageLink from '../components/Common/PageLink'

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
            { !hasFirstPage && <PageLink url={previousPageUrl} text='PREV' linkStyle={{ marginRight: '5px' }} /> }
            { !hasLastPage && <PageLink url={nextPageUrl} text='NEXT' linkStyle={{ marginLeft: '5px' }} /> }
          </div>
        </div>
      </Layout>
    )
  }
}
