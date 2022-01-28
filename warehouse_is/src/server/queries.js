const Pool = require('pg').Pool
// const pool = new Pool({
//   user: 'ekwzgehq',
//   host: 'abul.db.elephantsql.com',
//   database: 'ekwzgehq',
//   password: 'wb2N6g8H5bJmREhfVMATYNom4V0xN3tn',
//   port: 5432,
// })

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'warehouse',
  password: 'iliga',
  port: 5432,
})

// const pool = new Pool({
//   user: 'postgres',
//   host: 'localhost',
//   database: 'warehouse',
//   password: 'admin',
//   port: 5432,
// })

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
  pool.query('SELECT * FROM racks WHERE zone_num=$1 ORDER BY code ASC', (request.query.code), (error, results) => {
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
  pool.query('SELECT * FROM shelfs WHERE rack_num=$1 ORDER BY code ASC', (request.query.code), (error, results) => {
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

const getOrderGoodsByOrder = (request, response) => {
  console.log(request.query.code)
  pool.query(`SELECT * FROM shipment_order_goods WHERE order_num=${request.query.code} ORDER BY code ASC`, (error, results) => {
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

const getClients = (request, response) => {
  pool.query('SELECT * FROM accounts ORDER BY code ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getGoodsTypeByCode = (request, response) => {
  pool.query(`SELECT * FROM goods_type WHERE code=${request.query.code} ORDER BY code ASC`, (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getGoodsType = (request, response) => {
  pool.query(`SELECT * FROM goods_type ORDER BY code ASC`, (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getCategories = (request, response) => {
  pool.query('SELECT * FROM goods_categories ORDER BY code ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getSubCategories2 = (request, response) => {
  pool.query('SELECT * FROM goods_subcategories_2 ORDER BY code ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getSubCategories3 = (request, response) => {
  pool.query('SELECT * FROM goods_subcategories_3 ORDER BY code ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getSubCategories4 = (request, response) => {
  pool.query('SELECT * FROM goods_subcategories_4 ORDER BY code ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getShelfSpace = (request, response) => {
  pool.query('SELECT * FROM shelf_space ORDER BY code ASC', (error, results) => {
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

const postNewUser = (request, response) => {
  const text = 'INSERT INTO accounts (name, surname, patronymic, login, password, phone_num, duty) VALUES ($1, $2, $3, $4, $5, $6, $7)'
 
  const values = [request.body.name, request.body.surname, request.body.patronymic, request.body.login, request.body.password, parseInt(request.body.phone_num), request.body.duty]
  console.log(values)

  pool.query(text, values, (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`User added with ID: ${results.insertId}`)
  })
}

const postGoodsToShelfSpace = (request, response) => {
  const text = 'INSERT INTO accounts (good, amount, shelf_num) VALUES ($1, $2, $3)'
 
  const values = [request.body.good, request.body.amount, request.body.shelf_num]
  console.log(values)

  pool.query(text, values, (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`User added with ID: ${results.insertId}`)
  })
}

const updateInventory = (request, response) => {
    pool.query('UPDATE goods_type SET status = $1', [request.query.status_text], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`User added with ID: ${results.insertId}`)
    })
}

const updateOrder = (request, response) => {
  pool.query('UPDATE shipment_order SET status = $1', [request.query.status_text], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`User added with ID: ${results.insertId}`)
  })
}

const updateOrderGoods = (request, response) => {
  pool.query('UPDATE shipment_order SET amount_real=$1', [request.query.amount], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`User added with ID: ${results.insertId}`)
  })
}

module.exports = {
  getColors,
  getZones,
  getRacks,
  getRacksByZone,
  getShelfs,
  getShelfsByRacks,
  getOrderGoods,
  getOrderGoodsByOrder,
  getOrders,
  getClients,
  getGoodsTypeByCode,
  getGoodsType,
  getCategories,
  getSubCategories2,
  getSubCategories3,
  getSubCategories4,
  getShelfSpace,
  setShelfs,
  postNewUser,
  postGoodsToShelfSpace,
  updateInventory,
  updateOrder,
  updateOrderGoods
}