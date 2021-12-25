import { Arg, Query, Resolver, ID, Mutation } from "type-graphql";
import { Category } from "../entities/Category";
import { CategoryResponse } from "../objects/Category/CategoryResponse";
import { DummyResponse } from "../objects/DummyResponse";
import { hash } from "argon2";
import { CategoryInput } from "../objects/Category/CategoryInput";

@Resolver()
export class CategoryResolver {
  @Query(() => DummyResponse)
  test(): DummyResponse {
    return {
      message: "everything is working!",
    };
  }

  @Query(() => [Category])
  categories(): Promise<Category[]> {
    return Category.find({});
  }

  @Query(() => Category, { nullable: true })
  async category(
    @Arg("categoryIdOrName", () => ID) categoryIdOrName: string
  ): Promise<Category | null> {
    const categoryById = await Category.findOne(categoryIdOrName);
    if (categoryById) return categoryById;

    const categoryByName = await Category.findOne({
      where: { name: categoryIdOrName },
    });
    if (categoryByName) return categoryByName;

    return null;
  }

  @Mutation(() => CategoryResponse, { nullable: true })
  async createCategory(
    @Arg("input", () => CategoryInput)
    createCategoryInput: CategoryInput
  ): Promise<CategoryResponse> {
    const { name } = createCategoryInput;

    const categoryAlreadyExists = await Category.findOne({ where: { name } });
    if (categoryAlreadyExists) {
      return {
        error: {
          field: "name",
          message: "a category with that name already exists",
          ufm: "A category with that name already exists. Please enter a different one.",
        },
      };
    }

    const newCategory = await Category.create({
      name,
    }).save();
    return {
      category: newCategory,
    };
  }
}
