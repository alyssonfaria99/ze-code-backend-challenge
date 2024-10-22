const knex = require('../connection');

const insideCoverageArea = (location, poligon) => {
    const locationX = location[0];
    const locationY = location[1];
    let inside = false;
    const n = poligon.length;

    for (let i = 0, j = n - 1; i < n; j = i++) {
        const xi = poligon[i].x;
        const yi = poligon[i].y;
        const xj = poligon[j].x;
        const yj = poligon[j].y;

        const intersection = ((yi > locationY) !== (yj > locationY)) && (locationX < ((xj - xi) * (locationY - yi)) / (yj - yi) + xi);
        if (intersection) {
            inside = !inside;
        }
    }
    return inside
}

const calcDistance = (location, address) => {
    const locationX = location[0];
    const locationY = location[1];
    const addressX = address.x;
    const addressY = address.y;

    const dx = addressX - locationX;
    const dy = addressY - locationY;

    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance;
}


const searchPartner = async (req, res) => {
    const { location } = req.body;
    try {
        const coverageAreas = await knex('coveragearea').select('coordinates', 'partner_id');
        let poligon
        let minDistance = Infinity;
        let idMinDistance = null;

        for (let area of coverageAreas) {
            poligon = area.coordinates[0][0];

            if (insideCoverageArea(location, poligon)) {
                let currentAddress = await knex('address').select('coordinates').where('partner_id', area.partner_id);
                let distance = calcDistance(location, currentAddress[0].coordinates);
                if (distance < minDistance) {
                    minDistance = distance;
                    idMinDistance = area.partner_id;
                }
            };
        }
        const partner = await knex('partner').select('*').where('partner.id', idMinDistance);
        return res.status(200).json(partner);
    } catch (error) {
        return res.json({ error: error.message })
    }
}

module.exports = searchPartner;