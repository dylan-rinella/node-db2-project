const Cars = require('./cars-model')

const checkCarId = async (req, res, next) => {
  try {
    const car = await Cars.getById(req.params.id)
    if (!car) {
      res.status(404).json({message: `car with id:${req.params.id} does not exist`})
    } else {
      console.log(`Checking Car ID:${req.params.id}`)
      req.car = car
      next()
    }
  } catch (error) {
    next (error)
  }
}

const checkCarPayload = (req, res, next) => {
  if (!req.body) {
    res.status(400).json({message: `requires additional vehicle information`})
  } else {
    console.log('Payload meets criteria')
    next()
  }
}

const checkVinNumberValid = async (req, res, next) => {
  try {
    const car = await Cars.getById(req.params.id)
    if (!car.vin) {
      res.status(400).json({message: `Please provide a valid VIN`})
    } else {
      console.log(`Vin: ${car.vin} is valid`)
      req.car = car
      next()
    }
  } catch (error) {
    next(error)
  }
}

const checkVinNumberUnique = (req, res, next) => {
  // DO YOUR MAGIC
}


module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
}