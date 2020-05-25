
import logo from './img/webpack4.png';
import style from './css/index.less';
import { createImg } from './src/createAvatar.js'

const a = 'a';
const el = document.getElementById('app');
const img = new Image();
img.src = logo;
img.classList.add(style.avatar);
el.appendChild(img);

// conle.log(1)
const elImg = createImg();
el.appendChild(elImg);


