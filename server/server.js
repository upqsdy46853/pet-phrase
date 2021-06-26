const express = require('express')
const app = express()
const port = 3000

const {startRecording, stopRecording} = require('./model/SpeechToText')

app.post('/api/record', (req, res) => {
  startRecording()
  res.send('record')
})

app.post('/api/stop', (req, res) => {
  stopRecording()
  res.send('stop')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
