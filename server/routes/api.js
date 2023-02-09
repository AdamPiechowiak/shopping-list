const express = require('express')
const router = express.Router()
const usersActions = require('../controllers/api/usersActions')


//logowanie
router.post('/auth', usersActions.logUser)

//dodaj u¿ytkownika
router.post('/users', usersActions.saveUser)
//wyœwietl produkty
router.get('/allProducts/:id', usersActions.getAllProducts)
//wyœwietl produkt
router.get('/products/:id', usersActions.getProduct)
//zapisz produkt
router.post('/products/:id', usersActions.saveProduct)
//aktualizuj produkt
router.put('/products/:id', usersActions.updateProduct)
//usuñ produkt
router.delete('/products/:id', usersActions.deleteProduct)

module.exports = router