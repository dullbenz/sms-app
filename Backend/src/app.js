"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeApp = void 0;
const express_1 = __importDefault(require("express"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const yamljs_1 = __importDefault(require("yamljs"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const routes_1 = require("./routes");
const error_handling_1 = require("./middleware/error-handling");
const initializeApp = (app) => {
    // view engine setup
    // app.set('views', path.join(__dirname, 'views'));
    // app.set('view engine', 'jade');
    app.use((0, morgan_1.default)('dev'));
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: false }));
    app.use((0, cookie_parser_1.default)());
    // app.use(express.static(path.join(__dirname, 'public')));
    // Corse Policies
    var corsOptions = {
        origin: '*',
        optionsSuccessStatus: 200 // For legacy browser support
    };
    app.use((0, cors_1.default)(corsOptions));
    // Include Routers
    (0, routes_1.includeRoutes)(app);
    // Attach API Documentation
    // Swagger documentation route
    if (process.env.SERVER_ENV !== 'NETLIFY') {
        app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(yamljs_1.default.load("./swagger.yaml")));
    }
    // catch 404 and forward to error handler
    // app.use(function (req, res, next) {
    //   next(createError(404));
    // });
    // Attach Error Handlers
    app.use(error_handling_1.mainErorHandler);
};
exports.initializeApp = initializeApp;
