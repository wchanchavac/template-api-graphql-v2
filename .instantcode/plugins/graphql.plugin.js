const { pluralize, singularize, camelize } = require('inflection')

module.exports = (config) => {
	let dataTypes = {
		hexadecimal: 'Hexadecimal',
		string: 'String',
		float: 'Float',
		boolean: 'Boolean',
		integer: 'Int',
		uuid: 'UUID',
		email: 'EmailAddress',
		json: 'JSON',
		url: 'URL',
		enum: 'enum',
		date: 'DateTime',
		dateOnly: 'LocalDate',
	}

	let mySqlDataTypes = {
		string: 'STRING',
		float: 'FLOAT',
		boolean: 'BOOLEAN',
		integer: 'INTEGER',
		uuid: 'UUID',
		email: 'STRING',
		json: 'JSON',
		url: 'STRING',
		enum: 'ENUM',
		date: 'DATE',
		dateOnly: 'DATEONLY',
	}

	let belongsToManyAssociations = []
	for (let i = 0; i < config.data.data.length; i++) {
		let model = config.data.data[i]
		config.data.data[i].enums = []
		const attributes = config.data.data[i].attributes || []
		for (let ii = 0; ii < attributes.length; ii++) {
			let a = attributes[ii]
			console.log(JSON.stringify(a, null, 2))
			// try {?

			a.Name = camelize(`${a.name}`)
			a.name = camelize(`${a.name}`, true)
			a.type = camelize(a.type, true)
			a.isDefault = a.defaultValue ? true : false
			a.isEnum = Array.isArray(a.values) && a.type === 'enum'
			a.isJSON = a.type === 'json'

			if (a.defaultValue === '') {
				// delete a.defaultValue
				a.isDefault = false
			}
			// } catch (error) {
			// 	console.log(error);
			// }
			if (a.type === 'enum' && a.isEnum) {
				a.values = a.values.map((v) => v.toUpperCase())
				config.data.data[i].enums.push(a)
			}

			if (dataTypes.hasOwnProperty(a.type)) {
				attributes[ii].graphqlType = dataTypes[a.type]
				console.error(
					'🚀 ~ file: graphql.plugin.js:59 ~ dataTypes[a.type]:',
					dataTypes[a.type]
				)
			} else {
				attributes[ii].graphqlType = 'String'
			}

			if (mySqlDataTypes.hasOwnProperty(a.type)) {
				attributes[ii].dataType = mySqlDataTypes[a.type]
			} else {
				attributes[ii].dataType = 'STRING'
			}
		}

		const associations = config.data.data[i].associations || []
		for (let ii = 0; ii < associations.length; ii++) {
			let a = associations[ii]
			a.model = camelize(singularize(a.model))
			a.PMODEL = camelize(pluralize(a.model), true).toUpperCase()
			a.SMODEL = camelize(a.model, true).toUpperCase()
			a.pModel = camelize(pluralize(a.model), true)
			a.sModel = camelize(a.model, true)
			a.PModel = camelize(pluralize(a.model))
			a.SModel = camelize(a.model)
			a.Label = `${a.label}`.trim()
			a.label = `${a.Label}`.trim().toLowerCase()
			a.LABEL = `${a.Label}`.trim().toUpperCase()
			a.SModel = camelize(a.model)
			a.isManyToMany = ['belongsToMany'].includes(a.type)
			a.isIntermediateModel = !a.intermediateModel ? false : true
			a.isPlural = !['belongsTo', 'hasOne'].includes(a.type)
			a.isSingular = ['belongsTo', 'hasOne'].includes(a.type)

			if (a.isManyToMany) {
				let through = `${model.singular}_${a.sModel}`
				let through2 = `${a.sModel}_${model.singular}`
				if (belongsToManyAssociations.includes(through)) {
					a.through = through
				} else if (belongsToManyAssociations.includes(through2)) {
					a.through = through2
				} else {
					belongsToManyAssociations.push(through)
					a.through = through
				}
			}
		}
	}

	return config
}
