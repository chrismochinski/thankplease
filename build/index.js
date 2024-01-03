"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 3001;
app.get("/", (req, res) => res.send("Welcome to thankplease!"));
app.listen(port, () => console.log(`Server running on http://localhost:${port} wut it dooooooooo`));
const pool = new pg_1.Pool({
    user: "chrismochinski",
    host: "localhost",
    database: "thankplease",
    // password: 'password',
    port: 5432,
});
function query() {
    return __awaiter(this, void 0, void 0, function* () {
        const client = yield pool.connect();
        try {
            const res = yield client.query("SELECT * FROM user_assets;");
            console.log(res.rows);
        }
        finally {
            client.release();
        }
    });
}
