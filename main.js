"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const http_exception_filter_1 = require("./filters/http-exception.filter");
const transform_interceptor_1 = require("./interceptor/transform.interceptor");
const app_module_1 = require("./app.module");
const validate_pipe_1 = require("./pipe/validate.pipe");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.setGlobalPrefix('api');
    app.useGlobalFilters(new http_exception_filter_1.HttpExceptionFilter());
    app.enableCors();
    app.useGlobalInterceptors(new transform_interceptor_1.TransformInterceptor());
    app.useGlobalPipes(new validate_pipe_1.ValidationPipe());
    app.set('trust proxy', 1);
    app.use((0, express_rate_limit_1.default)({
        windowMs: 15 * 60 * 1000,
        max: 1000,
    }));
    await app.listen(process.env.PORT || 3000);
}
bootstrap();
//# sourceMappingURL=main.js.map