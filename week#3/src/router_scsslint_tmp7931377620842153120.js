'use strict'

const Router = require('koa-router')
const dogs = require('./dogs')
const {validate} = require('./utils/validations')
const log = require('./logger')

const router = new Router()

router.get('/', ctx => {
    ctx.body = 'Hello World From Router'
})

router.get('/dogs', ctx => {
    ctx.body = dogs
})

router.get('/dogs/:id', ctx => {
    const dog = dogs.find(item => item.id === Number(ctx.params.id))
    ctx.body = dog

    if (!dog) {
        ctx.status = 404
        log.warn('No dog found')
        return
    }
})

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

router.post('/dogs/:id', ctx => {
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

  
    for (var i = dogs.length - 1; i--;) {
        if (dogs[i].id === ctx.params.id)
            dogs.splice(i, 1);
    }

    // dogs.push(ctx.request.body)
    ctx.body = ctx.params.id
})

module.exports = router.routes()
