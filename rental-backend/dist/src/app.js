"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const dotenv_1 = __importDefault(require("dotenv"));
const swagger_output_json_1 = __importDefault(require("../swagger-output.json"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const APP_NAME = "Node.js Express API with Swagger Documentation and TypeScript";
const app = (0, express_1.default)();
dotenv_1.default.config();
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.get("/", (req, res) => {
    res.send(`
  <h1>${APP_NAME}</h1>
  <p>Documentation can be found at <a href="/api-docs">/api-docs</a></p>
  `);
});
app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_output_json_1.default));
app.use("/api/v1/auth", auth_routes_1.default);
exports.default = app;
