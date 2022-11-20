/** @jsx jsx */
import { jsx } from "theme-ui"
import { graphql, Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import { RiArrowRightSLine } from "react-icons/ri"
import {
  RiFacebookBoxFill,
  RiTwitterFill,
  RiLinkedinBoxFill,
  RiYoutubeFill,
  RiInstagramFill,
  RiRssFill,
  RiGithubFill,
  RiTelegramFill,
  RiPinterestFill,
  RiSnapchatFill,
  RiSkypeFill,
  RiDribbbleFill,
  RiMediumFill,
  RiBehanceFill,
} from "react-icons/ri"
import { FaWordpress, FaVk } from "react-icons/fa"

import Layout from "../components/layout"
import BlogListHome from "../components/blog-list-home"
import Seo from "../components/seo"
import Site from "../utils/site.json"

export const pageQuery = graphql`
  query HomeQuery($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        title
        tagline
        featuredImage {
          childImageSharp {
            gatsbyImageData(layout: CONSTRAINED, width: 585, height: 439)
          }
        }
        cta {
          ctaText
          ctaLink
        }
      }
    }
    posts: allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { template: { eq: "blog-post" } } }
      limit: 6
    ) {
      edges {
        node {
          id
          excerpt(pruneLength: 250)
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            slug
            title
            featuredImage {
              childImageSharp {
                gatsbyImageData(layout: CONSTRAINED, width: 345, height: 260)
              }
            }
          }
        }
      }
    }
  }
`

const HomePage = ({ data }) => {
  const { markdownRemark, posts } = data // data.markdownRemark holds your post data
  const { frontmatter, html } = markdownRemark
  const Author = Site.meta.author ? Site.meta.author : ""
  const Image = Author ? Author.profile : ""
  const social_ids = Site.meta.social
  const _social_ids = Object.keys(social_ids)
  const sIcons = _social_ids.map((social_id, i) => {
    return (
      <div key={i}>
        {social_ids[social_id].title === "twitter" ? (
          <a
            href={social_ids[social_id].url + social_ids[social_id].username}
            target="_blank"
            aria-label="link to Twitter"
            rel="noopener noreferrer"
          >
            <RiTwitterFill alt="Twitter icon" />
          </a>
        ) : (
          ""
        )}
        {social_ids[social_id].title === "instagram" ? (
          <a
            href={social_ids[social_id].url + social_ids[social_id].username}
            target="_blank"
            aria-label="link to Instagram"
            rel="noopener noreferrer"
          >
            <RiInstagramFill alt="Instagram icon" />
          </a>
        ) : (
          ""
        )}
        {social_ids[social_id].title === "github" ? (
          <a
            href={social_ids[social_id].url + social_ids[social_id].username}
            target="_blank"
            aria-label="link to Github"
            rel="noopener noreferrer"
          >
            <RiGithubFill alt="Github icon" />
          </a>
        ) : (
          ""
        )}
      </div>
    )
  })
  return (
    <Layout>
      <Seo />
      <div className="home-banner grids col-1 sm-2">
        <div>
          <h1 className="title">{Site.meta.title}</h1>
          <p
            className="tagline"
            sx={{
              color: "muted",
            }}
          >
            {Author?.summary}
          </p>
          <div>{Site.meta.description}</div>
          <Link
            to={frontmatter.cta.ctaLink}
            className="button"
            sx={{
              variant: "variants.button",
            }}
          >
            {frontmatter.cta.ctaText}
            <span className="icon -right">
              <RiArrowRightSLine />
            </span>
          </Link>
          <div
            className="social-icons"
            sx={{
              variant: "variants.socialIcons",
            }}
          >
            {sIcons}
          </div>
        </div>
        <div>
          {Image ? (
            <img
              src={Image}
              width={500}
              height={350}
              className="featured-image"
              alt="Profile picture"
            />
          ) : (
            ""
          )}
        </div>
      </div>
      <BlogListHome data={posts} />
    </Layout>
  )
}

export default HomePage
