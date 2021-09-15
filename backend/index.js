import express from 'express';
import cors from 'cors'
import path from 'path';

import { list, options } from './data/list.js'

const __dirname = path.resolve();
const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use('/static', express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.json(list)
})

app.get('/options', (req, res) => {
  const itemId = req.query.id
  const listIndex = list.findIndex(({ id }) => id == itemId);
  const result = { ...list[listIndex], options: options[itemId - 1] }
  res.json(result)
})

app.listen(3000, () => console.log('server start'))