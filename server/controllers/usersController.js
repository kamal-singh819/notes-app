import usersModel from "../models/usersModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const registerController = async (req, res) => {
    try {
        const { name, email, phone, password } = req.body.bodyData;
        if (!name || !email || !phone || !password) {
            return res.send({statusCode: 400, message: "All fields are mandatory"});
        }
        const userAvailabe = await usersModel.find({ email });
        if (userAvailabe.length) {
            return res.send({statusCode: 400, message: "EXISTS"});
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new usersModel({ name, email, phone, password: hashedPassword });
        await user.save();
        if (user) return res.status(201).send({ message: "User Created", name, email, phone });
        else {
            throw new Error('User details is not valid!!!');
        }
    } catch (error) {
        return res.send({statusCode: 400, message: error});
    }
}

const loginController = async (req, res) => {
    try {
        const { email, password } = req.body.bodyData;
        console.log(email, password);
        if (!email || !password) {
            return res.send({statusCode: 400, message: "MISSING"});
        }
        const user = await usersModel.find({ email });
        console.log(user);
        if (!user.length) {
            return res.send({statusCode: 400, message: "NOT REGISTERED"});
        }
        const comparePasswords = await bcrypt.compare(password, user.password);
        if (comparePasswords) {
            const accessToken = jwt.sign({
                id: user._id
            }, process.env.ACCESS_TOKEN_KEY, { expiresIn: '540m' });
            res.status(200).send({ accessToken: accessToken });
        }
        else {
            console.log("not Matching");
            return res.send({statusCode: 400, message: "WRONG"});
        }

    } catch (error) {
        return res.status(404).json({message: error });
    }
}
const currentUserController = async (req, res) => {
    try {
        res.json({LoggedInUserId: req.id});
    } catch (error) {
        res.status(404).json({ error: 404, message: "Route not found." });
    }
}

export { registerController, loginController, currentUserController };