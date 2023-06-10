# OpenSource
OpenSource (get it?) is a large list of guitar-game source icons, and source names, in different languages!

![Banner](./ignore/banner.png)

# 📝 Specifications for Use

The icons are split into two folders: `base`, and `extra`. `base` is meant for super-common, widely-used icons, and should only contain icons of official games. `extra` is meant for everything else!

Everything in the `ignore` folder can be ignored, and are only used for repo stuff (like the banner in this README).

In each of these folders, there is a `index.json` file, which contains the index of icons, ids, and source names. Specifications for that are below.

**All icons must be in `.png` and must follow the design guidelines!**

## `index.json`

| Key | Description | Data type / Possible values |
| --- | --- | --- |
| `type` | The type of index. | `"base"` or `"extra"`
| `sources` | The array containing all of the source information. | `Source[]`

## `Source`

| Key | Description | Data type / Possible values | Example |
| --- | --- | --- | --- |
| `ids` | An array of strings containing all of the possible ids for the specific source. This is the same id that shows up in `song.ini`'s `icon` tag, etc. **All ids should be unique!** The `$DEFAULT$` id is reserved for the fallback source and is defined in `base/index.json`. | `string[]` | `"ids": [ "gh", "gh1" ]` |
| `names` | An object of display names in different locales. `en-US` must be present (as that is the fallback). | `locale: name` where `locale` is from [this list](https://learn.microsoft.com/en-us/bingmaps/rest-services/common-parameters-and-types/supported-culture-codes), and `name` is a display name in that locale. | `"names": { "en-US": "Guitar Hero" }` |
| `icon` | The name of the icon file. Omit the `.png`. Icons from `base` can be used in `extra`, but **not** vice-versa. | `string` | `"icon": "gh"` |
| `type` | The type of source. | `"custom"`, `"game"`, `"charter"`, `"rb"`, or `"gh"`. `"rb"` and `"gh"` are limited to those specific game types. | `"type": "gh"` |