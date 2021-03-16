const express = require('express')

const Cars = require('./cars-model')

const router = express.Router()

router.get('/', (req, res, next) => {
  Cars.getAll()
    .then(car => {
      res.status(200).json(car)
    })
    .catch(next)
})

router.get('/:id', (req, res, next) => {
  Cars.getById(req.params.id)
    .then(car => {
      res.status(200).json(car)
    })
    .catch(next)
})

router.post('/', (req, res, next) => {
  Cars.create(req.body)
    .then(car => {
      res.status(201).json(car)
    })
    .catch(next)
})

//catch all
router.use((err, req, res, next) => { // eslint-disable-line
  res.status(400).json({
    message: err.message,
    stack: err.stack,
    custom: 'something went terrible in the cars router',
  })
})

module.exports = router

