import React from 'react';
import { FiGlobe } from 'react-icons/fi';
import { AiFillGithub, AiFillLinkedin, AiOutlineMail} from 'react-icons/ai'

import './styles.css';

export default function Footer(){
  const date = new Date();
  const year = date.getFullYear();

  return (
    <footer>
      <div className="footer-content">

        <div className="footer-group links">
          <a className="button" href="https://github.com/tamires-manhaes" target="_blank">
            <button type="button">
                <AiFillGithub size={18} color="#e02041"/>
            </button>
          </a>

          <a className="button" href="https://tamires-manhaes.github.io" target="_blank">
            <button type="button">
                <FiGlobe size={18} color="#e02041"/>
            </button>
          </a>

          <a className="button" href="mailto:tamiresmanhaes4@gmail.com" target="_blank">
            <button type="button">
                <AiOutlineMail size={18} color="#e02041"/>
            </button>
          </a>

          <a className="button" href="https://www.linkedin.com/in/tamires-manhaes/" target="_blank">
            <button type="button">
                <AiFillLinkedin size={18} color="#e02041"/>
            </button>
          </a>
          
        </div>

        <div className="footer-group infos">
          <span>Copyrights © {year}</span> 
          <span>All Rights Reserved by <strong>Tamires Manhães</strong></span>
        </div>
      </div>
    </footer>
  )
}