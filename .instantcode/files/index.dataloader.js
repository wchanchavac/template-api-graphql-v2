{{#each data}}
	import {{{this.singular}}}Loader from './{{{this.singular}}}.loader.js';
{{/each}}

const loaders = {
    {{#each data}}
	{{{this.singular}}}Loader,
    {{/each}}
}

export default loaders;