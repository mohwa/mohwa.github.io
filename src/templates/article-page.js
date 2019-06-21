import React from 'react'
import PropTypes from 'prop-types'
import { graphql, Link } from 'gatsby'
import { HTMLContent } from '../components/Content'
import ArticleTemplate from '../components/ArticleTemplate'
import SE0 from '../components/SEO'
import Disqus from '../components/Disqus'
import Share from '../components/Share'
import Layout from '../components/Layout'

const PaginationLink = ({ node }) => {
  if (node) {
    const {
      title,
    } = node.frontmatter
    const { slug } = node.fields

    return (
      <Link
        to={ slug }
        className='f5 no-underline black bg-animate hover-bg-black hover-white inline-flex items-center pa3 ba border-box'
        style={{ borderRadius: '4px' }}>
        <span
          className='pl1'
          style={{ width: '5rem', height: '1rem', textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}
        >{ title }</span>
      </Link>
    )
  } else {
    return (
      null
    )
  }
}

const ArticlePage = ({ data, pageContext, }) => {
  const {
    frontmatter: frontMatter,
    fields,
    html,
  } = data.markdownRemark

  const {
    prevNode,
    nextNode,
  } = pageContext

  const {
    title,
    meta_title,
    meta_description,
    cover,
    date,
    tags
  } = frontMatter
  return (
    <Layout>
      <section className='center'>
        <SE0
          title={title}
          meta_title={meta_title}
          meta_desc={meta_description}
          cover={cover.publicURL}
          slug={fields.slug}
          date={date}
        />
        <ArticleTemplate
          content={html}
          contentComponent={HTMLContent}
          date={date}
          cover={cover}
          tags={tags}
          title={title}
        />
        <section className='mw8 center'>
          <Share title={title} slug={fields.slug} excerpt={meta_description} />
          <div
            className='flex items-center justify-center pa4'
            style={{ justifyContent: 'space-around' }}
          >
            <PaginationLink node={ prevNode } />
            <PaginationLink node={ nextNode }  />
          </div>
          <Disqus title={title} slug={fields.slug} />
        </section>
      </section>
    </Layout>
  )
}

ArticlePage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
}

export default ArticlePage

export const pageQuery = graphql`
    query ArticleByID($id: String!) {
        markdownRemark(id: { eq: $id }) {
            id
            html
            fields {
                slug
            }
            frontmatter {
                date(formatString: "MMMM DD, YYYY")
                title
                cover {
                    childImageSharp {
                        fluid(maxWidth: 1075, quality: 72) {
                            ...GatsbyImageSharpFluid
                        }
                    }
                    publicURL
                }
                meta_title
                meta_description
                tags
            }
        }
    }
`
