const express = require('express')
const router = express.Router()
const { departments, department_id, category, category_id, category_inDepartment, attribute, attribute_id, attribute_values, attribute_inProduct, product, product_search, product_id, product_inCategory, product_inDepartment, product_details, product_location, product_review, product_review_get, product_review_post, customer, customer_post, customer_get, customer_put, login, shoppingcart_add, shoppingcart_id, shoppingcart_update, shoppingcart_empty, moveTo, totalAmount, savedForLater, getSaved, removedProduct, tax, tax_id, shipping, shipping_id, order, order_id, order_inCustomer, shortDetails } = require('../controllers/index')
const jwt = require('jsonwebtoken')

function auth(req, res, next) {
    try {
        const authHeader = req.headers.cookie
        const token = authHeader.split('=')[1]
        if (token == null) return res.sendStatus(401)
        jwt.verify(token, 'siddik', (err, user) => {
            if (err) return res.sendStatus(403)
            res.user = user
            next()
        })
    } catch (err) {
        res.send({ message: 'unAuthorized' })
    }
}

router.get('/departments', departments)

router.get('/departments/:id', department_id)

router.get('/category', category)

router.get('/category/:id', category_id)

router.get('/category/inDepartment/:id', category_inDepartment)

router.get('/attribute', attribute)

router.get('/attribute/:id', attribute_id)

router.get("/attribute/values/:id", attribute_values)

router.get('/attribute/inProduct/:id', attribute_inProduct)

router.get('/products', product)

router.get('/products/search', product_search)

router.get('/products/:id', product_id)

router.get('/products/inCategory/:id', product_inCategory)

router.get("/products/inDepartment/:id", product_inDepartment)

router.get('/products/:id/details', product_details)

router.get('/products/:id/location', product_location)

router.get('/products/:id/reviews', product_review_get)

router.post('/products/:id/reviews', auth, product_review_post)

router.post('/customers', customer_post)

router.get('/customers', auth, customer_get)

router.put('/customers', auth, customer_put)

router.post('/customers/login', login)

router.post('/shoppingcart/add', shoppingcart_add)

router.get('/shoppingcart/:cart_id', shoppingcart_id)

router.put('/shoppingcart/update/:id', shoppingcart_update)

router.delete('/shoppingcart/empty/:id', shoppingcart_empty)

router.get('/shoppingcart/moveToCart/:id', moveTo)

router.get('/shoppingcart/totalAmount/:id', totalAmount)

router.get("/shopping_cart/saveForLater/:id", savedForLater)

router.get('/shoppingcart/getSaved/:id', getSaved)

router.delete('/shoppingcart/removeProduct/:id', removedProduct)

router.get('/tax', tax)

router.get('/tax/:id', tax_id)

router.get('/shipping/region', shipping)

router.get('/shipping/region/:id', shipping_id)

router.post('/orders', auth, order)

router.get('/orders/:id', auth, order_id)

router.get('/orders/inCustomer/:id', auth, order_inCustomer)

router.get('/orders/shortDetail/:id', auth, shortDetails)

module.exports = router