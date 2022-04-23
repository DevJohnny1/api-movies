const Person = require('../models/Person')
const { Op } = require('sequelize');
const res = require('express/lib/response');

const PersonController = {
  async listar(req, res) {
    // valor default
    const { termo, page = 1, limit = 10 } = req.query;
    const offset = parseInt(limit) * (parseInt(page) - 1);

    let filter = {
      limit: parseInt(limit),
      offset,
      attributes: ["person_name"],
    };

    if (termo) {
      Object.assign(filter, {
        where: {
          //person_name: { [Op.like]: `%${termo}%` } isso é igual a linha de baixo,
          person_name: { [Op.substring]: termo },
        },
      });
    }

    const Persons = await Person.findAll(filter);

    res.json(Persons);
  },


async atualizar (req, res) {
    const { id } = req.params;
    const { nome } = req.body;

    await Person.update(
      {
        person_name: nome,
      },
      {
        where: {
          person_id: id,
        },
      }
    );
    const personUpdated = await Person.findByPk(id);

    return res.json(personUpdated);
  }
}

module.exports = PersonController;