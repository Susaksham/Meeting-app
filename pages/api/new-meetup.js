import { MongoClient } from 'mongodb'

//api/new-meetup

async function handler(req, res) {
  console.log(req.body)
  if (req.method === 'POST') {
    const data = req.body
    // console.log(data)

    const client = await MongoClient.connect(
      'mongodb+srv://susaksham:SAKSHAM0000@cluster0.jrir8lq.mongodb.net/?retryWrites=true&w=majority',
    )
    const db = client.db('meetups')
    const meetupsCollection = db.collection('meetups')
    const result = await meetupsCollection.insertOne(data)
    console.log(result + 'api result')
    client.close()
    res.status(201).json({ message: 'data added successfully' })
  }
}
export default handler
//SAKSHAM0000
