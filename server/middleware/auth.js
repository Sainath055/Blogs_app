import jwt from "jsonwebtoken";

const secret = 'test';

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[0];
    const isCustomAuth = token.length > 100;

    let decodedData;

    if (token && isCustomAuth) {      
      decodedData = jwt.verify(token, secret);
      
      req.userId = decodedData?.id;
    } else {
      req.userId = token;
    }    

    next();
  } catch (error) {
    console.log(error);
  }
};

export default auth;