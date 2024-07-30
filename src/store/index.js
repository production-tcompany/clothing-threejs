import { proxy } from "valtio";
const state =  proxy({
    
    intro: true, // whether we are in the homepage or not
    color : '#EFBD48',
    isFullTexture: false,
    fullDecal : 'threejs.png',// store the dress png
});
export default state