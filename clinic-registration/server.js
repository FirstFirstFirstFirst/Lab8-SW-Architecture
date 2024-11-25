const { PrismaClient } = require("@prisma/client");
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

if (process.env.NODE_ENV !== 'production') {
  const cors = require('cors')
  app.use(cors());
}

const prisma = new PrismaClient()

app.post('/api/registration/new-patient/', async (req, res) => {
  try {
    const patient = await prisma.Patient.create({data: req.body,})
    res.json(patient)
  }catch(error) {
    res.status(400).json(error);
  }
})

app.get('/api/registration/patient/:pId', async(req, res) => {
  try {
    const patient = await prisma.Patient.findUnique({
      where: {
        id: parseInt(req.param('pId'))
      }
    })
    res.json(patient)
  } catch(error) {
    res.status(400).json(error)
  }
})

app.listen(PORT, () => {
  console.log(`Listening at ${PORT}`);
});
