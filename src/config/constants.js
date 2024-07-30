import { swatch, fileIcon, ai, logoShirt, stylishShirt } from "../assets"; 

export const EditorTabs = [
  {
    name: "colorpicker",
    icon: swatch,
  },
  {
    name: "filepicker",
    icon: fileIcon,
  },
  {
    name: "modelpicker",
    icon: 'modelpicker',
  },
];

export const FilterTabs = [

  {
    name: "stylishShirt",
    icon: stylishShirt,
  },
];

export const DecalTypes = {

  full: {
    stateProperty: "fullDecal",
    filterTab: "stylishShirt",
  },
};
