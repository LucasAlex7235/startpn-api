const { use } = require("../../routes");
const People = require("../models/People");

class ControllerPeopleComponents {
  static async getPeoples(req, res) {
    try {
      const peoples = await People.findAll();
      res.status(200).json(peoples);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erro ao buscar as pessoas." });
    }
  }

  static async getByIdPeople(req, res) {
    const id = req.params.id;
    try {
      const people = await People.findByPk(id);
      res.status(200).json(people);
    } catch (error) {
      console.error(error);
      res.status(404).json({ message: "Pessoa não existente" });
    }
  }

  static async createPeople(req, res) {
    const peopleBody = req.body;

    try {
      const people = await People.create(peopleBody);

      res.status(201).json(people);
    } catch (error) {
      console.error(error);
      res
        .status(400)
        .json({ message: "Erro ao criar o cliente ou o terceiro." });
    }
  }

  static async updatePeople(req, res) {
    const userBody = req.body;
    const id = req.params.id;

    try {
      const user = await People.findByPk(id);
      Object.assign(user, userBody);
      await user.save();

      res.status(201).json(user);
    } catch (error) {
      console.error(error);
      res
        .status(400)
        .json({ message: "Erro ao atualizar o cliente ou o terceiro." });
    }
  }

  static async deletePeople(req, res) {
    const id = req.params.id;

    try {
      const people = await People.findByPk(id);

      if (!people) {
        return res.status(404).json({ message: "Pessoa não encontrada." });
      }

      await people.destroy();

      res.status(200).json({ message: "Pessoa deletada com sucesso." });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erro ao deletar pessoa." });
    }
  }
}

module.exports = ControllerPeopleComponents;
