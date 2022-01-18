const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'warehouse',
  password: 'admin',
  port: 5432,
})

pool.connect((err, client, release) => {
    if (err) {
      return console.error('Error acquiring client', err.stack)
    }
    client.query('SELECT NOW()', (err, result) => {
      release()
      if (err) {
        return console.error('Error executing query', err.stack)
      }
      console.log(result.rows)
    })
})

const getColors = (request, response) => {
    console.log("You're here")
    pool.query('SELECT name FROM colors ORDER BY code ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
}

const getZones = (request, response) => {
  pool.query('SELECT name FROM zones ORDER BY code ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getRacks = (request, response) => {
  pool.query('SELECT * FROM racks ORDER BY code ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getRacksByZone = (request, response) => {
  pool.query('SELECT * FROM racks ORDER BY code ASC WHERE ', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getShelfs = (request, response) => {
  pool.query('SELECT * FROM shelfs ORDER BY code ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getShelfsByRacks = (request, response) => {
  pool.query('SELECT * FROM shelfs ORDER BY code ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getOrderGoods = (request, response) => {
  pool.query('SELECT * FROM shipment_order_goods ORDER BY code ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getOrders = (request, response) => {
  pool.query('SELECT * FROM shipment_order ORDER BY code ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const setShelfs = (request, response) => {
    const text = 'INSERT INTO shelfs (name, shelf_num, rack_num, capacity, shelf_space) VALUES ($1, $2, $3, $4, $5)'
    let shelf_space = parseInt(request.body.shelf_space)
    if (isNaN(shelf_space)) shelf_space = null
    const values = [request.body.name, request.body.shelf_num, parseInt(request.body.rack_num), parseInt(request.body.capacity), shelf_space]
    console.log(values)
  
    pool.query(text, values, (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`User added with ID: ${results.insertId}`)
    })
}

module.exports = {
  getColors,
  getZones,
  setShelfs}