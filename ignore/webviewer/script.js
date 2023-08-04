// @ts-check

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
 * @typedef {Object} Source
 * @property {string[]} ids - An array of IDs.
 * @property {{"en-US": string, [key: string]: string }} names - Object containing the source name in different languages.
 * @property {string} icon - The icon for the source.
 * @property {"custom"|"game"|"charter"|"rb"|"gh"} type - The type of the source.
 */