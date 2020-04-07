import React from 'react'
import { graphql } from 'gatsby'
import orderBy from 'lodash/orderBy'
import parse from 'date-fns/parse'
import format from 'date-fns/format'
import Layout from '../components/layout'
import styles from '../styles/books.module.scss'
import SEO from '../components/seo'

const ReadingList = ({ data }) => {
  const { reading, toRead, finished } = data

  return (
    <Layout>
      <SEO title="Reading List" />
      <p className={styles.links}>
        <a href="#reading">Currently Reading</a> |{' '}
        <a href="#to-read">To Read</a> | <a href="#finished">Finished</a>
      </p>
      <div className="h-feed">
        <BooksSection
          title="Currently Reading"
          status="reading"
          reviews={reading.reviews}
        />
        <BooksSection
          title="To Read"
          status="to-read"
          reviews={toRead.reviews}
        />
        <BooksSection
          title="Finished"
          status="finished"
          reviews={finished.reviews}
        />
      </div>
    </Layout>
  )
}

const distantPast = new Date(1970)

const BooksSection = ({ title, status, reviews }) => {
  if (!reviews || reviews.length === 0) {
    return null
  }

  reviews = reviews.map(review => ({
    ...review,
    read_at: goodreadsDate(review.read_at),
    started_at: goodreadsDate(review.started_at)
  }))
  reviews = reviews.map(review => ({
    ...review,
    date: review.read_at || review.started_at
  }))
  reviews = orderBy(
    reviews,
    [r => r.read_at || distantPast, 'book.title_without_series'],
    ['desc', 'asc']
  )

  return (
    <section className={styles.section}>
      <h2 id={status}>{title}</h2>
      <ul className={styles.books}>
        {reviews.map(r => (
          <BookReview key={r.id} review={r} status={status} />
        ))}
      </ul>
    </section>
  )
}

const BookReview = ({ review, status }) => {
  return (
    <li className={`h-entry ${styles.book}`}>
      <div style={{ display: 'none' }} className="p-read-status">
        {status}
      </div>
      <figure>
        <a href={review.book.link}>
          <img
            src={review.book.small_image_url}
            alt={review.book.title_without_series}
          />
        </a>
      </figure>
      <div className={`p-read-of h-cite ${styles.info}`}>
        <a href={review.book.link} className={`p-name ${styles.title}`}>
          {review.book.title_without_series}
        </a>
        <a
          href={review.book.authors[0].link}
          className={`p-author ${styles.author}`}>
          {review.book.authors[0].name}
        </a>
      </div>
      <a href={review.link} className={`u-url ${styles.date}`}>
        {review.date && (
          <time className="dt-published" dateTime={review.date.toISOString()}>
            {format(review.date, 'MMM d, y')}
          </time>
        )}
      </a>
    </li>
  )
}

const goodreadsDateFormat = 'EEE MMM dd HH:mm:ss XX yyyy'

const goodreadsDate = date => {
  if (!date || date === '') {
    return null
  }

  return parse(date, goodreadsDateFormat, new Date())
}

export default ReadingList

export const query = graphql`
  query GetReadingList {
    reading: goodreadsShelf(name: { eq: "currently-reading" }) {
      ...shelfContents
    }
    toRead: goodreadsShelf(name: { eq: "to-read" }) {
      ...shelfContents
    }
    finished: goodreadsShelf(name: { eq: "read" }) {
      ...shelfContents
    }
  }

  fragment shelfContents on GoodreadsShelf {
    reviews {
      id
      rating
      started_at
      read_at
      link
      book {
        id
        title_without_series
        link
        small_image_url
        authors {
          name
          link
        }
      }
    }
  }
`
