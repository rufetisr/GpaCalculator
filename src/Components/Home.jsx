import React from 'react';
import './Home.css'
import Section from './Section';
import context from '../Context/Context';
import { useContext } from 'react';
import { useState, useRef } from 'react';

let arr1 = [<Section />, <Section />, <Section />]

const Home = () => {
  const { count, setCount } = useContext(context);
  // const inp = useRef();
  // const { totalAct, setTotalAct } = useState('ac');

  const ChangeCount = (e) => {
    arr1 = [];
    for (let i = 0; i < e.target.value; i++) {
      arr1.push(<Section />);
    }
    setCount(e.target.value);
  }

  const Calc = () => {
    let inpTotal = document.querySelector('#total');

    let total = 0;

    if (count == 3) {
      let p1 = Number(document.querySelector('.home-ul').children[0].firstElementChild.firstElementChild.value);
      let c1 = Number(document.querySelector('.home-ul').children[0].firstElementChild.lastElementChild.value);
      // console.log(typeof (p1));
      let p2 = Number(document.querySelector('.home-ul').children[1].firstElementChild.firstElementChild.value);
      let c2 = Number(document.querySelector('.home-ul').children[1].firstElementChild.lastElementChild.value);

      let p3 = Number(document.querySelector('.home-ul').children[2].firstElementChild.firstElementChild.value);
      let c3 = Number(document.querySelector('.home-ul').children[2].firstElementChild.lastElementChild.value);

      if (p1 != '' && p2 != '' && c1 != '' && c2 != '' && p3 != '' && c3 != '') {
        total = (p1 * c1 + p2 * c2 + p3 * c3) / (c1 + c2 + c3);
        total = total.toFixed(3);
        inpTotal.value = `UOMG: ${total}`;
      }
      else {
        alert('Please fill everything!')
      }
    }
    else if (count == 4) {
      let p1 = Number(document.querySelector('.home-ul').children[0].firstElementChild.firstElementChild.value);
      let c1 = Number(document.querySelector('.home-ul').children[0].firstElementChild.lastElementChild.value);

      let p2 = Number(document.querySelector('.home-ul').children[1].firstElementChild.firstElementChild.value);
      let c2 = Number(document.querySelector('.home-ul').children[1].firstElementChild.lastElementChild.value);

      let p3 = Number(document.querySelector('.home-ul').children[2].firstElementChild.firstElementChild.value);
      let c3 = Number(document.querySelector('.home-ul').children[2].firstElementChild.lastElementChild.value);

      let p4 = Number(document.querySelector('.home-ul').children[3].firstElementChild.firstElementChild.value);
      let c4 = Number(document.querySelector('.home-ul').children[3].firstElementChild.lastElementChild.value);

      if (p1 != '' && p2 != '' && c1 != '' && c2 != '' && p3 != '' && c3 != '' && p4 != '' && c4 != '') {
        total = (p1 * c1 + p2 * c2 + p3 * c3 + p4 * c4) / Number(c1 + c2 + c3 + c4);
        total = total.toFixed(3);
        inpTotal.value = `UOMG: ${total}`;
      }
      else {
        alert('Please fill everything!')
      }
    }
    else if (count == 5) {
      let p1 = Number(document.querySelector('.home-ul').children[0].firstElementChild.firstElementChild.value);
      let c1 = Number(document.querySelector('.home-ul').children[0].firstElementChild.lastElementChild.value);

      let p2 = Number(document.querySelector('.home-ul').children[1].firstElementChild.firstElementChild.value);
      let c2 = Number(document.querySelector('.home-ul').children[1].firstElementChild.lastElementChild.value);

      let p3 = Number(document.querySelector('.home-ul').children[2].firstElementChild.firstElementChild.value);
      let c3 = Number(document.querySelector('.home-ul').children[2].firstElementChild.lastElementChild.value);

      let p4 = Number(document.querySelector('.home-ul').children[3].firstElementChild.firstElementChild.value);
      let c4 = Number(document.querySelector('.home-ul').children[3].firstElementChild.lastElementChild.value);

      let p5 = Number(document.querySelector('.home-ul').children[4].firstElementChild.firstElementChild.value);
      let c5 = Number(document.querySelector('.home-ul').children[4].firstElementChild.lastElementChild.value);

      if (p1 != '' && p2 != '' && c1 != '' && c2 != '' && p3 != '' && c3 != '' && p4 != '' && c4 != '' && p5 != '' && c5 != '') {
        total = (p1 * c1 + p2 * c2 + p3 * c3 + p4 * c4 + p5 * c5) / Number(c1 + c2 + c3 + c4 + c5);
        total = total.toFixed(3);
        inpTotal.value = `UOMG: ${total}`;
      }
      else {
        alert('Please fill everything!')
      }
    }
    else if (count == 6) {
      let p1 = Number(document.querySelector('.home-ul').children[0].firstElementChild.firstElementChild.value);
      let c1 = Number(document.querySelector('.home-ul').children[0].firstElementChild.lastElementChild.value);

      let p2 = Number(document.querySelector('.home-ul').children[1].firstElementChild.firstElementChild.value);
      let c2 = Number(document.querySelector('.home-ul').children[1].firstElementChild.lastElementChild.value);

      let p3 = Number(document.querySelector('.home-ul').children[2].firstElementChild.firstElementChild.value);
      let c3 = Number(document.querySelector('.home-ul').children[2].firstElementChild.lastElementChild.value);

      let p4 = Number(document.querySelector('.home-ul').children[3].firstElementChild.firstElementChild.value);
      let c4 = Number(document.querySelector('.home-ul').children[3].firstElementChild.lastElementChild.value);

      let p5 = Number(document.querySelector('.home-ul').children[4].firstElementChild.firstElementChild.value);
      let c5 = Number(document.querySelector('.home-ul').children[4].firstElementChild.lastElementChild.value);

      let p6 = Number(document.querySelector('.home-ul').children[5].firstElementChild.firstElementChild.value);
      let c6 = Number(document.querySelector('.home-ul').children[5].firstElementChild.lastElementChild.value);

      if (p1 != '' && p2 != '' && c1 != '' && c2 != '' && p3 != '' && c3 != '' && p4 != '' && c4 != '' && p5 != '' && c5 != '' && p6 != '' && c6 != '') {
        total = (p1 * c1 + p2 * c2 + p3 * c3 + p4 * c4 + p5 * c5 + p6 * c6) / Number(c1 + c2 + c3 + c4 + c5 + c6);
        total = total.toFixed(3);
        inpTotal.value = `UOMG: ${total}`;
      }
      else {
        alert('Please fill everything!')
      }
    }
    else if (count == 7) {
      let p1 = Number(document.querySelector('.home-ul').children[0].firstElementChild.firstElementChild.value);
      let c1 = Number(document.querySelector('.home-ul').children[0].firstElementChild.lastElementChild.value);

      let p2 = Number(document.querySelector('.home-ul').children[1].firstElementChild.firstElementChild.value);
      let c2 = Number(document.querySelector('.home-ul').children[1].firstElementChild.lastElementChild.value);

      let p3 = Number(document.querySelector('.home-ul').children[2].firstElementChild.firstElementChild.value);
      let c3 = Number(document.querySelector('.home-ul').children[2].firstElementChild.lastElementChild.value);

      let p4 = Number(document.querySelector('.home-ul').children[3].firstElementChild.firstElementChild.value);
      let c4 = Number(document.querySelector('.home-ul').children[3].firstElementChild.lastElementChild.value);

      let p5 = Number(document.querySelector('.home-ul').children[4].firstElementChild.firstElementChild.value);
      let c5 = Number(document.querySelector('.home-ul').children[4].firstElementChild.lastElementChild.value);

      let p6 = Number(document.querySelector('.home-ul').children[5].firstElementChild.firstElementChild.value);
      let c6 = Number(document.querySelector('.home-ul').children[5].firstElementChild.lastElementChild.value);

      let p7 = Number(document.querySelector('.home-ul').children[6].firstElementChild.firstElementChild.value);
      let c7 = Number(document.querySelector('.home-ul').children[6].firstElementChild.lastElementChild.value);

      if (p1 != '' && p2 != '' && c1 != '' && c2 != '' && p3 != '' && c3 != '' && p4 != '' && c4 != '' && p5 != '' && c5 != '' && p6 != '' && c6 != '' && p7 != '' && c7 != '') {
        total = (p1 * c1 + p2 * c2 + p3 * c3 + p4 * c4 + p5 * c5 + p6 * c6 + p7 * c7) / Number(c1 + c2 + c3 + c4 + c5 + c6 + c7);
        total = total.toFixed(3);
        inpTotal.value = `UOMG: ${total}`;
      }
      else {
        alert('Please fill everything!')
      }
    }
    else if (count == 8) {
      let p1 = Number(document.querySelector('.home-ul').children[0].firstElementChild.firstElementChild.value);
      let c1 = Number(document.querySelector('.home-ul').children[0].firstElementChild.lastElementChild.value);

      let p2 = Number(document.querySelector('.home-ul').children[1].firstElementChild.firstElementChild.value);
      let c2 = Number(document.querySelector('.home-ul').children[1].firstElementChild.lastElementChild.value);

      let p3 = Number(document.querySelector('.home-ul').children[2].firstElementChild.firstElementChild.value);
      let c3 = Number(document.querySelector('.home-ul').children[2].firstElementChild.lastElementChild.value);

      let p4 = Number(document.querySelector('.home-ul').children[3].firstElementChild.firstElementChild.value);
      let c4 = Number(document.querySelector('.home-ul').children[3].firstElementChild.lastElementChild.value);

      let p5 = Number(document.querySelector('.home-ul').children[4].firstElementChild.firstElementChild.value);
      let c5 = Number(document.querySelector('.home-ul').children[4].firstElementChild.lastElementChild.value);

      let p6 = Number(document.querySelector('.home-ul').children[5].firstElementChild.firstElementChild.value);
      let c6 = Number(document.querySelector('.home-ul').children[5].firstElementChild.lastElementChild.value);

      let p7 = Number(document.querySelector('.home-ul').children[6].firstElementChild.firstElementChild.value);
      let c7 = Number(document.querySelector('.home-ul').children[6].firstElementChild.lastElementChild.value);

      let p8 = Number(document.querySelector('.home-ul').children[7].firstElementChild.firstElementChild.value);
      let c8 = Number(document.querySelector('.home-ul').children[7].firstElementChild.lastElementChild.value);

      if (p1 != '' && p2 != '' && c1 != '' && c2 != '' && p3 != '' && c3 != '' && p4 != '' && c4 != '' && p5 != '' && c5 != '' && p6 != '' && c6 != '' && p7 != '' && c7 != '' && p8 != '' && c8 != '') {
        total = (p1 * c1 + p2 * c2 + p3 * c3 + p4 * c4 + p5 * c5 + p6 * c6 + p7 * c7 + p8 * c8) / Number(c1 + c2 + c3 + c4 + c5 + c6 + c7 + c8);
        total = total.toFixed(3);
        inpTotal.value = `UOMG: ${total}`;
      }
      else {
        alert('Please fill everything!')
      }
    }
    else if (count == 9) {
      let p1 = Number(document.querySelector('.home-ul').children[0].firstElementChild.firstElementChild.value);
      let c1 = Number(document.querySelector('.home-ul').children[0].firstElementChild.lastElementChild.value);

      let p2 = Number(document.querySelector('.home-ul').children[1].firstElementChild.firstElementChild.value);
      let c2 = Number(document.querySelector('.home-ul').children[1].firstElementChild.lastElementChild.value);

      let p3 = Number(document.querySelector('.home-ul').children[2].firstElementChild.firstElementChild.value);
      let c3 = Number(document.querySelector('.home-ul').children[2].firstElementChild.lastElementChild.value);

      let p4 = Number(document.querySelector('.home-ul').children[3].firstElementChild.firstElementChild.value);
      let c4 = Number(document.querySelector('.home-ul').children[3].firstElementChild.lastElementChild.value);

      let p5 = Number(document.querySelector('.home-ul').children[4].firstElementChild.firstElementChild.value);
      let c5 = Number(document.querySelector('.home-ul').children[4].firstElementChild.lastElementChild.value);

      let p6 = Number(document.querySelector('.home-ul').children[5].firstElementChild.firstElementChild.value);
      let c6 = Number(document.querySelector('.home-ul').children[5].firstElementChild.lastElementChild.value);

      let p7 = Number(document.querySelector('.home-ul').children[6].firstElementChild.firstElementChild.value);
      let c7 = Number(document.querySelector('.home-ul').children[6].firstElementChild.lastElementChild.value);

      let p8 = Number(document.querySelector('.home-ul').children[7].firstElementChild.firstElementChild.value);
      let c8 = Number(document.querySelector('.home-ul').children[7].firstElementChild.lastElementChild.value);

      let p9 = Number(document.querySelector('.home-ul').children[8].firstElementChild.firstElementChild.value);
      let c9 = Number(document.querySelector('.home-ul').children[8].firstElementChild.lastElementChild.value);

      if (p1 != '' && p2 != '' && c1 != '' && c2 != '' && p3 != '' && c3 != '' && p4 != '' && c4 != '' && p5 != '' && c5 != '' && p6 != '' && c6 != '' && p7 != '' && c7 != '' && p8 != '' && c8 != '' && p9 != '' && c9 != '') {
        total = (p1 * c1 + p2 * c2 + p3 * c3 + p4 * c4 + p5 * c5 + p6 * c6 + p7 * c7 + p8 * c8 + p9 * c9) / Number(c1 + c2 + c3 + c4 + c5 + c6 + c7 + c8 + c9);
        total = total.toFixed(3);
        inpTotal.value = `UOMG: ${total}`;
      }
      else {
        alert('Please fill everything!')
      }
    }
  }
  const Clear = () => {
      let p = document.querySelectorAll('.point');
      let c = document.querySelectorAll('.credit')
      p.forEach(item => {
        item.value = null;
      })
      c.forEach(item => {
        item.value = null;
      })
  }

  return (
    <div className='home'>
      <h4>GPA Calculator</h4>

      <div className="calc-cont">
        <div className='select-cont'>
          <div className="home-text sel">Select count:</div>
          <select name="count" id="combobox" onChange={ChangeCount}>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            <option>6</option>
            <option>7</option>
            <option>8</option>
            <option>9</option>
          </select>
        </div>

        <div className='list-cont'>
          <input id='total' disabled placeholder='UOMG: ' />
          <div className="header">
            <span>Point</span>
            <span>Credit</span>
          </div>
          <ul className='home-ul'>
            {
              arr1?.map((item, index) => {
                return (
                  <li key={index} id={index}>{item}</li>
                )
              })
            }
          </ul>
        </div>
        <div style={{ display: 'flex', padding: '12px' }} className='buttons'>
          <button onClick={Calc} >Calculate</button>
          <button onClick={Clear}>Clear</button>
        </div>
      </div>
    </div>
  );
}

export default Home;
