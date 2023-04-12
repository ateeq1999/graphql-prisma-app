const typeName = 'plan'
const singlurName = "Plan"
const pluralName = "Plans"

const attrs = `
  name: String!
  price: Float!
  desc: String
`

const relations = `
`

const queries = `
    get${singlurName}(id: ID!): ${singlurName}
    get${pluralName}: [${singlurName}]
`

const mutations = `
    create${singlurName}(input: ${typeName}Input): Create${singlurName}Response
    update${singlurName}(id: ID!, input: ${typeName}Input): Create${singlurName}Response
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

`

export default {
  attrs,
  relations,
  queries,
  mutations,
  type,
  input
}
