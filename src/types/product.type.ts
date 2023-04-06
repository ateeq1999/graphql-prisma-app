const typeName = 'product'
const singlurName = "Product"
const pluralName = "Products"

const attrs = `
    name_ar:         String
    name_en:         String
    secintefic_name: String
    active_material: String
    trade_name:      String
    units:           String
    price:           Int
    quantity:        Int
`


// orders          [Order]
const relations = `
    categories:      [Category]
`

const queries = `
    get${singlurName}(id: ID!): ${singlurName}
    get${pluralName}: [${singlurName}]
`

const mutations = `
    create${singlurName}(input: ${typeName}Input): CreateProductResponse
    create${singlurName}WithCategories(input: ${typeName}Input, ids: [String]): CreateProductResponse
    update${singlurName}(id: ID!, input: ${typeName}Input): CreateProductResponse
    update${singlurName}WithCategories(id: ID!, input: ${typeName}Input, ids: [String]): CreateProductResponse
`

const type = `
    type ${singlurName} {
        id: ID
        ${attrs}
        createdAt: DateTime
        updatedAt: DateTime
        ${relations}
    }
`

const input = `
    input ${typeName}Input {
        ${attrs}
    }

    type ${pluralName}Response {
        error: Int
        msg: String
        data: [${singlurName}]
    }
`

export default {
  attrs,
  relations,
  queries,
  mutations,
  type,
  input
}
