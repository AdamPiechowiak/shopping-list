const express = require('express')
const router = express.Router()
const usersActions = require('../controllers/api/usersActions')


//logowanie
router.post('/auth', usersActions.logUser)

//dodaj u�ytkownika
router.post('/users', usersActions.saveUser)
//wy�wietl produkty
router.get('/allProducts/:id', usersActions.getAllProducts)
//wy�wietl produkt
router.get('/products/:id', usersActions.getProduct)
//zapisz produkt
router.post('/products/:id', usersActions.saveProduct)
//aktualizuj produkt
router.put('/products/:id', usersActions.updateProduct)
//usu� produkt
router.delete('/products/:id', usersActions.deleteProduct)

module.exports = router