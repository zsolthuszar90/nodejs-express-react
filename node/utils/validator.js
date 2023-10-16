import Joi from 'joi'

const schema = Joi.object({
  id: Joi.string().max(36),
  description: Joi.string().max(1000).required(),
  amount: Joi.number().positive().required(),
  currency: Joi.string().required()
})

const validator = (schema) => (payload) => 
  schema.validate(payload, { abortEarly: false })

export default validator(schema)