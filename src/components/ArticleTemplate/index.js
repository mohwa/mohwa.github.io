import React from 'react'
import { Link } from 'gatsby'
import _ from 'lodash'
import Img from 'gatsby-image'
import './styles.sass'
import 'prismjs/themes/prism-tomorrow.css'
import config from '../../../config'
import Content from '../Content'
import PageLink from '../Common/PageLink'

const ArticleTemplate = ({
  content,
  date,
  contentComponent,
  cover,
  tags,
  title,
  prevNode,
  nextNode,
}) => {
  const PostContent = contentComponent || Content

  return (
    <article className='baskerville pb3'>
      <section className='mw8 center'>
        <header className='avenir tc-l ph3 ph4-ns pt4 pt5-ns'>
          <h1 className='f3 f2-m f-subheadline-l measure lh-title fw1 mt0'>{title}</h1>
          <div className='flex db mb4'>
            <time className='f5 f4-l db fw1 baskerville mb4-l mb2'>{config.userName} | {date}</time>
            <div className='inline-flex flex-wrap'>
              {tags && tags.length &&
                tags.map(tag => (
                  <Link
                    to={`/tags/${_.kebabCase(tag)}`}
                    key={tag}
                    className='no-underline black dim avenir'>
                    <small className='f6 f4-l fw1'>#{tag}&nbsp;&nbsp;</small>
                  </Link>
                ))}
            </div>
          </div>
        </header>
      </section>
      {!!cover && !!cover.childImageSharp
        ? <Img className='w-100 dib f3'
          fluid={cover.childImageSharp.fluid}
          alt={title} />
        : <img className='w-100 dib f3'
          src={cover.publicURL}
          alt={title} />
      }
      <section className='mw8 center'>
        <div className='ph3 ph4-m ph5-l'>
          <PostContent content={content} className={'measure db center f5 f4-ns lh-copy'} />
          <div
            className='flex items-center pa4'
            style={{
              justifyContent: 'space-between',
              flexWrap: 'wrap',
            }}>
            { prevNode && <PageLink text={prevNode.frontmatter.title} url={prevNode.fields.slug} linkStyle={{ marginBottom: '10px' }} /> }
            { nextNode && <PageLink text={nextNode.frontmatter.title} url={nextNode.fields.slug} /> }
          </div>
        </div>
      </section>
    </article>
  )
}

export default ArticleTemplate
