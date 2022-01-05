import { TagEntity } from "../features/Tag/TagEntity";

export class TagService {
  static createTags(tags: string[], productId: string) {
    tags.forEach(
      async (tag) => await TagEntity.create({ productId, text: tag }).save()
    );
  }
}
