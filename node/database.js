import mysql from 'mysql'
import 'dotenv/config'

const connection = mysql.createConnection(process.env.DATABASE_URL)

export const db = {
  connect: () => connection.connect(),
  query: (queryString, escapedValues) => new Promise((resolve, reject) => {
    connection.query(queryString, escapedValues, (error, results, fields) => {
      if (error) reject(error)
      resolve({results, fields})
    })
  }),
  end: () => connection.end()
}