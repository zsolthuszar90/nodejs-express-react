import { Router } from 'express'
import { db } from '../database.js';
import { v4 as uuid } from 'uuid'
import { tryCatch } from '../utils/tryCatch.js';
import validator from '../utils/validator.js';

const router = Router()

export default router.post("/spendings",
  tryCatch( async (req, res) => {

    const { error } = validator(req.body)
    if (error) throw error

    const { id = uuid(), description, amount, currency } = req.body

    // date is generated in DB
    await db.query(`
      INSERT INTO spendings (id, description, amount, currency, spent_at)
        VALUES(?, ?, ?, ?, ?)
    `, [id, description, amount, currency, new Date()])

    const { results } = await db.query(`SELECT * FROM spendings`)
    res.send(results);
  })
);