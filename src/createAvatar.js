import logo from "../img/webpack4.png";
import style from "../css/index.less";

export const createImg = () => {
    const img = new Image();
    img.src = logo;
    img.classList.add(style.avatar);
    return img;
};
