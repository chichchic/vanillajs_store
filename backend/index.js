import express from 'express';
import cors from 'cors'
import { list, options } from './data/list.js'

const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.get('/', (req, res) => {
  res.json(list)
})

app.get('/options', (req, res) => {
  const itemId = req.query.id
  res.json(options[itemId - 1])
})

app.listen(3000, () => console.log('server start'))