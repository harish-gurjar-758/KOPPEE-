import React from 'react'

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
      <div className="about">
        <div className="about-box">
          <div className='about-details-container'>
            {/* heading */}
            <div className="heading">
              <div className="horigontel-line"></div>
              <h3>About US</h3>
            </div>

            {/* details */}
            <div className="about-details-box">
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

    </div>
  )
}
