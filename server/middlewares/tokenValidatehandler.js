import jwt from 'jsonwebtoken';

const tokenValidateHandler = (req, res, next) => {
    try {
        let token;
        let authHeader = req.headers.authorization || req.headers.Authorization;
        if (authHeader && authHeader.startsWith('Bearer')) {
            token = authHeader.split(' ')[1];
            jwt.verify(token, process.env.ACCESS_TOKEN_KEY, (error, decoded) => {
                if (error) {
                    res.status(401);
                    throw new Error('User is not authorized');
                }
                // console.log(decoded); // decoded is an object which contains two more properties=> iat: this is token createn time and exp: this is expiry time of token
                req.id = decoded.id;
                // res.json({userDetails: decoded.id});
                next();
            });
        }
        else {
            return res.status(401).send({message: "Token is missing"});
        }
    } catch (error) {
        return res.status(401).send({ message: 'Token is missing or User is unauthorized' });
    }
}

export default tokenValidateHandler;