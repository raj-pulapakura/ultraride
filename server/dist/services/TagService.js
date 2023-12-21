"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagService = void 0;
const TagEntity_1 = require("../features/Tag/TagEntity");
class TagService {
    static createTags(tags, productId) {
        tags.forEach(async (tag) => await TagEntity_1.TagEntity.create({ productId, text: tag }).save());
    }
}
exports.TagService = TagService;
