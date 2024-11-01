"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoardResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const boards_service_1 = require("./boards.service");
const createBoard_input_1 = require("./dto/createBoard.input");
const boards_entity_1 = require("./entities/boards.entity");
let BoardResolver = class BoardResolver {
    constructor(boardService) {
        this.boardService = boardService;
    }
    fetchBoards() {
        return this.boardService.findAll();
    }
    createBoard(writer, title, contents, createBoardInput) {
        console.log(writer);
        console.log(title);
        console.log(contents);
        console.log(createBoardInput);
        return this.boardService.create();
    }
};
__decorate([
    (0, graphql_1.Query)(() => [boards_entity_1.Board]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BoardResolver.prototype, "fetchBoards", null);
__decorate([
    (0, graphql_1.Mutation)(() => String),
    __param(0, (0, graphql_1.Args)({ name: 'writer', nullable: true })),
    __param(1, (0, graphql_1.Args)('title')),
    __param(2, (0, graphql_1.Args)('contents')),
    __param(3, (0, graphql_1.Args)('createBoardInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, createBoard_input_1.CreateBoardInput]),
    __metadata("design:returntype", void 0)
], BoardResolver.prototype, "createBoard", null);
BoardResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [boards_service_1.BoardService])
], BoardResolver);
exports.BoardResolver = BoardResolver;
//# sourceMappingURL=boards.resolvers.js.map