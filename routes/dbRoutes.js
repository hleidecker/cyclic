var router = require('express').Router();
const { requiresAuth } = require('express-openid-connect');

// Create or Update an item
router.post('/:col/:key', requiresAuth(), async (req, res) => {
    console.log(req.body)
  
    const col = req.params.col
    const key = req.params.key
    console.log(`from collection: ${col} update key: ${key} with params ${JSON.stringify(req.params)}`)
    const item = await db.collection(col).set(key, req.body)
    console.log(JSON.stringify(item, null, 2))
    res.json(item).end()
  })
  
  // Delete an item
  router.delete('/:col/:key', requiresAuth(), async (req, res) => {
    const col = req.params.col
    const key = req.params.key
    console.log(`from collection: ${col} delete key: ${key} with params ${JSON.stringify(req.params)}`)
    const item = await db.collection(col).delete(key)
    console.log(JSON.stringify(item, null, 2))
    res.json(item).end()
  })
  
  // Get a single item
  router.get('/:col/:key', requiresAuth(), async (req, res) => {
    const col = req.params.col
    const key = req.params.key
    console.log(`from collection: ${col} get key: ${key} with params ${JSON.stringify(req.params)}`)
    const item = await db.collection(col).get(key)
    console.log(JSON.stringify(item, null, 2))
    res.json(item).end()
  })
  
  // Get a full listing
  router.get('/:col', requiresAuth(), async (req, res) => {
    const col = req.params.col
    console.log(`list collection: ${col} with params: ${JSON.stringify(req.params)}`)
    const items = await db.collection(col).list()
    console.log(JSON.stringify(items, null, 2))
    res.json(items).end()
  })

module.exports = router;