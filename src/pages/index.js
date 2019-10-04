import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'
import Layout from '../components/Layout'

export default class IndexPage extends React.Component {
  render() {
    const { data } = this.props
    const { edges: posts } = data.allMarkdownRemark
    return (
      <Layout>
        <section className="section">
          <div className="container">
            <div className="content-title">
              {/* <h1 className="has-text-weight-bold" style={{ fontSize: "30px", fontFamily: "Playfair Display SC, serif" }}>Blog Posts</h1> */}
            </div>
            <div className="container">
            {posts
              .map(({ node: post }) => (
                <div
                  className="content"
                  style={{ border: '1px solid #cecfd0' }}
                  key={post.id}
                >
                  <p>
                  
                    <Link className="post-title" to={post.fields.slug}>
                      {post.frontmatter.title}
                    </Link>
                    {/* <span> &bull; </span> */}
                    <small className="post-date-all">{post.frontmatter.date}</small>
                  </p>
                  {/* <p> */}
                    {/* {post.excerpt} */}
                    {/* <Link className="button is-small" to={post.fields.slug}>
                      Keep Reading →
                    </Link> */}
                  {/* </p> */}
                </div>
              ))}
              </div>
          </div>
        </section>
      </Layout>
    )
  }
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] },
      filter: { frontmatter: { templateKey: { eq: "blog-post" } }}
    ) {
      edges {
        node {
          excerpt(pruneLength: 400)
          id
          fields {
            slug
          }
          frontmatter {
            title
            templateKey
            date(formatString: "MMMM DD, YYYY")
          }
        }
      }
    }
  }
`
