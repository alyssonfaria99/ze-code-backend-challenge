const knex = require('../connection');

const getAllPartners = async (req, res) => {
    try {
        const partner = await knex('partner').select('*');
        const coverageArea = await knex('coverageArea').select('*');
        const address = await knex('address').select('*');
        if (partner.length == 0) {
            return res.json({ mensagem: 'No partner found.' });
        }
        return res.status(200).json({ partner, coverageArea, address });
    } catch (error) {
        return res.status(400).json({ mensagem: error.message });
    }
}

module.exports = getAllPartners;