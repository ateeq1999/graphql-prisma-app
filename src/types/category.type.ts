const typeName = 'category'
const singlurName = "Category"
const pluralName = "Categories"

const attrs = `
  name: String!
`

const relations = `

`

const queries = `
    get${singlurName}(id: ID!): ${singlurName}
    get${pluralName}: [${singlurName}]
`

const mutations = `
    create${singlurName}(input: ${typeName}Input): ${singlurName}
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
