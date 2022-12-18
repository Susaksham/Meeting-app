import React, { Fragment } from 'react'
import { useRouter } from 'next/router'
import MeetupDetail from '../../components/meetups/MeetupDetail'
import { MongoClient, ObjectId } from 'mongodb'
import Head from 'next/head'
// import { getStaticProps } from '..'

function MeetupDetails(props) {
  const router = useRouter()
  return (
    <Fragment>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name="description" content={props.meetupData.description}></meta>
      </Head>
      <MeetupDetail
        description={props.meetupData.description}
        address={props.meetupData.address}
        title={props.meetupData.title}
        image={props.meetupData.image}
      ></MeetupDetail>
    </Fragment>
  )
}
export async function getStaticPaths() {
  const client = await MongoClient.connect(
    'mongodb+srv://susaksham:SAKSHAM0000@cluster0.jrir8lq.mongodb.net/?retryWrites=true&w=majority',
  )
  const db = client.db('meetups')
  const meetupsCollection = db.collection('meetups')
  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray()
  client.close()
  // so this is for what kind of params we want to load the page
  return {
    fallback: false,
    paths: meetups.map((meetup) => {
      return {
        params: {
          meetupId: meetup._id.toString(),
        },
      }
    }),
  }
}
export async function getStaticProps(context) {
  const meetupId = context.params.meetupId
  const client = await MongoClient.connect(
    'mongodb+srv://susaksham:SAKSHAM0000@cluster0.jrir8lq.mongodb.net/?retryWrites=true&w=majority',
  )
  const db = client.db('meetups')
  const meetupsCollection = db.collection('meetups')

  // this is to convert the id into objectId
  const selectedMeetup = await meetupsCollection.findOne({
    _id: ObjectId(meetupId),
  })
  console.log(meetupId)
  console.log(selectedMeetup)
  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        image: selectedMeetup.image,
        description: selectedMeetup.description,
      },
    },
  }
}

export default MeetupDetails
