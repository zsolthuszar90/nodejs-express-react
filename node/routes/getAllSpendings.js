import { Router } from 'express'
import { db } from '../database.js';
import { tryCatch } from '../utils/tryCatch.js';

const router = Router()

export default router.get("/spendings", 
  tryCatch(async (req, res) => {
    const { results } = await db.query(`SELECT * FROM spendings`)

    res.send(results);
  })
);