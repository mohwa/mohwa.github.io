import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { HTMLContent } from '../components/Content'
import ArticleTemplate from '../components/ArticleTemplate'
import SE0 from '../components/SEO'
import Utterances from '../components/comments/Utterances'
import Share from '../components/Share'
import Layout from '../components/Layout'
import TextResizer from '../components/TextResizer'

const ArticlePage = ({ data, pageContext }) => {
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
    tags,
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
        <TextResizer />
        <ArticleTemplate
          content={html}
          contentComponent={HTMLContent}
          date={date}
          cover={cover}
          tags={tags}
          title={title}
          prevNode={prevNode}
          nextNode={nextNode}
        />
        <section className='mw8 center'>
          <Share title={title} slug={fields.slug} excerpt={meta_description} />
          <Utterances />
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
                date(formatString: "YYYY/MM/DD hh:mm")
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
