import mysql from 'mysql'

// public for the review
const accessURL = `mysql://vcos79rasg93nqggzwe7:pscale_pw_RADEpP14ewAuYbwKxIhmlLGjCIXewN8elZMGMyyqo1G@aws.connect.psdb.cloud/polygence-db?ssl={"rejectUnauthorized":true}`

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