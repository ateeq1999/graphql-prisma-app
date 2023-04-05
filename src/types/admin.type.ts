const typeName = 'admin'
const singlurName = "Admin"
const pluralName = "Admins"

const attrs = `
  email: String!
  password: String!
`

const relations = `

`

const queries = `
    get${singlurName}(id: ID!): ${singlurName}
    get${pluralName}: [${singlurName}]
`

const mutations = `
    create${singlurName}(input: ${typeName}Input!): CreateAdminResponse
    update${singlurName}(id: ID!, input: ${typeName}Input!): ${singlurName}
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
        error: ZodError
        msg: String
        data: [${singlurName}]
    }

    type CreateAdminResponse {
        error: ZodError
        msg: String
        data: ${singlurName}
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
