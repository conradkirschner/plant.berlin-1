import "reflect-metadata";
require('dotenv').config()


import bodyParser from "body-parser";
// @ts-ignore
import { RegisterRoutes } from "../build/routes";
import express, {
    Response as ExResponse,
    Request as ExRequest,
    NextFunction,
} from "express";
import { ValidateError } from "tsoa";
// ...
const cors = require('cors')

export const app = express();


app.use(cors())
app.use(express.static('data'));

// Use body parser to read sent json payloads
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);
app.use(bodyParser.json());

RegisterRoutes(app);

app.use(function errorHandler(
    err: unknown,
    req: ExRequest,
    res: ExResponse,
    next: NextFunction
): ExResponse | void {
    if (err instanceof ValidateError) {
        console.warn(`Caught Validation Error for ${req.path}:`, err.fields);
        return res.status(422).json({
            message: "Validation Failed",
            details: err.fields,
        });
    }
    if (err instanceof Error) {
        console.log(err);
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }

    next();
});
