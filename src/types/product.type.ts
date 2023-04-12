const typeName = 'product'
const singlurName = "Product"
const pluralName = "Products"

const attrs = `
    name_ar:         String
    name_en:         String
    secintefic_name: String
    active_material: String
    trade_name:      String
    unit:            Unit
    type:            ProductType
    price:           Float
    quantity:        Float
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
    create${singlurName}(input: ${typeName}Input): Create${singlurName}Response
    create${singlurName}WithCategories(input: ${typeName}Input, ids: [String]): Create${singlurName}Response
    update${singlurName}(id: ID!, input: ${typeName}Input): Create${singlurName}Response
    update${singlurName}WithCategories(id: ID!, input: ${typeName}Input, ids: [String]): Create${singlurName}Response
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

    enum ProductType {
        LIQUID
        TABLET
        CAPSULES
    }

    enum Unit {
        KILOGRAM
        GRAM
        MILLIGRAM
        MICROGRAM
        LITER
        MILLILITER
        CUBICCENTIMETRE
        MOLE
        MILLIMOLE
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
