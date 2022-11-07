"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = require("./utils/config");
const cors_1 = __importDefault(require("cors"));
const movies_1 = __importDefault(require("./routes/movies"));
const app = (0, express_1.default)();
const port = config_1.Config.PORT;
app.use((0, cors_1.default)({
    origin: config_1.Config.NODE_ENV === "development"
        ? "http://localhost:3000"
        : "http://localhost"
}));
app.get('/', (req, res, next) => {
    res.send('Express + typescript server');
});
app.use("/api/movies", movies_1.default);
app.listen(port, () => console.log(`[SERVER]: Server running at http://localhost:${port}`));
