import Auth from "../models/AuthModel.js";
import bcrypt from "bcrypt";

export const Login = async(req, res) => {
    const user = await Auth.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (!user) return res.status(404).json({ msg: "Email tidak ditemukan" });
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) return res.status(400).json({ msg: "Password salah" });
    req.session.userId = user.uuid;
    const uuid = user.uuid;
    const name = user.name;
    const email = user.email;
    const role = user.role;
    res.status(200).json({uuid, name, email, role});
};

export const Me = async(req, res) => {
    if(!req.session.userId) return res.status(401).json({msg: "Mohon Login Ke Akun Anda!"});
    const user = await Auth.findOne({
      attributes: ["uuid", "name", "email", "role"],
      where: {
        uuid: req.session.userId,
      },
    });
    if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });
    res.status(200).json(user);
}

export const Logout = async(req, res) => {
    req.session.destroy((err)=>{
        if(err) return res.status(400).json({msg: "Tidak Dapat Log Out"});
        res.status(200).json({msg: "Berhasil Log Out"});
    })
}