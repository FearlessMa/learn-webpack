import style from "./es6.less";

export const es6 = () => {
    const arr = [
        new Promise((resolve, reject) => {}),
        new Promise((resolve, reject) => {}),
    ];

    arr.map((item) => {
        console.log("item: ", item);
    });
};
export const es7 = () => {
    console.log("es7");
};
console.log("style: ", style);
