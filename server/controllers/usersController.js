import usersModel from "../models/usersModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const registerController = async (req, res) => {
    try {
        const { name, email, phone, password } = req.body;
        if (!name || !email || !phone || !password) {
            return res.send({ statusCode: 400, message: "MISSING" });
        }
        const userAvailabe = await usersModel.find({ email });
        if (userAvailabe.length) {
            return res.send({ statusCode: 400, message: "EXISTS" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new usersModel({ name, email, phone, password: hashedPassword });
        await user.save();
        if (user) return res.status(201).send({ message: "User Created", name, email, phone });
        else {
            throw new Error('User details is not valid!!!');
        }
    } catch (error) {
        return res.send({ statusCode: 400, message: error });
    }
}

const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.send({ statusCode: 400, message: "MISSING" });
        }
        const user = await usersModel.find({ email: email });
        if (!user.length) {
            return res.send({ statusCode: 401, message: "NOT REGISTERED" });
        }
        bcrypt.compare(password, user[0].password, (err, resp) => {
            if (err) {
                return res.send({ statusCode: 400, message: "Something wrong!!" });
            }
            else if (resp) {
                const accessToken = jwt.sign({
                    id: user[0]._id
                }, process.env.ACCESS_TOKEN_KEY, { expiresIn: '540m' });
                return res.send({ statusCode: 200, accessToken: accessToken, name: user[0].name });
            }
            else return res.json({ success: false, message: 'UNMATCHED' });
        });

    } catch (error) {
        return res.status(404).json({ message: error });
    }
}
const currentUserController = async (req, res) => {
    try {
        res.json({ LoggedInUserId: req.id });
    } catch (error) {
        res.status(404).json({ error: 404, message: "Route not found." });
    }
}

export { registerController, loginController, currentUserController };