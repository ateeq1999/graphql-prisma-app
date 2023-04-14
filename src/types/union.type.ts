
const type = `
  union CreateCategoryResponse = Category | ValidationError
  union CreateProductResponse = Product | ValidationError
  union CreateAdminResponse = Admin | ValidationError
  union CreatePlanResponse = Plan | ValidationError
  union CreateCompanyResponse = Company | ValidationError

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
