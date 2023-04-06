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

//   categories      [Category]
//   orders          [Order]

const relations = `

`

const queries = `
    get${singlurName}(id: ID!): ${singlurName}
    get${pluralName}: [${singlurName}]
`

const mutations = `
    create${singlurName}(input: ${typeName}Input): ${singlurName}
    create${singlurName}WithCategories(id: ID!, input: ${typeName}Input, ids: [String]): ${singlurName}
    update${singlurName}(id: ID!, input: ${typeName}Input): ${singlurName}
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
