import React from 'react'
import { GrUserManager } from "react-icons/gr";
import { MdOutlineRestaurantMenu } from "react-icons/md";
import { BsFillCupHotFill } from "react-icons/bs";

export default function Home() {
  return (
    <div className='Home'>
      {/* Hero */}
      <div className="hero">
        <div className="hero-container">
          <h4>
            WELCOME TO AWAKE
          </h4>
          <h2>BREWING DREAMS WIDE COFFEE</h2>
          <div className='btn-group'>
            <div className="btn btn-border">BOOK A TABLE</div>
            <div className="btn">OPEN MENU</div>
          </div>
        </div>
      </div>

      {/* About */}
      <div className="about home-sub-section">
        <div className="about-box sub-section-box">
          <div className='about-details-container subsection-details-container'>
            {/* heading */}
            <div className="heading">
              <div className="horizontal-line"></div>
              <h3>About US</h3>
            </div>

            {/* details */}
            <div className="about-details-box subsection-details-box">
              <h2>We Invite You To Visit Our Coffe House</h2>
              <p>
                Barista opened its doors in Scottsdale in july 218. Quickly embraced by Phoenix locals and international visitors, our cafe, restaurant & event space has flourished with multiple locations across the region. Barista brings to life childhood favorites, both savory and sweet, from the south of France and North America.
              </p>
              <div className="btn orange-btn">Read More</div>
            </div>

          </div>
          <div className="image-box">
            <img src="https://acquiredcoffee.com/wp-content/uploads/2022/02/pump-espresso-machine-300.jpg" alt="" />
          </div>
        </div>
      </div>

      {/* Coffee Menu */}
      <div className="coffee-menu home-sub-section">
        <div className='sub-section-box'>
          <div className="image-box">
            <img src="https://acquiredcoffee.com/wp-content/uploads/2022/02/pump-espresso-machine-300.jpg" alt="" />
          </div>
          <div className='subsection-details-container'>
            {/* heading */}
            <div className="heading">
              <div className="horizontal-line"></div>
              <h3>Coffee Menu</h3>
            </div>
            {/* details */}
            <div className="subsection-details-box">
              <h2>Best Quality Beans</h2>
              <p>
                Barista opened its doors in Scottsdale in july 218. Quickly embraced by Phoenix locals and international visitors, our cafe, restaurant & event space has flourished with multiple locations across the region. Barista brings to life childhood favorites, both savory and sweet, from the south of France and North America.
              </p>
              <div className="btn orange-btn">Read More</div>
            </div>
          </div>
        </div>
      </div>

      <div className="home-sub-section choose-us">
        {/* heading */}
        <div className="heading">
          <div className="horizontal-line"></div>
          <h3>Features</h3>
        </div>
        {/* details */}
        <div className="subsection-details-box">
          <h2>Why people Choose us?</h2>
          <p>
            Porro eveniet, auten ipsum vitae consequent
          </p>
          <div className='subsection-details-box'>
            <div>
              {/* logo */}
              <GrUserManager />
              {/* heading */}
              <h3>Experienced Barista</h3>
              {/* peregraph */}
              <p>Rolorem, beatae dolorum, praesebtium itaque etquam quaerat.</p>
            </div>

            <div>
              <MdOutlineRestaurantMenu />
              <h3>Menu for every taste</h3>
              <p>Rolorem, beatae dolorum, praesebtium itaque etquam quaerat.</p>
            </div>

            <div>
              <BsFillCupHotFill />
              <h3>Always Quality Beans</h3>
              <p>Rolorem, beatae dolorum, praesebtium itaque etquam quaerat.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
