
const type = `
  union CreateCategoryResponse = Category | ValidationError
  union CreateProductResponse = Product | ValidationError

  type Issue {
    code: String
    fatal: Boolean
    message: String
    path: [String]
  }

  type ValidationError {
    issues: [Issue]
  }
`

export default {
  type
}
