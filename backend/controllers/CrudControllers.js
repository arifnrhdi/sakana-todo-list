import Crud from "../models/CrudModel.js";
import Auth from "../models/AuthModel.js";
import { Op } from "sequelize";


export const getTodos = async (req, res) => {
  try {
    let response;
    if (req.role == "admin") {
      response = await Crud.findAll({
        attributes: ["uuid", "title", "task", "updatedAt"],
        include: [
          {
            model: Auth,
            attributes: ["name", "email"],
          },
        ],
      });
    } else {
      response = await Crud.findAll({
        attributes: ["uuid", "title", "task", "updatedAt"],
        where: {
          userId: req.userId,
        },
        include: [
          {
            model: Auth,
            attributes: ["name", "email"],
          },
        ],
      });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// export const getTodoByIdAdmin = async (req, res) => {
//   try {
//     const todo = await Crud.findOne({
//       where: {
//         id: req.params.userId,
//       },
//     });
//     if (!todo) return res.status(404).json({ msg: "Data tidak ditemukan" });

//   } catch (error) {
//     if (req.role == "admin") {
//       response = await Crud.findOne({
//         attributes: ["userId", "title", "task"],
//         where: {
//           [Op.and]: [{ id: todo.userId }, { userId: req.userId }],
//         },
//         include: [
//           {
//             model: Auth,
//             attributes: ["name", "email"],
//           },
//         ],
//       });
//     }
//   }
// }


export const getTodoById = async (req, res) => {
  try {
    const todo = await Crud.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!todo) return res.status(404).json({ msg: "Data tidak ditemukan" });
    let response;
    if (req.role == "admin") {
      response = await Crud.findOne({
        attributes: ["uuid", "title", "task"],
        where: {
          id: todo.id,
        },
        include: [
          {
            model: Auth,
            attributes: ["name", "email"],
          },
        ],
      });
    } else {
      response = await Crud.findOne({
        attributes: ["uuid", "title", "task"],
        where: {
          [Op.and]: [{ id: todo.id }, { userId: req.userId }],
        },
        include: [
          {
            model: Auth,
            attributes: ["name", "email"],
          },
        ],
      });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};


export const createTodo = async (req, res) => {
  const { title, task } = req.body;
  if (title.length === 0) return res.status(400).json({ msg: "*Tambahkan judul dan task anda" });
  if (task.length === 0) return res.status(400).json({ msg: "*Tambahkan judul dan task anda" });
  try {
    await Crud.create({
      title: title,
      task: task,
      userId: req.userId,
    });
    res.status(201).json({ msg: "Task Created" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};


export const updateTodo = async (req, res) => {
  try {
    const todo = await Crud.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!todo) return res.status(404).json({ msg: "Data tidak ditemukan" });
    const { title, task } = req.body;
    if (req.role == "admin") {
      await Crud.update(
        { title, task },
        {
          where: {
            id: todo.id,
          },
        }
      );
    } else {
        if(req.userId !== todo.userId) return res.status(403).json({msg: "Akses Ditolak (Admin Only)"})
      await Crud.update(
        { title, task },
        {
          where: {
            [Op.and]: [{ id: todo.id }, { userId: req.userId }],
          },
        }
      );
    }
    res.status(200).json({msg: "Task Berhasil Diubah!"});
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const deletetodo = async (req, res) => {
    try {
    const todo = await Crud.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!todo) return res.status(404).json({ msg: "Data tidak ditemukan" });
    const { title, task } = req.body;
    if (req.role == "admin") {
      await Crud.destroy(
        {
          where: {
            id: todo.id,
          },
        }
      );
    } else {
        if(req.userId !== todo.userId) return res.status(403).json({msg: "Akses Ditolak (Admin Only)"})
      await Crud.destroy(
        {
          where: {
            [Op.and]: [{ id: todo.id }, { userId: req.userId }],
          },
        }
      );
    }
    res.status(200).json({msg: "Task Berhasil Dihapus!"});
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
