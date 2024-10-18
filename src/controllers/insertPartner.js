const knex = require('../connection');
const { v4: uuidv4 } = require('uuid');

function convertMultiPolygonToWKT(coordinates) {
    const polygons = coordinates.map(polygon => {
        const rings = polygon.map(ring => {
            if (ring[0][0] !== ring[ring.length - 1][0] || ring[0][1] !== ring[ring.length - 1][1]) {
                ring.push(ring[0]);
            }
            return `(${ring.map(coord => `${coord[0]} ${coord[1]}`).join(', ')})`;
        }).join(', ');

        return `(${rings})`;
    }).join(', ');

    const wkt = `MULTIPOLYGON(${polygons})`;
    return wkt;
}

function convertPointToWKT(coordinates) {
    return `POINT(${coordinates.join(' ')})`;
}

function ensureCorrectCoordinateOrder(coordinates) {
    return coordinates.map(polygon => {
        return polygon.map(ring => {
            return ring.map(coord => [coord[1], coord[0]]);
        });
    });
}

function invertOrderAddressCoordinates(coordinates) {
    const first = coordinates[0];
    coordinates[0] = coordinates[1];
    coordinates[1] = first;
    return coordinates;
}

const insertPartner = async (req, res) => {
    const { id, tradingName, ownerName, document, coverageArea, address } = req.body;
    try {
        const insertedPartner = await knex('partner').insert({
            id: id.toString(),
            tradingName,
            ownerName,
            document
        }
        )

        const coverageAreaId = uuidv4();
        const correctedCoordinates = ensureCorrectCoordinateOrder(coverageArea.coordinates);
        const coverageAreaWKT = convertMultiPolygonToWKT(correctedCoordinates);

        const insertedCoverageArea = await knex('coveragearea').insert([
            {
                id: coverageAreaId,
                partner_id: id,
                type: coverageArea.type,
                coordinates: knex.raw(`ST_GeomFromText('${coverageAreaWKT}', 4326)`)
            }]);


        const addressId = uuidv4();
        const correctedAdress = invertOrderAddressCoordinates(address.coordinates);
        const addressWKT = convertPointToWKT(correctedAdress);
        const insertedAddress = await knex('address').insert(
            [{
                id: addressId,
                partner_id: id,
                type: address.type,
                coordinates: knex.raw(`ST_GeomFromText('${addressWKT}', 4326)`)
            }]
        )

        return res.status(201).json(insertedPartner);
    } catch (error) {
        return res.status(400).json({ mensagem: error.message });
    }
}

module.exports = insertPartner;