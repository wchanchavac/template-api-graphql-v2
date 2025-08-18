import sequelize from '../config/database.js';
{{#each data}}
	import {{{this.Singular}}} from './models/{{{this.singular}}}.model.js';
{{/each}}

const db = {
    {{#each data}}
	{{{this.Singular}}},
    {{/each}}
	sequelize
}

for (const key in db) {
	if (Object.hasOwnProperty.call(db, key)) {
		const entity = db[key]
		if (entity.associate) {
			entity.associate(db)
		}
	}
}

export default db;