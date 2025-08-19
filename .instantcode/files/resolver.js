import { GraphQLError } from 'graphql';
import { getSession } from  '../../auth/index.js';
import { 
{{#each associations}}
{{{sModel}}}Loader,
{{/each}}
} from '../../loaders/index.js';

export default {
    Query: {
        async {{plural}}(obj, { options }, { db, req }) {
			const session = await getSession(req)

            return await db.{{Singular}}.findAndCountAllByPage(options)
        },
        async {{singular}}(obj, { id }, { db, req }) {
			const session = await getSession(req)

			let data = await db.{{Singular}}.findByPk(id)
			if (!data) throw new GraphQLError(`{{Singular}} with id: ${id} not found`, {
                    extensions: {
                      code: 'NOT_FOUND',
                    },
                  })
			return data
        },
    },
    Mutation: {
        async create{{Singular}}(obj, { input }, { db, req }) {
			const session = await getSession(req)

			return await db.{{Singular}}.create({ ...input, ...session })
        },
        async update{{Singular}}(obj, { input }, { db, req }) {
			const session = await getSession(req)

			const { id } = input

			let data = await db.{{Singular}}.findByPk(id)
			if (!data) throw new GraphQLError(`{{Singular}} with id: ${id} not found`, {
                    extensions: {
                      code: 'NOT_FOUND',
                    },
                  })
			await data.update(input)
			return data
        },
        async delete{{Singular}}(obj, { id }, { db, req }) {
			const session = await getSession(req)

			let data = await db.{{Singular}}.findByPk(id)
			if (!data) throw new GraphQLError(`{{Singular}} with id: ${id} not found`, {
                    extensions: {
                      code: 'NOT_FOUND',
                    },
                  })
			await data.destroy()

            return data;
        }
    },
    {{Singular}}: {
        {{#each associations_filtered}}
        {{#if this.isPlural}}
        /*
        async {{{this.pModel}}}({{../singular}}, { options }, { db, literal }) {
            return await {{{this.sModel}}}Loader.load({{../singular}}.{{{this.sModel}}}Id);
        },
        */
        {{else}}
        async {{{this.sModel}}}({{../singular}}, { options }, { db, literal }) {
            return await {{{this.sModel}}}Loader.load({{../singular}}.{{{this.sModel}}}Id);
        },
        {{/if}}
        {{/each}}
    }
}