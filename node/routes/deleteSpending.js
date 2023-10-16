import { Router } from 'express'
import { db } from '../database.js';
import { tryCatch } from '../utils/tryCatch.js';

const router = Router()

export default router.delete("/spendings/:id", 
  tryCatch(async (req, res) => {
    const { id } = req.params
    await db.query(`DELETE FROM spendings WHERE id=?`, [id])

    const { results } = await db.query(`SELECT * FROM spendings`)

    res.send(results);
  })
);