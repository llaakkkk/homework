'use strict'

const Router = require('koa-router')
const dogs = require('./dogs')
const { validate } = require('./utils/validations')
const log = require('./logger')

const router = new Router()

router.get('/', ctx => {
  ctx.body = 'Hello World From Router'
})

router.get('/dogs', ctx => {
  ctx.body = dogs
})

//read
router.get('/dogs/:id', ctx => {
  const dog = dogs.find(item => item.id === Number(ctx.params.id))
  ctx.body = dog

  if (!dog) {
    ctx.status = 404
    log.warn('No dog found')
  }
})
//create
router.post('/dogs', ctx => {
  const schema = {
    type: 'Object',
    required: true,
    additionalProperties: false,
    properties: {
      id: {
        type: 'integer',
        required: true,
      },
      name: {
        type: 'string',
        required: true,
      },
      breed: {
        type: 'string',
        required: true,
      },
      birthYear: {
        type: 'number',
      },
      photo: {
        type: 'string',
        format: 'url',
      },
    },
  }

  const validation = validate(ctx.request.body, schema)

  if (!validation.valid) {
    ctx.status = 400
    ctx.body = {
      errors: validation.errors,
    }

    return
  }

  dogs.push(ctx.request.body)
  ctx.body = dogs
})

//update
router.put('/dogs/:id', ctx => {
    const dog = dogs.find(item => item.id === Number(ctx.params.id))
    ctx.body = dog

    if (!dog) {
        ctx.status = 404
        log.warn('No dog found')
    }

  const schema = {
    type: 'Object',
    required: true,
    additionalProperties: false,
    properties: {
      name: {
        type: 'string',
        required: true,
      },
      breed: {
        type: 'string',
        required: true,
      },
      birthYear: {
        type: 'number',
      },
      photo: {
        type: 'string',
        format: 'url',
      },
    },
  }

  const validation = validate(ctx.request.body, schema)

  if (!validation.valid) {
    ctx.status = 400
    ctx.body = {
      errors: validation.errors,
    }

    return
  }

  let position = 0
  for (let i = dogs.length - 1; i--;) {
    if (dogs[i].id ===  Number(ctx.params.id)) {
        dogs.splice(i, 1)
        position = i
    }
  }
  const dogsId = {
      id: Number(ctx.params.id)
  }
    dogs.splice(dogs, position, { ...dogsId, ...ctx.request.body });
  ctx.body = dogs
})

//delete
router.delete('/dogs/:id', ctx => {

    const dog = dogs.find(item => item.id === Number(ctx.params.id))
    ctx.body = dog

    if (!dog) {
        ctx.status = 404
        log.warn('No dog found')
    }

    for (let i = dogs.length - 1; i--;) {
        if (dogs[i].id ===  Number(ctx.params.id)) {
            dogs.splice(i, 1)
        }
    }
    ctx.body = dogs
})

module.exports = router.routes()
