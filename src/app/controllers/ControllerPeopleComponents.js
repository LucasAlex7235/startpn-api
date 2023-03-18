const { use } = require("../../routes");
const People = require("../models/Peoples");
const User = require("../models/Users");

class ControllerPeopleComponents {
  static async getPeoples(req, res) {
    const user_id = req.userId;

    try {
      const peoples = await People.findAll({ where: { user_id } });
      return res.status(200).json(peoples);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro ao buscar as pessoas." });
    }
  }

  static async getByIdPeople(req, res) {
    const id = req.params.id;
    const user_id = req.userId;

    try {
      const people = await People.findByPk(id, { where: { user_id } });
      if (!people) {
        return res.status(404).json({ message: "Pessoa não encontrada." });
      }
      return res.status(200).json(people);
    } catch (error) {
      console.error(error);
      return res.status(404).json({ message: "Pessoa não existente" });
    }
  }

  static async createPeople(req, res) {
    const peopleBody = req.body;
    const userId = req.userId;

    try {
      const people = await People.create({
        ...peopleBody,
        user_id: userId,
      });

      return res.status(201).json(people);
    } catch (error) {
      console.error(error);
      return res.status(400).json({ message: "Erro ao criar a pessoa." });
    }
  }

  static async updatePeople(req, res) {
    const peopleBody = req.body;
    const user_id = req.userId;
    const id = req.params.id;

    try {
      const people = await People.findByPk(id, { where: { user_id } });
      if (!people) {
        return res.status(404).json({ message: "Pessoa não encontrada." });
      }
      Object.assign(people, peopleBody);
      await people.save();

      res.status(201).json(people);
    } catch (error) {
      console.error(error);
      res
        .status(400)
        .json({ message: "Erro ao atualizar o cliente ou o terceiro." });
    }
  }

  static async deletePeople(req, res) {
    const id = req.params.id;
    const user_id = req.userId;

    try {
      const people = await People.findByPk(id, { where: { user_id } });

      if (!people) {
        return res.status(404).json({ message: "Pessoa não encontrada." });
      }

      await people.destroy();

      return res.status(200).json({ message: "Pessoa deletada com sucesso." });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro ao deletar pessoa." });
    }
  }
}

module.exports = ControllerPeopleComponents;
