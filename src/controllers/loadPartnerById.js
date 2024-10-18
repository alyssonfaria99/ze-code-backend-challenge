const knex = require('../connection');

const loadPartnerById = async (req, res) => {
    const { id } = req.params;
    try {
        const partner = await knex('partner').select('*').where({ id });
        const coverageArea = await knex('coverageArea').select('*').where('partner_id', id);
        const address = await knex('address').select('*').where('partner_id', id);

        const result = {
            id,
            tradingName: partner[0].tradingName,
            ownerName: partner[0].ownerName,
            document: partner[0].document,
            coverageArea: {
                type: coverageArea[0].type,
                coordinates: coverageArea[0].coordinates
            },
            address: {
                type: address[0].type,
                coordinates: [address[0].coordinates.x, address[0].coordinates.y]
            }
        }
        if (partner.length == 0) {
            return res.json({ mensagem: 'No partner found.' });
        }

        return res.status(200).json(result);
    } catch (error) {
        return res.status(400).json({ mensagem: error.message });
    }
}

module.exports = loadPartnerById;