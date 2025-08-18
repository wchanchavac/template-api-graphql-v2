type Session {
    token: String!
}

input SignUp {
    {{#each attributes}}
    {{#if this.isEnum}}
    {{{this.name}}}: User{{{this.Name}}}{{#if this.required}}! {{/if}}
    {{else}}
    {{{this.name}}}: {{{this.graphqlType}}}{{#if this.required}}! {{/if}}
    {{/if}}
    {{/each}}
    {{#each associations}}
    {{#if this.isPlural}}
    # {{{this.pModel}}}: [ID]{{#if this.required}}! {{/if}}
    {{else}}
    {{{this.sModel}}}Id: ID{{#if this.required}}! {{/if}}
    {{/if}}
    {{/each}}
}

type Message {
    message: String
}

type File {
    url: URL!
    name: String!
}

type Query {
    downloadFile(input: UploadFile): File!
    version: String
}

input Options {
    where: JSONObject
    limit: Int = 10
    # offset: Int
    page: Int = 1
    order: [[String!]!]
}

input UploadFile {
    file: String!
    key: String = "files"
}

type Mutation {
    signIn(email: EmailAddress!, password: String!): Session!
    signUp(input: SignUp): Message!
    uploadFile(input: UploadFile): File!
}