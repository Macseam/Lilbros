'use strict';

export default function cyrillicToTranslit() {

  let _associations = {
    "а": "a",
    "б": "b",
    "в": "v",
    "ґ": "g",
    "г": "g",
    "д": "d",
    "е": "e",
    "ё": "e",
    "є": "ye",
    "ж": "zh",
    "з": "z",
    "и": "i",
    "і": "i",
    "ї": "yi",
    "й": "i",
    "к": "k",
    "л": "l",
    "м": "m",
    "н": "n",
    "о": "o",
    "п": "p",
    "р": "r",
    "с": "s",
    "т": "t",
    "у": "u",
    "ф": "f",
    "x": "h",
    "ц": "c",
    "ч": "ch",
    "ш": "sh",
    "щ": "sh'",
    "ъ": "",
    "ы": "y",
    "ь": "",
    "э": "e",
    "ю": "yu",
    "я": "ya"
  };

  return {
    transform: transform
  };

  function transform(str, spaceReplacement) {
    if (!str) {
      return "";
    }

    let new_str = "";
    for (let i = 0; i < str.length; i++) {
      let strLowerCase = str[i].toLowerCase();
      if (strLowerCase === " " && spaceReplacement) {
        new_str += spaceReplacement;
        continue;
      }
      if (!_associations[strLowerCase]) {
        new_str += strLowerCase;
      }
      else {
        new_str += _associations[strLowerCase];
      }
    }
    return new_str;
  }
};