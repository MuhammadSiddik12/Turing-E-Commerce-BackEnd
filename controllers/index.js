const jwt = require('jsonwebtoken')
const knex = require('knex')({
    client: "mysql",
    connection: {
        host: process.env.host,
        user: process.env.user,
        password: process.env.password,
        database: process.env.database
    }
})

exports.departments = (req, res) => {
    knex.select('*').from('department')
        .then((data) => {
            res.send(data)
        }).catch((err) => {
            res.send({ err: err.message })
        })
}
exports.department_id = (req, res) => {
    knex.select('*').from('department').where('department_id', req.params.id)
        .then((data) => {
            res.send(data)
        }).catch((err) => {
            res.send({ err: err.message })
        })
}

exports.category = (req, res) => {
    knex.select('*').from('category')
        .then((data) => {
            res.send(data)
        }).catch((err) => {
            res.send({ err: err.message })
        })
}

exports.category_id = (req, res) => {
    knex.select('*').from('category').where('category_id', req.params.id)
        .then((data) => {
            res.send(data)
        }).catch((err) => {
            res.send({ err: err.message })
        })
}

exports.category_inDepartment = (req, res) => {
    knex.select('*').from('category').where('department_id', req.params.id)
        .then((data) => {
            res.send(data)
        }).catch((err) => {
            res.send({ err: err.message })
        })
}

exports.attribute = (req, res) => {
    knex.select('*').from('attribute')
        .then((data) => {
            res.send(data)
        }).catch((err) => {
            res.send({ err: err.message })
        })
}

exports.attribute_id = (req, res) => {
    knex.select('*').from('attribute').where('attribute_id', req.params.id)
        .then((data) => {
            res.send(data)
        }).catch((Err) => {
            res.send({ err: err.message })
        })
}

exports.attribute_values = (req, res) => {
    knex.select('attribute_value_id', 'value')
        .from('attribute_value')
        .where('attribute_id', req.params.id)
        .then((data) => {
            res.send(data);
        }).catch((err) => {
            res.send({ err: err.message })
        })
}

exports.attribute_inProduct = (req, res) => {
    knex.select('*').from('attribute')
        .join('attribute_value', function () {
            this.on('attribute.attribute_id', 'attribute_value.attribute_id')
        })
        .join('product_attribute', function () {
            this.on('attribute_value.attribute_value_id', 'product_attribute.attribute_value_id')
        })
        .where('product_attribute.product_id', req.params.id)
        .then((data) => {
            let arr = []
            for (let x of data) {
                var dict = {
                    attribute_name: x.name,
                    attribute_value_id: x.attribute_value_id,
                    attribute_value: x.value
                }
                arr.push(dict)
            }
            res.send(arr)
        }).catch((err) => {
            res.send({ err: err.message })
        })
}

exports.product = (req, res) => {
    knex.select('*').from('product')
        .then((data) => {
            res.send(data)
        }).catch((err) => {
            res.send({ err: err.message })
        })
}

exports.product_search = (req, res) => {
    const search = req.query.query_string
    console.log(req.query.query_string)
    knex.select('name', 'description', 'price', 'discounted_price', 'thumbnail').from('product').where("name", 'like', `%${search}%`).orWhere('description', 'like', `%${search}%`)
        .then((data) => {
            res.send(data)
        }).catch((err) => {
            res.send({ err: err.message })
        })
}

exports.product_id = (req, res) => {
    knex.select('*').from('product').where('product_id', req.params.id)
        .then((data) => {
            res.send(data)
        }).catch((err) => {
            res.send({ err: err.message })
        })
}

exports.product_inCategory = (req, res) => {
    knex.select('*').from('product')
        .join('product_category', function () {
            console.log(this.on('product.product_id', 'product_category.product_id'))
        })
        .where('product_category.category_id', req.params.id)
        .then((data) => {
            res.send(data)
        }).catch((err) => {
            res.send({ err: err.message })
        })
}

exports.product_inDepartment = (req, res) => {
    knex.select(
        'product.product_id',
        'product.name',
        'product.description',
        'product.price',
        'product.discounted_price',
        'product.thumbnail'
    )
        .from('product')
        .join('product_category', function () {
            console.log((this.on('product.product_id', 'product_category.product_id')))
        })
        .join('category', function () {
            console.log(this.on('product_category.category_id', 'category.category_id'))
        })
        .join('department', function () {
            console.log(this.on('category.department_id', 'department.department_id'))
        })
        .where('department.department_id', req.params.id)
        .then((data) => {
            res.send(data);
        }).catch((err) => {
            res.send({ err: err.message })
        })
}

exports.product_details = (req, res) => {
    knex.select("*").from('product').where('product_id', req.params.id)
        .then((data) => {
            res.send(data)
        }).catch((err) => {
            res.send({ err: err.message })
        })

}

exports.product_location = (req, res) => {
    knex.select(
        'category.category_id',
        'category.name as category_name',
        'category.department_id',
        'department.name as department_name'
    ).from('product')
        .join('product_category', function () {
            this.on('product.product_id', 'product_category.product_id')
        })
        .join('category', function () {
            this.on('product_category.category_id', 'category.category_id')
        })
        .join('department', function () {
            this.on('category.department_id', 'department.department_id')
        })
        .where('product.product_id', req.params.id)
        .then((data) => {
            res.send(data)
        }).catch((err) => {
            res.send({ err: err.message })
        })
}

exports.product_review_get = (req, res) => {
    knex.select('*').from('review').where('review_id', req.params.id).then((data) => {
        res.send(data)
    }).catch((err) => {
        res.send({ err: err.message })
    })
}

exports.product_review_post = (req, res) => {
    knex.select('*').from('customer').where('customer_id', 1).then((data) => {
        knex('review').insert({
            review: req.body.review,
            rating: req.body.rating,
            product_id: req.params.id,
            created_on: new Date,
            customer_id: data[0].customer_id
        }).then((data2) => {
            res.send('review add successfully')
        }).catch((err) => {
            console.log(err)
        })
    })
}

exports.customer_post = (req, res) => {
    knex('customer').insert({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        credit_card: req.body.credit_card,
        address_1: req.body.address_1,
        address_2: req.body.address_2,
        city: req.body.city,
        region: req.body.region,
        postal_code: req.body.postal_code,
        country: req.body.country,
        shipping_region_id: req.body.shipping_region_id,
        day_phone: req.body.day_phone,
        eve_phone: req.body.eve_phone,
        mob_phone: req.body.mob_phone
    }).then(() => {
        res.send({ message: 'Signup successfully' })

    }).catch((err) => {
        res.send({ err: err.message })
    })
}

exports.customer_get = (req, res) => {
    knex.select('*').from('customer')
        .then((data) => {
            res.send(data)
        }).catch((err) => {
            res.send({ err: err.message })
        })
}

exports.customer_put = (req, res) => {
    knex('customer').where('email', req.body.email)
        .update({
            credit_card: req.body.credit_card,
            address_1: req.body.address_1,
            address_2: req.body.address_2,
            city: req.body.city,
            region: req.body.region,
            postal_code: req.body.postal_code,
            country: req.body.country,
            shipping_region_id: req.body.shipping_region_id,
            day_phone: req.body.day_phone,
            eve_phone: req.body.eve_phone,
            mob_phone: req.body.mob_phone
        }).then(() => {
            res.send({ message: 'updated successfully' })
        }).catch((err) => {
            console.log({ err: err.message })
        })
}

exports.login = (req, res) => {
    knex.select('email', 'password').from('customer').where('email', req.body.email)
        .then((data) => {
            if (data[0].password === req.body.password) {
                var token = jwt.sign(req.body, "siddik", { expiresIn: "24h" })
                res.cookie('token', token)
                res.send({ message: 'login successfully' })
            } else {
                res.send({ message: 'please check the password' })
            }
        }).catch((err) => {
            res.send({ err: err.message })
        })
}

exports.shoppingcart_add = (req, res) => {
    knex('shopping_cart').insert({
        cart_id: req.body.cart_id,
        product_id: req.body.product_id,
        attributes: req.body.attributes,
        quantity: req.body.quantity,
        buy_now: req.body.buy_now
    }).then(() => {
        knex.select(
            'item_id',
            'name',
            'attributes',
            'shopping_cart.product_id',
            'price',
            'quantity',
            'image').from('shopping_cart').join('product', function () {
                this.on('shopping_cart.product_id', 'product.product_id')
            }).then((data) => {
                res.send(data)
            }).catch((err) => {
                console.log({ err: err.message })
            })
    }).catch((err) => {
        res.send({ err: err.message })
    })
}

exports.shoppingcart_id = (req, res) => {
    knex.select('item_id', 'name', 'attributes', 'shopping_cart.product_id',
        'price',
        'quantity',
        'image').from('shopping_cart').join('product', function () {
            this.on('shopping_cart.product_id', 'product.product_id')
        }).where('shopping_cart.cart_id', req.params.cart_id)
        .then((data) => {
            res.send(data)
        }).catch((err) => {
            console.log(err)
        })
}

exports.shoppingcart_update = (req, res) => {
    knex('shopping_cart').where('shopping_cart.item_id', req.params.id)
        .update({
            'quantity': req.body.quantity
        }).then((data) => {
            knex.select('item_id',
                'product.name',
                'shopping_cart.attributes',
                'shopping_cart.product_id',
                'product.price',
                'shopping_cart.quantity',
                'product.image').from('shopping_cart').where('shopping_cart.item_id', req.params.id).join('product', function () {
                    this.on('shopping_cart.product_id', 'product.product_id')

                }).then((data) => {
                    res.send(data)
                }).catch((err) => {
                    console.log({ err: err.message })
                })
        }).catch((err) => {
            console.log({ err: err.message })
        })
}

exports.shoppingcart_empty = (req, res) => {
    knex('shopping_cart').where('cart_id', req.params.id).del().then((data) => {
        res.send({ message: 'cart remove successfully' })
    }).catch((err) => {
        res.send({
            err: err.message
        })
    })
}

exports.moveTo = (req, res) => {
    knex.select('*').from('later').where('item_id', req.params.id)
        .then((data) => {
            if (data.length > 0) {
                knex('cart').insert(data[0])
                    .then((data2) => {
                        knex.select('*').from('later').where('item_id', req.params.id).del()
                            .then((data3) => {
                                res.send({ message: 'data move to shoppind cart to cart successfully' })
                            }).catch((err) => {
                                res.send({ err: err.message })
                            })
                    }).catch((err) => {
                        res.send({ err: err.message })
                    })
            } else {
                res.send({ message: 'this id item is not found' })
            }
        }).catch((err) => {
            res.send({ err: err.message })
        })
}

exports.totalAmount = (req, res) => {
    knex.select('price', 'quantity').from('shopping_cart').join('product', function () {
        this.on('shopping_cart.product_id', 'product.product_id')

    }).where('shopping_cart.cart_id', req.params.id).then((data) => {
        let dic = {}
        let a = data[0].price * data[0].quantity
        dic.totalAmount = a
        res.send(dic)
    }).catch((err) => [
        res.send({ err: err.message })
    ])
}

exports.savedForLater = (req, res) => {
    knex.select("*").from('shopping_cart').where('item_id', req.params.id).then((data) => {
        knex('later').insert(data[0]).then((data2) => {
            knex.select("*").from('shopping_cart').where('item_id', req.params.id).del().then((data3) => {
                res.send({ message: 'data move from shopping cart to save for later' })
            }).catch((err) => {
                res.send({ err: err.message })
            })

        }).catch((err) => {
            res.send({ err: err.message })
        })
    }).catch((err) => {
        res.send({ err: err.message })
    })
}

exports.getSaved = (req, res) => {
    knex.select(
        'item_id',
        'product.name',
        'shopping_cart.attributes',
        'product.price').from('shopping_cart').join('product', function () {
            this.on('shopping_cart.product_id', 'product.product_id')
        }).where('shopping_cart.cart_id', req.params.id).then((data) => {
            res.send(data)
        }).catch((err) => {
            res.send({ err: err.message })
        })
}

exports.removedProduct = (req, res) => {
    knex.select('*').from('shopping_cart').where('item_id', req.params.id).del().then((data) => {
        res.send({ message: 'product removed successfully from shopping cart' })
    }).catch((Err) => {
        res.send({ err: err.message })
    })
}

exports.tax = (req, res) => {
    knex.select('*').from('tax').then((data) => {
        res.send(data)
    }).catch((err) => {
        res.send({ err: err.message })
    })
}

exports.tax_id = (req, res) => {
    knex.select('*').from('tax').where('tax_id', req.params.id).then((data) => {
        res.send(data)
    }).catch((err) => {
        console.log(err)
    })
}


exports.shipping = (req, res) => {
    knex.select('*').from('shipping_region').then((data) => {
        res.send(data)
    }).catch((err) => {
        res.send({ err: err.message })
    })
}

exports.shipping_id = (req, res) => {
    knex.select('*').from('shipping').where('shipping_region_id', req.params.id).then((data) => {
        res.send(data)
    }).catch((err) => {
        res.send({ err: err.message })
    })
}

exports.order = (req, res) => {
    knex.select('*').from('shopping_cart').where('cart_id', req.body.cart_id).join('product', function () {
        this.on('shopping_cart.product_id', 'product.product_id')
    }).then((data) => {
        knex('orders').insert({
            'total_amount': data[0].quantity * data[0].price,
            'created_on': new Date(),
            "customer_id": res.user.customer_id,
            "shipping_id": req.body.shipping_id,
            "tax_id": req.body.tax_id
        }).then((data2) => {
            console.log(data, '2')
            knex("order_detail").insert({
                "unit_cost": data[0].price,
                "quantity": data[0].quantity,
                "product_name": data[0].name,
                "attributes": data[0].attributes,
                "product_id": data[0].product_id,
                "order_id": data2[0]
            }).then((data3) => {
                console.log(data3, '3')
                knex.select('*').from('shopping_cart').where('cart_id', req.body.cart_id).del()
                    .then((data4) => {
                        res.send({
                            order_status: 'ordered successfully',
                            order_id: data2[0]
                        })
                    }).catch((err) => {
                        res.send({ err: err.message })
                    })
            }).catch((err) => {
                res.send({ err: err.message })
            })
        }).catch((err) => {
            res.send({ err: err.message })
        })
    }).catch((err) => {
        res.send({ err: err.message })
    })
}

exports.order_id = (req, res) => {
    knex.select('orders.order_id',
        'product.product_id',
        'order_detail.attributes',
        'product.name as product_name',
        'order_detail.quantity',
        'product.price',
        'order_detail.unit_cost').from('orders')
        .join('order_detail', function () {
            this.on('orders.order_id', 'order_detail.order_id')
        }).join('product', function () {
            this.on('order_detail.product_id', 'product.product_id')
        }).where('orders.order_id', req.params.id)
        .then((data) => {
            res.send(data)
        }).catch((err) => {
            res.send({ err: err.message })
        })
}

exports.order_inCustomer = (req, res) => {
    knex.select('*').from('customer').where('customer_id', req.params.id).then((data) => {
        res.send(data)
    }).catch((err) => {
        res.send({ err: err.message })
    })
}


exports.shortDetails = (req, res) => {
    knex.select('orders.order_id',
        'orders.total_amount',
        'orders.created_on',
        'orders.shipped_on',
        'orders.status',
        'order_detail.product_name as name').from('orders').join('order_detail', function () {
            this.on('orders.order_id', 'order_detail.order_id')
        }).where('order_detail.order_id', req.params.id).then((data) => {
            res.send(data)
        }).catch((err) => {
            res.send({ err: err.message })
        })
}