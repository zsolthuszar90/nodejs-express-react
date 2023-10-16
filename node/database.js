import mysql from 'mysql'

// public for the review
const accessURL = `mysql://lc9dm5yj26dvxm9i2f7i:pscale_pw_KvRZpOxiy7ushFajeSLTdcp5NahLJmQKBrUopiZBzaU@aws.connect.psdb.cloud/polygence-db?ssl={"rejectUnauthorized":true}`

const connection = mysql.createConnection(accessURL)

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