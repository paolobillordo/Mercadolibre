const axios = require('axios')

const cache = {};


const mapStateToId = (state) => {
    if (state === 'new') return '2230284';
    if (state === 'used') return '2230581';

}
//possible values for filter 'none', '2230284'(Nuevo), '2230581'(usado)
const mercadoLibreCache = async (query, offset, sort, filter) => {
    const key = `${query}-${offset}-${sort}-${filter}`
    if (cache[key]) {
        return cache[key]
    } else {
        const call = await axios.get(`https://api.mercadolibre.com/sites/MLA/search?q=${query}&limit=30&offset=${offset}&sort=${sort}${filter != 'none' ? `&item_condition=${mapStateToId(filter)}` : ''}`)
        cache[key] = call.data
        return call.data;
    }
}

module.exports = { mercadoLibreCache }