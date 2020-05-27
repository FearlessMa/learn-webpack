import logo from './img/webpack4.png';
import style from './css/index.less';
import { createImg } from './src/createAvatar.js'
import { es6 } from './src/es6';
import _ from 'lodash';

const el = document.getElementById('app');
const img = new Image();
img.src = logo;
img.classList.add(style.avatar);
el.appendChild(img);

// console.log(m)
const elImg = createImg();
el.appendChild(elImg);
// const a = 'a'
es6()

// const App = () => <div>123</div>
class App extends React.Component {

  render() {
    return <div>
      <img className={style.avatar} src={logo} />
    </div>
  }
}

ReactDOM.render(<App />, document.getElementById('app'));