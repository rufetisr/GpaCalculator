import React from 'react';
import './Home.css'
import Section from '../Section/Section';
import context from '../../context/Context';
import { useContext } from 'react';
import { useState, useRef, useEffect } from 'react';
import { LuDownload } from "react-icons/lu";
import { toast, ToastContainer } from 'react-toastify'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Link, useNavigate } from 'react-router-dom';
import isTokenExpired from '../../utils/isTokenExpired'
import logo from '../../assets/logo1.png'
import packageJson from '../../../package.json'
import LangSelectBox from '../LangSelectBox/LangSelectBox';
import { useTranslation } from 'react-i18next';
import calc from '../../utils/calc';


let arr1 = [<Section />, <Section />, <Section />]

const Home = () => {
  const { count, setCount, showModal, setShowModal, modalText, setModalText } = useContext(context);
  // const [showModal, setShowModal] = useState(false);
  // const [modalText, setModalText] = useState('You need to login first!');

  const navigate = useNavigate();
  const server_url = import.meta.env.VITE_SERVER_URL;
  // const inp = useRef();
  // const { totalAct, setTotalAct } = useState('ac');
  let token = localStorage.getItem('token');
  const handleClose = () => setShowModal(false);
  const { t } = useTranslation();


  useEffect(() => {

    const isExpired = isTokenExpired(token);

    if (token) {
      setShowModal(false)
    }
    if (isExpired) {
      setModalText(t("session_expired"));
      setShowModal(true);
    }
  }, []);




  const ChangeCount = (e) => {
    arr1 = [];
    for (let i = 0; i < e.target.value; i++) {
      arr1.push(<Section />);
    }
    setCount(e.target.value);
  }

  const Save = async () => {

    let token = localStorage.getItem('token')
    if (!token) {
      setModalText(t("login_required"));
      setShowModal(true);
      // toast.warn('You need to login first!')
    }
    else {
      setShowModal(false)

      let pointsAndCredits = {
        points: [],
        credits: [],
        subjects: [],
      }

      for (let i = 0; i < count; i++) {
        pointsAndCredits.points.push(Number(document.querySelector('.home-ul').children[i].firstElementChild.firstElementChild.value));
        pointsAndCredits.credits.push(Number(document.querySelector('.home-ul').children[i].firstElementChild.children[1].value));
        pointsAndCredits.subjects.push(document.querySelector('.home-ul').children[i].firstElementChild.lastElementChild.value);
      }


      // Check if all elements in both arrays are zero
      const allPointsZero = pointsAndCredits.points.every(point => point === 0);
      const allCreditsZero = pointsAndCredits.credits.every(credit => credit === 0);
      const allSubjectsZero = pointsAndCredits.subjects.every(subjt => subjt == false);


      if (allPointsZero || allCreditsZero || allSubjectsZero) {
        toast.warn('Please fill all the fields!')
      }

      else {
        try {
          const res = await fetch(`${server_url}/save-data`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(pointsAndCredits),
          })

          const data = await res.json();
          if (res.ok) {
            toast.success(data.message)
          }
        } catch (error) {
          toast.error(error.message)
        }

      }
    }
  }

  const Calc = () => {
    let inpTotal = document.querySelector('#total');

    let total = 0;

    if (count == 1) {
      let p1 = Number(document.querySelector('.home-ul').children[0].firstElementChild.firstElementChild.value);
      let c1 = Number(document.querySelector('.home-ul').children[0].firstElementChild.children[1].value);

      if (p1 != '' && c1 != '') {
        total = (p1 * c1) / (c1);
        total = total.toFixed(3);
        inpTotal.value = `GPA: ${total}`;
      }
      else {
        // alert('Please fill everything!')
        toast.warn('Please fill all the fields!')
      }
    }
    else if (count == 2) {
      let p1 = Number(document.querySelector('.home-ul').children[0].firstElementChild.firstElementChild.value);
      let c1 = Number(document.querySelector('.home-ul').children[0].firstElementChild.children[1].value);


      let p2 = Number(document.querySelector('.home-ul').children[1].firstElementChild.firstElementChild.value);
      let c2 = Number(document.querySelector('.home-ul').children[1].firstElementChild.children[1].value);




      if (p1 != '' && p2 != '' && c1 != '' && c2 != '') {
        total = (p1 * c1 + p2 * c2) / (c1 + c2);
        total = total.toFixed(3);
        inpTotal.value = `GPA: ${total}`;
      }
      else {
        // alert('Please fill everything!')
        toast.warn('Please fill all the fields!')
      }
    }
    else if (count == 3) {
      let p1 = Number(document.querySelector('.home-ul').children[0].firstElementChild.firstElementChild.value);
      let c1 = Number(document.querySelector('.home-ul').children[0].firstElementChild.children[1].value);


      let p2 = Number(document.querySelector('.home-ul').children[1].firstElementChild.firstElementChild.value);
      let c2 = Number(document.querySelector('.home-ul').children[1].firstElementChild.children[1].value);

      let p3 = Number(document.querySelector('.home-ul').children[2].firstElementChild.firstElementChild.value);
      let c3 = Number(document.querySelector('.home-ul').children[2].firstElementChild.children[1].value);

      if (p1 != '' && p2 != '' && c1 != '' && c2 != '' && p3 != '' && c3 != '') {
        total = (p1 * c1 + p2 * c2 + p3 * c3) / (c1 + c2 + c3);
        total = total.toFixed(3);
        inpTotal.value = `GPA: ${total}`;
      }
      else {
        // alert('Please fill everything!')
        toast.warn('Please fill all the fields!')
      }
    }
    else if (count == 4) {
      let p1 = Number(document.querySelector('.home-ul').children[0].firstElementChild.firstElementChild.value);
      let c1 = Number(document.querySelector('.home-ul').children[0].firstElementChild.children[1].value);

      let p2 = Number(document.querySelector('.home-ul').children[1].firstElementChild.firstElementChild.value);
      let c2 = Number(document.querySelector('.home-ul').children[1].firstElementChild.children[1].value);

      let p3 = Number(document.querySelector('.home-ul').children[2].firstElementChild.firstElementChild.value);
      let c3 = Number(document.querySelector('.home-ul').children[2].firstElementChild.children[1].value);

      let p4 = Number(document.querySelector('.home-ul').children[3].firstElementChild.firstElementChild.value);
      let c4 = Number(document.querySelector('.home-ul').children[3].firstElementChild.children[1].value);

      if (p1 != '' && p2 != '' && c1 != '' && c2 != '' && p3 != '' && c3 != '' && p4 != '' && c4 != '') {
        total = (p1 * c1 + p2 * c2 + p3 * c3 + p4 * c4) / Number(c1 + c2 + c3 + c4);
        total = total.toFixed(3);
        inpTotal.value = `GPA: ${total}`;
      }
      else {
        alert('Please fill everything!')
      }
    }
    else if (count == 5) {
      let p1 = Number(document.querySelector('.home-ul').children[0].firstElementChild.firstElementChild.value);
      let c1 = Number(document.querySelector('.home-ul').children[0].firstElementChild.children[1].value);

      let p2 = Number(document.querySelector('.home-ul').children[1].firstElementChild.firstElementChild.value);
      let c2 = Number(document.querySelector('.home-ul').children[1].firstElementChild.children[1].value);

      let p3 = Number(document.querySelector('.home-ul').children[2].firstElementChild.firstElementChild.value);
      let c3 = Number(document.querySelector('.home-ul').children[2].firstElementChild.children[1].value);

      let p4 = Number(document.querySelector('.home-ul').children[3].firstElementChild.firstElementChild.value);
      let c4 = Number(document.querySelector('.home-ul').children[3].firstElementChild.children[1].value);

      let p5 = Number(document.querySelector('.home-ul').children[4].firstElementChild.firstElementChild.value);
      let c5 = Number(document.querySelector('.home-ul').children[4].firstElementChild.children[1].value);

      if (p1 != '' && p2 != '' && c1 != '' && c2 != '' && p3 != '' && c3 != '' && p4 != '' && c4 != '' && p5 != '' && c5 != '') {
        total = (p1 * c1 + p2 * c2 + p3 * c3 + p4 * c4 + p5 * c5) / Number(c1 + c2 + c3 + c4 + c5);
        total = total.toFixed(3);
        inpTotal.value = `GPA: ${total}`;
      }
      else {
        alert('Please fill everything!')
      }
    }
    else if (count == 6) {
      let p1 = Number(document.querySelector('.home-ul').children[0].firstElementChild.firstElementChild.value);
      let c1 = Number(document.querySelector('.home-ul').children[0].firstElementChild.children[1].value);

      let p2 = Number(document.querySelector('.home-ul').children[1].firstElementChild.firstElementChild.value);
      let c2 = Number(document.querySelector('.home-ul').children[1].firstElementChild.children[1].value);

      let p3 = Number(document.querySelector('.home-ul').children[2].firstElementChild.firstElementChild.value);
      let c3 = Number(document.querySelector('.home-ul').children[2].firstElementChild.children[1].value);

      let p4 = Number(document.querySelector('.home-ul').children[3].firstElementChild.firstElementChild.value);
      let c4 = Number(document.querySelector('.home-ul').children[3].firstElementChild.children[1].value);

      let p5 = Number(document.querySelector('.home-ul').children[4].firstElementChild.firstElementChild.value);
      let c5 = Number(document.querySelector('.home-ul').children[4].firstElementChild.children[1].value);

      let p6 = Number(document.querySelector('.home-ul').children[5].firstElementChild.firstElementChild.value);
      let c6 = Number(document.querySelector('.home-ul').children[5].firstElementChild.children[1].value);

      if (p1 != '' && p2 != '' && c1 != '' && c2 != '' && p3 != '' && c3 != '' && p4 != '' && c4 != '' && p5 != '' && c5 != '' && p6 != '' && c6 != '') {
        total = (p1 * c1 + p2 * c2 + p3 * c3 + p4 * c4 + p5 * c5 + p6 * c6) / Number(c1 + c2 + c3 + c4 + c5 + c6);
        total = total.toFixed(3);
        inpTotal.value = `GPA: ${total}`;
      }
      else {
        alert('Please fill everything!')
      }
    }
    else if (count == 7) {
      let p1 = Number(document.querySelector('.home-ul').children[0].firstElementChild.firstElementChild.value);
      let c1 = Number(document.querySelector('.home-ul').children[0].firstElementChild.children[1].value);

      let p2 = Number(document.querySelector('.home-ul').children[1].firstElementChild.firstElementChild.value);
      let c2 = Number(document.querySelector('.home-ul').children[1].firstElementChild.children[1].value);

      let p3 = Number(document.querySelector('.home-ul').children[2].firstElementChild.firstElementChild.value);
      let c3 = Number(document.querySelector('.home-ul').children[2].firstElementChild.children[1].value);

      let p4 = Number(document.querySelector('.home-ul').children[3].firstElementChild.firstElementChild.value);
      let c4 = Number(document.querySelector('.home-ul').children[3].firstElementChild.children[1].value);

      let p5 = Number(document.querySelector('.home-ul').children[4].firstElementChild.firstElementChild.value);
      let c5 = Number(document.querySelector('.home-ul').children[4].firstElementChild.children[1].value);

      let p6 = Number(document.querySelector('.home-ul').children[5].firstElementChild.firstElementChild.value);
      let c6 = Number(document.querySelector('.home-ul').children[5].firstElementChild.children[1].value);

      let p7 = Number(document.querySelector('.home-ul').children[6].firstElementChild.firstElementChild.value);
      let c7 = Number(document.querySelector('.home-ul').children[6].firstElementChild.children[1].value);

      if (p1 != '' && p2 != '' && c1 != '' && c2 != '' && p3 != '' && c3 != '' && p4 != '' && c4 != '' && p5 != '' && c5 != '' && p6 != '' && c6 != '' && p7 != '' && c7 != '') {
        total = (p1 * c1 + p2 * c2 + p3 * c3 + p4 * c4 + p5 * c5 + p6 * c6 + p7 * c7) / Number(c1 + c2 + c3 + c4 + c5 + c6 + c7);
        total = total.toFixed(3);
        inpTotal.value = `GPA: ${total}`;
      }
      else {
        alert('Please fill everything!')
      }
    }
    else if (count == 8) {
      let p1 = Number(document.querySelector('.home-ul').children[0].firstElementChild.firstElementChild.value);
      let c1 = Number(document.querySelector('.home-ul').children[0].firstElementChild.children[1].value);

      let p2 = Number(document.querySelector('.home-ul').children[1].firstElementChild.firstElementChild.value);
      let c2 = Number(document.querySelector('.home-ul').children[1].firstElementChild.children[1].value);

      let p3 = Number(document.querySelector('.home-ul').children[2].firstElementChild.firstElementChild.value);
      let c3 = Number(document.querySelector('.home-ul').children[2].firstElementChild.children[1].value);

      let p4 = Number(document.querySelector('.home-ul').children[3].firstElementChild.firstElementChild.value);
      let c4 = Number(document.querySelector('.home-ul').children[3].firstElementChild.children[1].value);

      let p5 = Number(document.querySelector('.home-ul').children[4].firstElementChild.firstElementChild.value);
      let c5 = Number(document.querySelector('.home-ul').children[4].firstElementChild.children[1].value);

      let p6 = Number(document.querySelector('.home-ul').children[5].firstElementChild.firstElementChild.value);
      let c6 = Number(document.querySelector('.home-ul').children[5].firstElementChild.children[1].value);

      let p7 = Number(document.querySelector('.home-ul').children[6].firstElementChild.firstElementChild.value);
      let c7 = Number(document.querySelector('.home-ul').children[6].firstElementChild.children[1].value);

      let p8 = Number(document.querySelector('.home-ul').children[7].firstElementChild.firstElementChild.value);
      let c8 = Number(document.querySelector('.home-ul').children[7].firstElementChild.children[1].value);

      if (p1 != '' && p2 != '' && c1 != '' && c2 != '' && p3 != '' && c3 != '' && p4 != '' && c4 != '' && p5 != '' && c5 != '' && p6 != '' && c6 != '' && p7 != '' && c7 != '' && p8 != '' && c8 != '') {
        total = (p1 * c1 + p2 * c2 + p3 * c3 + p4 * c4 + p5 * c5 + p6 * c6 + p7 * c7 + p8 * c8) / Number(c1 + c2 + c3 + c4 + c5 + c6 + c7 + c8);
        total = total.toFixed(3);
        inpTotal.value = `GPA: ${total}`;
      }
      else {
        alert('Please fill everything!')
      }
    }
    else if (count == 9) {
      let p1 = Number(document.querySelector('.home-ul').children[0].firstElementChild.firstElementChild.value);
      let c1 = Number(document.querySelector('.home-ul').children[0].firstElementChild.children[1].value);

      let p2 = Number(document.querySelector('.home-ul').children[1].firstElementChild.firstElementChild.value);
      let c2 = Number(document.querySelector('.home-ul').children[1].firstElementChild.children[1].value);

      let p3 = Number(document.querySelector('.home-ul').children[2].firstElementChild.firstElementChild.value);
      let c3 = Number(document.querySelector('.home-ul').children[2].firstElementChild.children[1].value);

      let p4 = Number(document.querySelector('.home-ul').children[3].firstElementChild.firstElementChild.value);
      let c4 = Number(document.querySelector('.home-ul').children[3].firstElementChild.children[1].value);

      let p5 = Number(document.querySelector('.home-ul').children[4].firstElementChild.firstElementChild.value);
      let c5 = Number(document.querySelector('.home-ul').children[4].firstElementChild.children[1].value);

      let p6 = Number(document.querySelector('.home-ul').children[5].firstElementChild.firstElementChild.value);
      let c6 = Number(document.querySelector('.home-ul').children[5].firstElementChild.children[1].value);

      let p7 = Number(document.querySelector('.home-ul').children[6].firstElementChild.firstElementChild.value);
      let c7 = Number(document.querySelector('.home-ul').children[6].firstElementChild.children[1].value);

      let p8 = Number(document.querySelector('.home-ul').children[7].firstElementChild.firstElementChild.value);
      let c8 = Number(document.querySelector('.home-ul').children[7].firstElementChild.children[1].value);

      let p9 = Number(document.querySelector('.home-ul').children[8].firstElementChild.firstElementChild.value);
      let c9 = Number(document.querySelector('.home-ul').children[8].firstElementChild.children[1].value);

      if (p1 != '' && p2 != '' && c1 != '' && c2 != '' && p3 != '' && c3 != '' && p4 != '' && c4 != '' && p5 != '' && c5 != '' && p6 != '' && c6 != '' && p7 != '' && c7 != '' && p8 != '' && c8 != '' && p9 != '' && c9 != '') {
        total = (p1 * c1 + p2 * c2 + p3 * c3 + p4 * c4 + p5 * c5 + p6 * c6 + p7 * c7 + p8 * c8 + p9 * c9) / Number(c1 + c2 + c3 + c4 + c5 + c6 + c7 + c8 + c9);
        total = total.toFixed(3);
        inpTotal.value = `GPA: ${total}`;
      }
      else {
        alert('Please fill everything!')
      }
    }
    else if (count == 10) {
      let p1 = Number(document.querySelector('.home-ul').children[0].firstElementChild.firstElementChild.value);
      let c1 = Number(document.querySelector('.home-ul').children[0].firstElementChild.children[1].value);

      let p2 = Number(document.querySelector('.home-ul').children[1].firstElementChild.firstElementChild.value);
      let c2 = Number(document.querySelector('.home-ul').children[1].firstElementChild.children[1].value);

      let p3 = Number(document.querySelector('.home-ul').children[2].firstElementChild.firstElementChild.value);
      let c3 = Number(document.querySelector('.home-ul').children[2].firstElementChild.children[1].value);

      let p4 = Number(document.querySelector('.home-ul').children[3].firstElementChild.firstElementChild.value);
      let c4 = Number(document.querySelector('.home-ul').children[3].firstElementChild.children[1].value);

      let p5 = Number(document.querySelector('.home-ul').children[4].firstElementChild.firstElementChild.value);
      let c5 = Number(document.querySelector('.home-ul').children[4].firstElementChild.children[1].value);

      let p6 = Number(document.querySelector('.home-ul').children[5].firstElementChild.firstElementChild.value);
      let c6 = Number(document.querySelector('.home-ul').children[5].firstElementChild.children[1].value);

      let p7 = Number(document.querySelector('.home-ul').children[6].firstElementChild.firstElementChild.value);
      let c7 = Number(document.querySelector('.home-ul').children[6].firstElementChild.children[1].value);

      let p8 = Number(document.querySelector('.home-ul').children[7].firstElementChild.firstElementChild.value);
      let c8 = Number(document.querySelector('.home-ul').children[7].firstElementChild.children[1].value);

      let p9 = Number(document.querySelector('.home-ul').children[8].firstElementChild.firstElementChild.value);
      let c9 = Number(document.querySelector('.home-ul').children[8].firstElementChild.children[1].value);

      let p10 = Number(document.querySelector('.home-ul').children[9].firstElementChild.firstElementChild.value);
      let c10 = Number(document.querySelector('.home-ul').children[9].firstElementChild.children[1].value);

      if (p1 != '' && p2 != '' && c1 != '' && c2 != '' && p3 != '' && c3 != '' && p4 != '' && c4 != '' && p5 != '' && c5 != '' && p6 != '' && c6 != '' && p7 != '' && c7 != '' && p8 != '' && c8 != '' && p9 != '' && c9 != '' && p10 != '' && c10 != '') {

        total = calc([p1, p2, p3, p4, p5, p6, p7, p8, p9, p10], [c1, c2, c3, c4, c5, c6, c7, c8, c9, c10])
        inpTotal.value = `GPA: ${total}`;
      }
      else {
        alert('Please fill everything!')
      }
    }
    else if (count == 11) {
      let p1 = Number(document.querySelector('.home-ul').children[0].firstElementChild.firstElementChild.value);
      let c1 = Number(document.querySelector('.home-ul').children[0].firstElementChild.children[1].value);

      let p2 = Number(document.querySelector('.home-ul').children[1].firstElementChild.firstElementChild.value);
      let c2 = Number(document.querySelector('.home-ul').children[1].firstElementChild.children[1].value);

      let p3 = Number(document.querySelector('.home-ul').children[2].firstElementChild.firstElementChild.value);
      let c3 = Number(document.querySelector('.home-ul').children[2].firstElementChild.children[1].value);

      let p4 = Number(document.querySelector('.home-ul').children[3].firstElementChild.firstElementChild.value);
      let c4 = Number(document.querySelector('.home-ul').children[3].firstElementChild.children[1].value);

      let p5 = Number(document.querySelector('.home-ul').children[4].firstElementChild.firstElementChild.value);
      let c5 = Number(document.querySelector('.home-ul').children[4].firstElementChild.children[1].value);

      let p6 = Number(document.querySelector('.home-ul').children[5].firstElementChild.firstElementChild.value);
      let c6 = Number(document.querySelector('.home-ul').children[5].firstElementChild.children[1].value);

      let p7 = Number(document.querySelector('.home-ul').children[6].firstElementChild.firstElementChild.value);
      let c7 = Number(document.querySelector('.home-ul').children[6].firstElementChild.children[1].value);

      let p8 = Number(document.querySelector('.home-ul').children[7].firstElementChild.firstElementChild.value);
      let c8 = Number(document.querySelector('.home-ul').children[7].firstElementChild.children[1].value);

      let p9 = Number(document.querySelector('.home-ul').children[8].firstElementChild.firstElementChild.value);
      let c9 = Number(document.querySelector('.home-ul').children[8].firstElementChild.children[1].value);

      let p10 = Number(document.querySelector('.home-ul').children[9].firstElementChild.firstElementChild.value);
      let c10 = Number(document.querySelector('.home-ul').children[9].firstElementChild.children[1].value);

      let p11 = Number(document.querySelector('.home-ul').children[10].firstElementChild.firstElementChild.value);
      let c11 = Number(document.querySelector('.home-ul').children[10].firstElementChild.children[1].value);

      if (p1 != '' && p2 != '' && c1 != '' && c2 != '' && p3 != '' && c3 != '' && p4 != '' && c4 != '' && p5 != '' && c5 != '' && p6 != '' && c6 != '' && p7 != '' && c7 != '' && p8 != '' && c8 != '' && p9 != '' && c9 != '' && p10 != '' && c10 != '' && p11 != '' && c11 != '') {

        total = calc([p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11], [c1, c2, c3, c4, c5, c6, c7, c8, c9, c10, c11])
        inpTotal.value = `GPA: ${total}`;
      }
      else {
        alert('Please fill everything!')
      }
    }
    else if (count == 12) {
      let p1 = Number(document.querySelector('.home-ul').children[0].firstElementChild.firstElementChild.value);
      let c1 = Number(document.querySelector('.home-ul').children[0].firstElementChild.children[1].value);

      let p2 = Number(document.querySelector('.home-ul').children[1].firstElementChild.firstElementChild.value);
      let c2 = Number(document.querySelector('.home-ul').children[1].firstElementChild.children[1].value);

      let p3 = Number(document.querySelector('.home-ul').children[2].firstElementChild.firstElementChild.value);
      let c3 = Number(document.querySelector('.home-ul').children[2].firstElementChild.children[1].value);

      let p4 = Number(document.querySelector('.home-ul').children[3].firstElementChild.firstElementChild.value);
      let c4 = Number(document.querySelector('.home-ul').children[3].firstElementChild.children[1].value);

      let p5 = Number(document.querySelector('.home-ul').children[4].firstElementChild.firstElementChild.value);
      let c5 = Number(document.querySelector('.home-ul').children[4].firstElementChild.children[1].value);

      let p6 = Number(document.querySelector('.home-ul').children[5].firstElementChild.firstElementChild.value);
      let c6 = Number(document.querySelector('.home-ul').children[5].firstElementChild.children[1].value);

      let p7 = Number(document.querySelector('.home-ul').children[6].firstElementChild.firstElementChild.value);
      let c7 = Number(document.querySelector('.home-ul').children[6].firstElementChild.children[1].value);

      let p8 = Number(document.querySelector('.home-ul').children[7].firstElementChild.firstElementChild.value);
      let c8 = Number(document.querySelector('.home-ul').children[7].firstElementChild.children[1].value);

      let p9 = Number(document.querySelector('.home-ul').children[8].firstElementChild.firstElementChild.value);
      let c9 = Number(document.querySelector('.home-ul').children[8].firstElementChild.children[1].value);

      let p10 = Number(document.querySelector('.home-ul').children[9].firstElementChild.firstElementChild.value);
      let c10 = Number(document.querySelector('.home-ul').children[9].firstElementChild.children[1].value);

      let p11 = Number(document.querySelector('.home-ul').children[10].firstElementChild.firstElementChild.value);
      let c11 = Number(document.querySelector('.home-ul').children[10].firstElementChild.children[1].value);

      let p12 = Number(document.querySelector('.home-ul').children[10].firstElementChild.firstElementChild.value);
      let c12 = Number(document.querySelector('.home-ul').children[10].firstElementChild.children[1].value);

      if (p1 != '' && p2 != '' && c1 != '' && c2 != '' && p3 != '' && c3 != '' && p4 != '' && c4 != '' && p5 != '' && c5 != '' && p6 != '' && c6 != '' && p7 != '' && c7 != '' && p8 != '' && c8 != '' && p9 != '' && c9 != '' && p10 != '' && c10 != '' && p11 != '' && c11 != '' && p12 != '' && c12 != '') {

        total = calc([p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11, p12], [c1, c2, c3, c4, c5, c6, c7, c8, c9, c10, c11, c12])
        inpTotal.value = `GPA: ${total}`;
      }
      else {
        alert('Please fill everything!')
      }
    }
  }
  const Clear = () => {
    let p = document.querySelectorAll('.point');
    let c = document.querySelectorAll('.credit')
    let s = document.querySelectorAll('.subject')
    p.forEach(item => {
      item.value = null;
    })
    c.forEach(item => {
      item.value = null;
    })
    s.forEach(item => {
      item.value = null;
    })
  }

  return (
    <div className="home">
      <h4>{t('gpa_calculator')}</h4>
      <div className="calc-cont">
        <div className="select-cont">
          <div className="home-text sel">{t('select_count')}</div>
          <select value={count} name="count" id="combobox" onChange={ChangeCount}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>

        <div className="list-cont">
          <input id="total" disabled placeholder="GPA: " />
          <div className="header">
            <span>{t('point')}</span>
            <span>{t('credit')}</span>
            <span>{t('subject')}</span>
          </div>
          <ol className="home-ul">
            {arr1?.map((item, index) => (
              <li key={index} id={index}>
                {item}
              </li>
            ))}
          </ol>
        </div>
        <div style={{ display: 'flex', padding: '12px', columnGap: '10px' }} className="buttons">
          <button onClick={Calc}>{t('calculate')}</button>
          <button onClick={Clear}>{t('clear')}</button>
          <button className="save" onClick={Save}>
            {t('save')}
            <LuDownload className='icon' />
          </button>
        </div>
      </div>

      <footer className="footer">
        <div className='footer-div'>
          <a href="https://portfolio-70u8.onrender.com/" target="_blank" rel="noreferrer">
            rufat
            <img src={logo} alt="logo" className="logo" />
            <span className="small-text">{t('web_developer')}</span>
          </a>
          <LangSelectBox />
        </div>
        <br />
        <div className="flex">
          <p className="small-text">
            {t('built_by')}{' '}
            <a className="owner" href="https://portfolio-70u8.onrender.com/" target="_blank" rel="noreferrer">
              rufat isgander
            </a>
          </p>
          <span className="smaller-text">

            <Link to='/privacy-policy'>
              {t('personal_website')}
            </Link>
            {' v' + packageJson.version}
          </span>
        </div>
      </footer>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{t('information')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalText}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            {t('close')}
          </Button>
          <Button variant="primary" onClick={() => navigate('/login')}>
            {t('continue')}
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer />
    </div>
  );

}

export default Home;
