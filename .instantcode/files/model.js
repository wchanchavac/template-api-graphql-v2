import { merge } from 'es-toolkit';
import { DataTypes } from 'sequelize';
import sequelize from '../../config/database.js';
import BaseModel from '../../shared/BaseModel.js';

class {{Singular}} extends BaseModel {
	static associate(models) {

		{{#each associations}}
			models.{{../Singular}}.{{this.type}}(models.{{this.SModel}}, {
				constraints: false,
				foreignKey: {
					allowNull: {{#if this.required}} false {{else}} true {{/if}},
					{{#if this.isManyToMany}}
					name: "{{../singular}}Id",
					{{/if}}
				},
				{{#if this.isManyToMany}}
					{{#if this.isIntermediateModel}}
					through: { model: models.{{this.intermediateModel}}, unique: false },
					{{else}}
					through: '{{{this.through}}}',
					{{/if}}
				{{/if}}
			})
		{{/each}}

	}
}

{{Singular}}.init(
	{
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
			allowNull: false,
		},
		createdBy: {
			type: DataTypes.UUID,
			allowNull: true,
		},
		{{#if scope}}
		{{/if}}
		{{#each attributes}}
			{{{this.name}}}: {
				type: DataTypes.{{{this.dataType}}},
				comment: '{{{this.label}}}',
				allowNull: {{#if this.required}} false {{else}} true {{/if}},
				{{#if this.isDefault}}
					defaultValue: {{{this.defaultValue}}},
				{{/if}}
				{{#if this.isEnum}} 
					values : [
						{{#each this.values}}
							'{{{this}}}',
						{{/each}}
					],
				{{/if}}
				{{#if this.isJSON}} 
					set(val) {
						let {{{this.name}}} = this.getDataValue('{{{this.name}}}')
						this.setDataValue(
							'{{{this.name}}}',
							merge(
								{{#if this.isDefault}}
									{{{this.defaultValue}}},
								{{else}}
									{},
								{{/if}}
								{{{this.name}}},
								val,
							),
						)
					},
				{{/if}}
			},
		{{/each}}
	},
	{
		sequelize,
		modelName: '{{singular}}',
		freezeTableName: true,
		paranoid: true,
		defaultScope: {
			attributes: {
				exclude: ['updatedAt', 'deletedAt'],
			},
		},
		scopes: {
			{{#if scope}} 
			{{/if}}
		},
		/*indexes: [
			{{#each associations}}
				{{#if this.isSingular}}
				{
					fields: [ "{{this.sModel}}Id"],
					name: '{{../singular}}_{{this.sModel}}_id_idx',
					using: 'BTREE',
				},
				{{/if}}
			{{/each}}
		], */
	},
)

// Use this to add auth methods to the model
// addAuthMethodsToModel({{Singular}}, { field: 'password' });
// this add authenticate and changePassword methods to the model
// and a hook to hash the password before saving

export default {{Singular}};