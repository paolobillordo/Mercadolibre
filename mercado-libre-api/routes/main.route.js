const { Router } = require('express');
const { mercadoLibreCache } = require('../cache/cache');

const mainRouter = Router()

mainRouter.get('/search', async (req, res, next) => {
    try {
        const query = req.query.q;
        const page = req.query.page || 1;
        const sort = req.query.sort || 'relevance';
        const filter = req.query.filter || 'none'; 
        const queryResults = await mercadoLibreCache(query, (page * 30)-30, sort, filter)

        return res.json(queryResults)
    } catch (err) {
        next(err)
    }

})

module.exports = { mainRouter }
