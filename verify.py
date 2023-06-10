import json
import os

ids = []

icons = []
usedIcons = []

def scanIcons(parent):
	global icons
	
	path = os.path.join(parent, "icons")
	for file in os.listdir(path):
		icons.append(os.path.splitext(os.path.basename(file))[0])

	print(f"Found {len(icons)} icons in `{parent}`")

def scan(parent):
	global ids

	index = open(os.path.join(parent, "index.json"))
	data = json.load(index)
	
	for source in data["sources"]:
		# Look for duplicate ids
		for id in source["ids"]:
			if id in ids:
				sourceName = source["names"]["en-US"]
				print(f"ERROR: Duplicate id `{id}` in `{sourceName}`")
			else:
				ids.append(id)

		# See if icon exists
		icon = source["icon"]
		if not icon in icons:
			print(f"ERROR: Icon `{icon}` does not exist!")
		elif not icon in usedIcons:
			usedIcons.append(icon)
	
	# Check for extra icons
	unused = list(set(icons).difference(usedIcons))
	if len(unused) != 0:
		print(f"WARNING: {len(unused)} unused icons.")
		for i in unused:
			print(f" - {i}")

	print(f"Done scanning `{parent}`.")

scanIcons("base")
scan("base")