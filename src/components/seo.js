import React from 'react'
import { Helmet } from 'react-helmet'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'

const SEO = ({ title, description, author, lang }) => (
  <StaticQuery
    query={query}
    render={({
      site: {
        siteMetadata: {
          defaultTitle,
          defaultDescription,
          defaultAuthor,
          defaultLang,
        },
      },
    }) => {
      const seo = {
        title: title || defaultTitle,
        description: description || defaultDescription,
        author: author || defaultAuthor,
        lang: lang || defaultLang,
      }
      return (
        <>
          <Helmet title={seo.title}>
            <html lang={seo.lang} />
            {seo.title && <meta property="og:title" content={seo.title} />}
            <meta name="description" content={seo.description} />
            {seo.description && (
              <meta property="og:description" content={seo.description} />
            )}
            <meta name="author" content={seo.author} />
            {seo.author && <meta property="og:author" content={seo.author} />}
          </Helmet>
        </>
      )
    }}
  />
)

export default SEO

const query = graphql`
  query SEO {
    site {
      siteMetadata {
        defaultTitle: title
        defaultDescription: description
        defaultAuthor: author
        defaultLang: lang
      }
    }
  }
`

SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  author: PropTypes.string,
  lang: PropTypes.string,
}

SEO.defaultProps = {
  title: null,
  description: null,
  author: null,
  lang: null,
}
