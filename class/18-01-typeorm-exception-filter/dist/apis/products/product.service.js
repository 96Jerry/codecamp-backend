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
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const product_entity_1 = require("./entities/product.entity");
const typeorm_2 = require("@nestjs/typeorm");
let ProductService = class ProductService {
    constructor(productRepository) {
        this.productRepository = productRepository;
    }
    async findAll() {
        return await this.productRepository.find();
    }
    async findOne({ productId }) {
        return await this.productRepository.findOne({ where: { id: productId } });
    }
    async create({ createProductInput }) {
        const result = await this.productRepository.save(Object.assign({}, createProductInput));
        return result;
    }
    async update({ productId, updateProductInput }) {
        const myproduct = await this.productRepository.findOne({
            where: { id: productId },
        });
        const newProduct = Object.assign(Object.assign(Object.assign({}, myproduct), { id: productId }), updateProductInput);
        return await this.productRepository.save(newProduct);
    }
    async checkSoldout({ productId }) {
        const product = await this.productRepository.findOne({
            where: { id: productId },
        });
        if (product.isSoldout) {
            throw new common_1.UnprocessableEntityException('이미 판매 완료된 상품입니다.');
        }
    }
};
ProductService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(product_entity_1.Product)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], ProductService);
exports.ProductService = ProductService;
//# sourceMappingURL=product.service.js.map