// @ts-check

/** @type {{[key in SourceTypes]: string}} */
const types = {
	"gh": "Guitar Hero",
	"rb": "Rock Band",
	"game": "Games",
	"charter": "Charter",
	"custom": "Custom"
}

class SourceElement extends HTMLElement {
	/** @param {Source} source */
	constructor(source) {
		super();

		const template = document.getElementById("source_template");
        if(!(template instanceof HTMLTemplateElement)) throw new Error("Source template not existent on DOM");

        this.replaceChildren(template.content.cloneNode(true));

		this.assignIcon(source.icon);
		this.assignName(source.names["en-US"]);
		this.assignTags(source.ids);
	}

	/**
	 * @param {string} iconName 
	 */
	assignIcon(iconName) {
		const iconContainer = this.querySelector("picture");
		if(!iconContainer) return;

		const primary = `../../base/icons/${iconName}.png`;
		const secondary = `../../extra/icons/${iconName}.png`;

		const primaryImageElement = iconContainer.querySelector("img");
		if(primaryImageElement) {
			primaryImageElement.src = primary;
		}

		const secondImageElement = iconContainer.querySelector("source");
		if(secondImageElement) {
			secondImageElement.srcset = secondary;
		}
	}

	/**
	 * @param {string} sourceName 
	 */
	assignName(sourceName) {
		const nameContainer = this.querySelector(".name");
		if(!nameContainer) return;

		nameContainer.textContent = sourceName;
	}

	/**
	 * @param {string[]} tags 
	 */
	assignTags(tags) {
		const tagsContainer = this.querySelector(".tags");
		if(!tagsContainer) return;

		const tagsElements = tags.map(tagName => {
			const tagElement = document.createElement("div");
			tagElement.classList.add("tag");

			tagElement.textContent = tagName;
			return tagElement;
		});

		tagsContainer.append(...tagsElements);
	}

}

if ('customElements' in window) {
	customElements.define('open-source', SourceElement);
}

/**
 * Creates a type section
 * @param {string} id 
 * @param {string} name 
 */
function createTypeElement(id, name) {
	const typesContainer = document.getElementById("types");

	const container = getTemplate("type_template");

	if(container) {
		container.id = id;
		const nameContainer = container.querySelector(".name");
		nameContainer?.replaceChildren(new Text(name));

		typesContainer?.append(container);
	}
}

/**
 * Creates a new stat for a type.
 * @param {string} id 
 * @param {string} name 
 */
function createStatElement(id, name) {
	const statsContainer = document.getElementById("stats");

	const container = getTemplate("stat_template");

	if(container) {
		container.id = `${id}-stat`;

		const nameContainer = container.querySelector(".name");
		nameContainer?.replaceChildren(new Text(name));

		statsContainer?.append(container);
	}
}

/**
 * Creates a clone from template
 * @param {string} templateId 
 * @returns {HTMLElement|undefined}
 */
function getTemplate(templateId) {
	const template = document.getElementById(templateId);
	if(!(template instanceof HTMLTemplateElement)) throw new Error(`${templateId} not existent on DOM`);
	
	const container = template.content.firstElementChild?.cloneNode(true);

	if(container instanceof HTMLElement) {
		return container;
	}

	return;
}

function processTypes() {
	Object.keys(types).forEach(type => {
		const typeName = types[type];

		createTypeElement(type, typeName);
		createStatElement(type, typeName);
	});
}

processTypes();

/**
 * Type definitions
 */

/**
 * @typedef {Object} Source
 * @property {string[]} ids - An array of IDs.
 * @property {{"en-US": string, [key: string]: string }} names - Object containing the source name in different languages.
 * @property {string} icon - The icon for the source.
 * @property {SourceTypes} type - The type of the source.
 */

/**
 * @typedef {"custom"|"game"|"charter"|"rb"|"gh"} SourceTypes
 */