const express = require('express')

const Cars = require('./cars-model')

//middleware
const { checkCarId, checkCarPayload, checkVinNumberValid } = require('./cars-middleware')

const router = express.Router()

router.get('/', checkCarPayload, (req, res, next) => {
  Cars.getAll()
    .then(car => {
      res.status(200).json(car)
    })
    .catch(next)
})

router.get('/:id', checkCarId, checkVinNumberValid, (req, res, next) => {
  Cars.getById(req.params.id)
    .then(car => {
      res.status(200).json(car)
    })
    .catch(next)
})

router.post('/', checkCarPayload, (req, res, next) => {
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

