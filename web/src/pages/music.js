import React from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import Layout from '../components/layout'
import GraphQLErrorList from '../components/graphql-error-list'
import SEO from '../components/seo'
import * as styles from '../styles/music.module.scss'
import { mapEdgesToNodes } from '../lib/helpers'

export const query = graphql`
  query MusicPageQuery {
    albums: allSanityMusicAlbum(sort: { fields: name, order: ASC }) {
      edges {
        node {
          name
          artist
          url
          image {
            asset {
              fixed(width: 300) {
                ...GatsbySanityImageFixed
              }
            }
            alt
          }
        }
      }
    }
  }
`

const MusicPage = ({ data, errors }) => {
  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    )
  }

  const albumNodes = data && data.albums && mapEdgesToNodes(data.albums)

  return (
    <Layout>
      <SEO title="Music I Like" />
      <article className="h-entry">
        <h2 className="p-name">Music I Like</h2>
        <div className="e-content">
          <p>
            When somebody asks me about my taste in music, I panic a little bit.
            I like music, sometimes a little, sometimes a lot. I have no idea
            how to summarize it, though. I don't really think about how to
            describe it, and it's always changing.
          </p>
          <p>Anyway, here are some albums I like.</p>
          <div className={styles.albums}>
            {albumNodes.map(album => (
              <div
                key={`${album.name}-${album.artist}`}
                className={styles.album}>
                <div>
                  <a href={album.url}>
                    <Img
                      fixed={album.image.asset.fixed}
                      alt={album.image.alt}
                    />
                  </a>
                </div>
                <div>
                  <em>{album.name}</em>
                </div>
                <div className={styles.artist}>{album.artist}</div>
              </div>
            ))}
          </div>
        </div>
      </article>
    </Layout>
  )
}

export default MusicPage
