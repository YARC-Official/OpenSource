// ==== LOAD SOURCES ==== //

let sources = [];

Promise.all([
	fetch("../../base/index.json").then(i => i.json()),
	fetch("../../extra/index.json").then(i => i.json()),
]).then(indexes => {
	// Consolidate into one list
	sources = indexes.flatMap((i, index) => i.sources.map(j => {
		j.from = index;
		return j;
	}));

	// Create list after everything is loaded
	createList();
});

// ==== CREATE LIST ==== //

function createList() {
	const container = document.getElementById("table");

	for (const source of sources) {
		const urls = [
			`../../base/icons/${source.icon}.png`,
			`../../extra/icons/${source.icon}.png`
		];

		createIconHolder(source.ids, source.names["en-US"], urls[source.from], urls[1 - source.from], source.type);
	}

	function createIconHolder(idsIn, nameIn, iconIn, altIconIn, typeIn) {
		let row = document.createElement("tr");

		// Icon(s)
		// Load both the base and extra icon
		// Which everone works is the correct one 
		let iconData = document.createElement("td");
		let icon = document.createElement("img");
		icon.src = iconIn;
		icon.onerror = function () {
			this.src = altIconIn;
			this.onerror = null;
		}
		iconData.appendChild(icon);
		row.appendChild(iconData);

		// Possible IDs
		let ids = document.createElement("td");
		for (const id of idsIn) {
			let p = document.createElement("p");
			p.textContent = id;
			ids.appendChild(p);
		}
		row.appendChild(ids);

		// Name (en-US)
		let name = document.createElement("td");
		name.textContent = nameIn;
		row.appendChild(name);

		// Type (type)
		let type = document.createElement("td");
		type.textContent = typeIn;
		row.appendChild(type);

		container.appendChild(row);
	}
}