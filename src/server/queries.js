const Pool = require('pg').Pool

const pool = new Pool({
  user: 'test_user',
  host: '176.53.182.224',
  database: 'test_base',
  password: 'testuser',
  port: 54322,
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
  pool.query('SELECT * FROM orders WHERE order_status= ORDER BY code ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getShipmentOrderGoods = (request, response) => {
  var orders = []
  var sell_orders = []
  pool.query(`SELECT id FROM orders WHERE order_status LIKE '%${request.query.type}%' ORDER BY id ASC`, (error, results) => {
    if (error) {
      throw error
    }  
    orders = results.rows
  
    pool.query(`SELECT * FROM shipment_order WHERE status LIKE '%${request.query.status}%' ORDER BY code ASC`, (error, results) => {
    
      if (error) {
        throw error
      }
      results.rows.map(element => {
        orders.map(pos =>{
          if (pos.id == element.order_id) {
            sell_orders.push(element) 
          }
        })
      });
      response.status(200).json(sell_orders)
    })
  })
}

const getShipmentOrderGoodsByOrderId = (request, response) => {
  var shipment_orders = []

  pool.query(`SELECT * FROM shipment_order WHERE order_id=${request.query.order_id} AND status LIKE '%${'opened'}%' ORDER BY code ASC`, (error, results) => {
    if (error) {
      throw error
    }  
    shipment_orders = results.rows

    shipment_orders.map(function(order, i){
      pool.query(`SELECT * FROM shipment_order_goods WHERE order_num=${order.code} ORDER BY code ASC`, (error, results) => {
        if (error) {
          throw error
        }  
        const answer = results.rows
        if (answer.length == 0) {
          order.status_fullness = 'Пустой'
        } else {
          order.status_fullness = 'Ожидается'
        }
        if (shipment_orders.length-1 == i) response.status(200).json(shipment_orders)
      })
    })
  })

  // var goods_type = []

  // pool.query(`SELECT code, name FROM goods_type ORDER BY code ASC`, (error, results) => {
  //   if (error) {
  //     throw error
  //   }  
  //   goods_type = results.rows
  //   var iterator = 0
  //   shipment_orders.map(function(order,i){
  //     if (order.goods != undefined) {
  //       order.goods.map(function(good, j){
  //         goods_type.map(function(item,k){
  //           if (item.name == good.name)  good.goods = results.rows[0].name
  //         })
  //       })
  //       iterator++
  //       if (iterator == order.goods.length || order.goods.length-1 == iterator)response.status(200).json(shipment_orders)
  //     }
  //   })
  // })
 
}

const getShipmentOrderGoodsAll = (request, response) => {
  pool.query('SELECT * FROM public.shipment_order_goods ORDER BY code ASC ', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getOrderGoodsByShipmentOrder = (request, response) => {

  pool.query(`SELECT * FROM shipment_order_goods WHERE order_num=${request.query.code} ORDER BY code ASC`, (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getOrders = (request, response) => {
  pool.query(`SELECT * FROM orders WHERE order_status LIKE '%${request.query.type}%' AND status_execution LIKE '%${request.query.status}%' ORDER BY id ASC`, (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getOrdersAll = (request, response) => {
  pool.query(`SELECT * FROM orders WHERE status_execution LIKE '%${request.query.status}%' ORDER BY id ASC`, (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getOrdersGoods = (request, response) => {
  var order = parseInt(request.query.order_id)
  pool.query(`SELECT * FROM order_goods WHERE order_id=${order} ORDER BY id ASC`, (error, results) => {
    if (error) {
      throw error
    }
    const order_goods = results.rows

    pool.query(`SELECT * FROM goods_type ORDER BY code ASC`, (error, results) => {
      if (error) {
        throw error
      }
      var goods = []
      var buffer = results.rows
      buffer.forEach(element => {
        order_goods.map(function(id, i) {
          if (element.code == id.good_id) {
            goods.push(element)
            goods[goods.length-1].amount = id.amount
            goods[goods.length-1].price = id.price_one
          }

        });
      });
      response.status(200).json(goods)
    })

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

const getGoodsTypeWithCat = (request, response) => {
  pool.query('SELECT * FROM goods_categories ORDER BY code ASC', (error, results) => {
    if (error) {
      throw error
    }
    const categories = results.rows

    pool.query('SELECT * FROM goods_subcategories_2 ORDER BY code ASC', (error, results) => {
      if (error) {
        throw error
      }
      const subcategories = results.rows

      pool.query(`SELECT * FROM goods_type ORDER BY code ASC`, (error, results) => {
        if (error) {
          throw error
        }
        
        var goods = results.rows
        goods.forEach(element => {
          categories.forEach(category => {
            if (category.code == element.category) element.category = category.name
          });
          
          subcategories.forEach(subcategory => {
            if (subcategory.code == element.subcategory_2) element.subcategory_2 = subcategory.name
          });
        });
        response.status(200).json(goods)
      })
    })
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
  const textINSERT = 'INSERT INTO accounts (name, surname, patronymic, login, password, phone_num, duty) VALUES ($1, $2, $3, $4, $5, $6, $7)'
  const textUPDATE = 'UPDATE accounts SET name=$1, surname=$2, patronymic=$3, login=$4, password=$5, phone_num=$6, duty=$7 WHERE code=$8'
  const textDELETE = 'DELETE FROM accounts WHERE code=$1'
  var accounts = []
  //console.log(Object.values(request.body)[0][2])
  var accounts_added = request.body

  pool.query('SELECT * FROM accounts ORDER BY code ASC', (error, results) => {
    if (error) {
      throw error
    }
    accounts = results.rows

    accounts.map(function(elementDB, i) {
      var check = false
      accounts_added.map(function(element, j) {
        if (elementDB.code == element.code) {
          check = true
          pool.query(textUPDATE, [element.name, element.surname, element.patronymic, element.login, element.password, element.phone_num, element.duty, element.code], (error, results) => {
            if (error) {
              throw error
            }
          })
          var index = request.body.indexOf(element)
          accounts_added.splice(index, 1)
        }
      })
      if (!check) {
        pool.query(textDELETE, [elementDB.code], (error, results) => {
          if (error) {
            throw error
          }
        })
      }
    })

    if (accounts_added.length > 0) {
      accounts_added.map(function(element, i){
        pool.query(textINSERT, [element.name, element.surname, element.patronymic, element.login, element.password, element.phone_num, element.duty], (error, results) => {
          if (error) {
            throw error
          }
        })
      })
    }

    response.status(201).send(`Accounts updated: ${results.insertId}`)
  })
}

const postGoodsToShelfSpace = (request, response) => {
  const textINSERT = 'INSERT INTO shelf_space (good, amount, shelf_num) VALUES ($1, $2, $3)'
  const textUPDATE = 'UPDATE shelf_space SET shelf_num=$1 WHERE code=$2'
  const textUPDATE_placed = 'UPDATE shipment_order_goods SET placed_amount = placed_amount + 1 WHERE code=$1'
  const list = Object.values(request.body) 
  var list_sorted = []
  var shelfs = []
  var racks = []
  var zones = []

  list.map(function(element,i) {
    if (element.zone != "" && element.rack != " " && element.shelf != "  ") list_sorted.push(element)
  })

  pool.query('SELECT * FROM shelfs ORDER BY code ASC', (error, results) => {
    if (error) {
      throw error
    }
    shelfs = results.rows

    pool.query('SELECT * FROM racks ORDER BY code ASC', (error, results) => {
      if (error) {
        throw error
      }
      racks = results.rows
  
      pool.query('SELECT * FROM zones ORDER BY code ASC', (error, results) => {
        if (error) {
          throw error
        }
        zones = results.rows
    
        list_sorted.map(function(element, i) {
          var zoneId = 0;
          var rackId = 0;
          var shelfID = 0;
          zones.map(function(zone,j){
            if (zone.name == element.zone) zoneId = zone.code
          })
          racks.map(function(rack,j){
            if (rack.name == element.rack && zoneId == rack.zone_num) rackId = rack.code
          })
          shelfs.map(function(shelf,j){
            if (shelf.name == element.shelf && rackId == shelf.rack_num) shelfID = shelf.code
          })

          pool.query(textINSERT, [element.goodCode, 1, shelfID], (error, results) => {
            if (error) {
              throw error
            }
            pool.query(textUPDATE_placed, [element.shipmentOrderGoodsCode], (error, results) => {
              if (error) {
                throw error
              }
            })
          })
        })
        
      })
    })
    response.status(201).send(`Updated placed_amount: ${results}`)
  })
}

const postNewOrder = (request, response) => {
  const textINSERT_order = 'INSERT INTO orders (id, cost, deadline, order_status, address, note, name) VALUES ($1, $2, $3, $4, $5, $6, $7)'
  const textINSERT_orderGoods = 'INSERT INTO order_goods (id, good_id, order_id, amount, price_one) VALUES ($1, $2, $3, $4, $5)'
  const textSELECT_order_id_name = 'SELECT id, name FROM orders ORDER BY id ASC'
  const textSELECT_order_good_id = 'SELECT id FROM order_goods ORDER BY id ASC'
  var obj = Object.values(request.body)[0] 

  if (obj.order_status == 'На продажу') obj.order_status = 'sell'
  else obj.order_status = 'purchase'

  pool.query(textSELECT_order_id_name, (error, results) => {
    if (error) {
      throw error
    }
    var array_id_name = results.rows
    var new_id = array_id_name[array_id_name.length-1].id + 1

    pool.query(textINSERT_order, [new_id, obj.cost, obj.deadline, obj.order_status, obj.address, obj.note, obj.name], (error, results) => {
      if (error) {
        throw error
      }
      pool.query(textSELECT_order_good_id, (error, results) => {
        if (error) {
          throw error
        }
        var array_good_id = results.rows
        var new_good_id = array_good_id[array_good_id.length-1].id

        obj.order_goods.map(function(good, i) {
          new_good_id++
          pool.query(textINSERT_orderGoods, [new_good_id, parseInt(good.goodCode), new_id, good.amount, parseInt(good.cost)], (error, results) => {
            if (error) {
              throw error
            }
          })
        })
      })
    })

    response.status(201).send(`Accounts updated`)
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
  var ordered_goods = []

  pool.query('SELECT goods, order_num FROM shipment_order_goods WHERE code=$1', [request.query.code], (error, results) => {
    if (error) {
      throw error
    }
    ordered_goods = results.rows

    pool.query('UPDATE shipment_order_goods SET amount_real=$1 WHERE code=$2', [request.query.amount, request.query.code], (error, results) => {
      if (error) {
        throw error
      }

      ordered_goods.map(function(element, i){
        pool.query('UPDATE goods_type SET amount=amount + $1 WHERE code=$2', [request.query.amount, element.goods], (error, results) => {
          if (error) {
            throw error
          }  
        })    
      })
      pool.query(`UPDATE shipment_order SET status='${'closed'}' WHERE code=$1`, [ordered_goods[0].order_num], (error, results) => {
        if (error) {
          throw error
        }

      })     
    })
    response.status(201).send(`User added with ID: ${results.insertId}`)
  })  
}

const updateOrderGoodsExpend = (request, response) => {
  var ordered_goods = []

  pool.query('SELECT goods, order_num FROM shipment_order_goods WHERE code=$1', [request.query.code], (error, results) => {
    if (error) {
      throw error
    }
    ordered_goods = results.rows

    pool.query('UPDATE shipment_order_goods SET amount_real=$1 WHERE code=$2', [request.query.amount, request.query.code], (error, results) => {
      if (error) {
        throw error
      }

      ordered_goods.map(function(element, i){
        pool.query('UPDATE goods_type SET amount=amount - $1 WHERE code=$2', [request.query.amount, element.goods], (error, results) => {
          if (error) {
            throw error
          }  
        })    
      })
      pool.query(`UPDATE shipment_order SET status='${'closed'}' WHERE code=$1`, [ordered_goods[0].order_num], (error, results) => {
        if (error) {
          throw error
        }

      })     
    })
    response.status(201).send(`User added with ID: ${results.insertId}`)
  })
}

const updateShipmentOrders = (request, response) => {
  const textINSERT_shipment_order = 'INSERT INTO shipment_order (code, name, shipment_date, shipment_status, shipment_payment, shipment_price, status, order_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)'
  const textUPDATE_shipment_order = `UPDATE shipment_order SET name=$1, shipment_date=$2, shipment_payment=$3, shipment_price=$4 WHERE code=$5`
  const textSELECT_shipment_order = 'SELECT code FROM shipment_order ORDER BY code ASC'
  const textSELECT_shipment_order_where = 'SELECT * FROM shipment_order WHERE order_id=$1 ORDER BY code ASC'
  const textDELETE_shipment_order = `DELETE from shipment_order WHERE code=$1`

  const textINSERT_orderGoods = 'INSERT INTO shipment_order_goods (code, goods, amount, order_num) VALUES ($1, $2, $3, $4)'
  const textUPDATE_orderGoods = 'UPDATE shipment_order_goods SET amount=$1 WHERE code=$2'
  const textSELECT_order_id_name = 'SELECT * FROM shipment_order_goods ORDER BY code ASC'
  const textSELECT_by_order_num = 'SELECT * FROM shipment_order_goods WHERE order_num=$1 ORDER BY code ASC'
  const textDELETE_shipment_order_good = `DELETE from shipment_order_goods WHERE code=$1`
  const textDELETE_shipment_order_good_by_id = `DELETE from shipment_order_goods WHERE order_num=$1`
  var shipment_status = 'Не доставлено'
  var shipment_payment = ''
  var shipment_orders_in_db = []
  var array_for_delete = []

  var obj = Object.values(request.body)[0] 

  pool.query(textSELECT_shipment_order_where, [obj.order_id], (error, results) => {
    if (error) {
      throw error
    }
    shipment_orders_in_db = results.rows

    pool.query(textSELECT_shipment_order, (error, results) => {
      if (error) {
        throw error
      }
      var array_id = results.rows
      var new_id = array_id[array_id.length-1].code
      var iterator = 1

      obj.tableList.map(function(shipment, i) {
        if (shipment.shipmentCost == "0") shipment_payment = 'Без доставки'
        else shipment_payment = 'Не оплачено'

        if (shipment.code == undefined) {
          pool.query(textINSERT_shipment_order, [new_id + iterator, shipment.shipmentNumber, shipment.shipmentDate, shipment_status, shipment_payment, parseInt(shipment.shipmentCost), 'opened', obj.order_id], (error, results) => {
            if (error) {
              throw error
            }
            var order_num = new_id+iterator
            if (shipment.goodsInOrder.length != 0) {
              pool.query(textSELECT_order_id_name, (error, results) => {
                if (error) {
                  throw error
                }
                shipment.goodsInOrder.map(function(good, j){
                  var array_id = results.rows
                  var new_id = array_id[array_id.length-1].code
                  var iterator = 1
                  pool.query(textINSERT_orderGoods, [new_id+iterator, good.goodCode, good.expectingAmount, order_num], (error, results) => {
                    if (error) {
                      throw error
                    }
                  })  
                  iterator++;
                }) 
              })
            }
          })
          iterator++   
        } else {
          shipment_orders_in_db.map(function(sample, j){
            if (sample.code == shipment.code) {
              pool.query(textUPDATE_shipment_order, [shipment.shipmentNumber, shipment.shipmentDate, shipment_payment, parseInt(shipment.shipmentCost), shipment.code], (error, results) => {
                if (error) {
                  throw error
                }
              })  
              shipment.goodsInOrder.map(function(good){
                if (good.shipmentOrderGoodsCode == 0) {
                  pool.query(textSELECT_order_id_name, (error, results) => {
                    var array_id = results.rows
                    var new_id = array_id[array_id.length-1].code
                    var iterator = 1

                    pool.query(textINSERT_orderGoods, [new_id+iterator, good.goodCode, good.expectingAmount, shipment.code], (error, results) => {
                      if (error) {
                        throw error
                      }
                    })
                    iterator++
                  })
                } else {
                  pool.query(textUPDATE_orderGoods, [good.expectingAmount, good.shipmentOrderGoodsCode], (error, results) => {
                    if (error) {
                      throw error
                    }
                  })
                }
              })
            } else {
              array_for_delete.push(sample)
            }
          })
        }
      })
    }) 
    
    var ffg = []
    var ffg_delete = []

    obj.tableList.map(function(element) {
      pool.query(textSELECT_by_order_num, [element.code], (error, results) => {
        if (error) {
          throw error
        }
        ffg = results.rows
      
        element.goodsInOrder.map((good) => {
          ffg.map((sss) => {
            if (good.shipmentOrderGoodsCode != sss.code && good.shipmentOrderGoodsCode != 0) {
               ffg_delete.push(sss)
            }
          })
        })

        ffg_delete.map((ffg) => {
          pool.query(textDELETE_shipment_order_good, [ffg.code], (error, results) => {
            if (error) {
              throw error
            }
          })
        })
      })
    })
    

    var array_for_delete_goods = []
    if (array_for_delete.length == 0) {
      response.status(201).send(`User added with ID: ${results.insertId}`)
    } else {
      array_for_delete.map(function(sample, i){
        pool.query(textDELETE_shipment_order, [sample.code], (error, results) => {
          if (error) {
            throw error
          }
          pool.query(textDELETE_shipment_order_good_by_id, [sample.code], (error, results) => {
            if (error) {
              throw error
            }
            if (array_for_delete.length-1 == i) response.status(201).send(`User added with ID: ${results.insertId}`)
          })
        })  
      })
    }
  
  })    
}

const updateShipmentOrders1 = (request, response) => {
  const textINSERT_shipment_order = 'INSERT INTO shipment_order (code, name, shipment_date, shipment_status, shipment_payment, shipment_price, status, order_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)'
  const textUPDATE_shipment_order = `UPDATE shipment_order SET name=$1, shipment_date=$2, shipment_payment=$3, shipment_price=$4 WHERE code=$5`
  const textSELECT_shipment_order = 'SELECT code FROM shipment_order ORDER BY code ASC'
  const textSELECT_shipment_order_where = 'SELECT * FROM shipment_order WHERE order_id=$1 ORDER BY code ASC'
  const textDELETE_shipment_order = `DELETE from shipment_order WHERE code=$1`

  const textINSERT_orderGoods = 'INSERT INTO shipment_order_goods (code, goods, amount, order_num) VALUES ($1, $2, $3, $4)'
  const textUPDATE_orderGoods = 'UPDATE shipment_order_goods SET amount=$1 WHERE code=$2'
  const textSELECT_order_id_name = 'SELECT * FROM shipment_order_goods ORDER BY code ASC'
  const textSELECT_by_order_num = 'SELECT * FROM shipment_order_goods WHERE order_num=$1 ORDER BY code ASC'
  const textDELETE_shipment_order_good = `DELETE from shipment_order_goods WHERE code=$1`
  const textDELETE_shipment_order_good_by_id = `DELETE from shipment_order_goods WHERE order_num=$1`
  var shipment_status = 'Не доставлено'
  var shipment_payment = ''
  var shipment_orders_in_db = []
  var array_for_delete = []

  var obj = Object.values(request.body)[0] 

  pool.query(textSELECT_shipment_order_where, [obj.order_id], (error, results) => {
    if (error) {
      throw error
    }
    shipment_orders_in_db = results.rows

    pool.query(textSELECT_shipment_order, (error, results) => {
      if (error) {
        throw error
      }
      var array_id = results.rows
      var new_id = array_id[array_id.length-1].code
      var iterator = 1

      obj.tableList.map(function(shipment, i) {
        if (shipment.shipmentCost == "0") shipment_payment = 'Без доставки'
        else shipment_payment = 'Не оплачено'

        if (shipment.code == undefined) {
          //работа с новым заказом на доставку
          pool.query(textINSERT_shipment_order, [new_id + iterator, shipment.shipmentNumber, shipment.shipmentDate, shipment_status, shipment_payment, parseInt(shipment.shipmentCost), 'opened', obj.order_id], (error, results) => {
            if (error) {
              throw error
            }
            //работа с товарами
            var order_num = new_id+iterator
            if (shipment.goodsInOrder.length != 0) {
              pool.query(textSELECT_order_id_name, (error, results) => {
                if (error) {
                  throw error
                }
                var array_id = results.rows
                var new_id = array_id[array_id.length-1].code
                var iterator1 = 1
                shipment.goodsInOrder.map(function(good, j){
                  pool.query(textINSERT_orderGoods, [new_id+iterator1, good.goodCode, good.expectingAmount, order_num], (error, results) => {
                    if (error) {
                      throw error
                    }
                  })  
                  iterator1++;
                }) 
              })
            }
            //работа с товарами конец
          })
        } else {
          //работа со старым заказом на доставку
          check = true
          var shipmentFromBd
          shipment_orders_in_db.map(function(sample, j){
            if (sample.code == shipment.code) {
              check=false
              shipmentFromBd = sample
            }
          })
          if (check) array_for_delete.push(shipmentFromBd)
          else{
            pool.query(textUPDATE_shipment_order, [shipment.shipmentNumber, shipment.shipmentDate, shipment_payment, parseInt(shipment.shipmentCost), shipment.code], (error, results) => {
              if (error) {
                throw error
              }
              //работа с товарами
              shipment.goodsInOrder.map(function(good){
                if (good.shipmentOrderGoodsCode == 0) {
                  pool.query(textSELECT_order_id_name, (error, results) => {
                    var array_id = results.rows
                    var new_id = array_id[array_id.length-1].code
                    var iterator1 = 1

                    pool.query(textINSERT_orderGoods, [new_id+iterator1, good.goodCode, good.expectingAmount, shipment.code], (error, results) => {
                      if (error) {
                        throw error
                      }
                    })
                    iterator1++
                  })
                } else {
                  pool.query(textUPDATE_orderGoods, [good.expectingAmount, good.shipmentOrderGoodsCode], (error, results) => {
                    if (error) {
                      throw error
                    }
                  })
                }
              })

              //delete goods in order
              pool.query(textSELECT_by_order_num, [shipment.code], (error, results) => {
                if (error) {
                  throw error
                }
                var shipmentOrderGoodsFromBd = results.rows
                var shipmentOrderGoodsFromBdDeletedCode
                shipment.goodsInOrder.map(function(good){
                  var check = true
                  shipmentOrderGoodsFromBd.map(function(good1){
                    if (good.goodCode == good1.goods) {
                      check=false
                    }
                  })
                  if (check) {
                    pool.query(textDELETE_shipment_order_good, [good.shipmentOrderGoodsCode], (error, results) => {
                      if (error) {
                        throw error
                      }
                    })
                  }
                })
              })
              //delete goods end
              //работа с товарами конец
            })
          }

          //delete order and its goods
          var array_for_delete_goods = []
          if (array_for_delete.length == 0) {
            response.status(201).send(`User added with ID: ${results.insertId}`)
          } else {
            array_for_delete.map(function(sample, i){
              pool.query(textDELETE_shipment_order, [sample.code], (error, results) => {
                if (error) {
                  throw error
                }
                pool.query(textDELETE_shipment_order_good_by_id, [sample.code], (error, results) => {
                  if (error) {
                    throw error
                  }
                  if (array_for_delete.length-1 == i) response.status(201).send(`User added with ID: ${results.insertId}`)
                })
              })  
            })
          }
           //delete order and its goods end
          
        }
        iterator++
      })
    }) 




  })    
}

const updateOrderStatus = (request, response) => {
  pool.query(`UPDATE orders SET status_execution = '${'complited'}' WHERE id=$1`, [request.query.id], (error, results) => {
    if (error) {
      throw error
    }

    response.status(201).send(`User added with ID: ${results.insertId}`)
  })
}

const updateShelfSpaceStatus = (request, response) => {
  pool.query(`UPDATE shelf_space SET status = $1 WHERE code=$2`, [request.query.status, request.query.code], (error, results) => {
    if (error) {
      throw error
    }
    console.log("request.query.code")
    console.log(request.query.code)

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
  getShipmentOrderGoods,
  getShipmentOrderGoodsByOrderId,
  getShipmentOrderGoodsAll,
  getOrderGoodsByShipmentOrder,
  getOrders,
  getOrdersAll,
  getOrdersGoods,
  getClients,
  getGoodsTypeByCode,
  getGoodsTypeWithCat,
  getGoodsType,
  getCategories,
  getSubCategories2,
  getSubCategories3,
  getSubCategories4,
  getShelfSpace,
  setShelfs,
  postNewUser,
  postGoodsToShelfSpace,
  postNewOrder,
  updateInventory,
  updateOrder,
  updateOrderGoods,
  updateOrderGoodsExpend,
  updateShipmentOrders1,
  updateOrderStatus,
  updateShelfSpaceStatus
}