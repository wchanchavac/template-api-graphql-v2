{{#each data}}
	import {{{this.singular}}}Loader from './{{{this.singular}}}.loader.js';
{{/each}}

export  {
    {{#each data}}
	{{{this.singular}}}Loader,
    {{/each}}
}