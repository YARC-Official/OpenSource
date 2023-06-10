import json
import os

ids = []

icons = []
usedIcons = []
enNames = []

def scanIcons(parent):
	global icons
	
	path = os.path.join(parent, "icons")
	count = 0
	for file in os.listdir(path):
		name = os.path.splitext(os.path.basename(file))[0]
		if name in icons:
			print(f"ERROR: Found duplicate icon `{name}` in `{parent}`")
		else:
			icons.append(name)
			count += 1
	
	print(f"Found {count} icons in `{parent}`")

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
		
		# Look for a duplicate name
		name = source["names"]["en-US"]
		if name in enNames:
			print(f"WARN: Duplicate name `{name}` can be consolidated")
		else:
			enNames.append(name)

		# See if icon exists
		icon = source["icon"]
		if not icon in icons:
			print(f"ERROR: Icon `{icon}` does not exist")
		elif not icon in usedIcons:
			usedIcons.append(icon)
	
	# Check for extra icons
	unused = list(set(icons).difference(usedIcons))
	if len(unused) != 0:
		print(f"WARNING: {len(unused)} unused icons")
		for i in unused:
			print(f" - {i}")

	print(f"Done scanning `{parent}`")

scanIcons("base")
scan("base")

scanIcons("extra")
scan("extra")