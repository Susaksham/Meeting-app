import React, { Fragment, useEffect, useState } from 'react'
import MeetupList from '../components/meetups/MeetupList'
import Layout from '../components/layout/Layout'
import { MongoClient } from 'mongodb'
import Head from 'next/head'

function HomePage(props) {
  return (
    <Fragment>
      <Head>
        <title>React Meetups</title>
        <meta
          name="description"
          content="Browse a huge list of highly active React meetups!"
        ></meta>
      </Head>
      <MeetupList meetups={props.meetups}></MeetupList>
    </Fragment>
  )
}
// export function getServerSideProps(context) {
//   const req = context.req
//   const res = context.res
//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   }
// }
export async function getStaticProps() {
  const client = await MongoClient.connect(
    'mongodb+srv://susaksham:SAKSHAM0000@cluster0.jrir8lq.mongodb.net/?retryWrites=true&w=majority',
  )
  const db = client.db('meetups')
  const meetupsCollection = db.collection('meetups')
  const meetups = await meetupsCollection.find().toArray()
  console.log(meetups)
  return {
    props: {
      meetups: meetups.map((meetup) => {
        return {
          title: meetup.title,
          address: meetup.address,
          image: meetup.image,
          id: meetup._id.toString(),
        }
      }),
    },
    revalidate: 1,
  }
}
export default HomePage
