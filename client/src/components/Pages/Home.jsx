import React from 'react'
import { GrUserManager } from "react-icons/gr";
import { MdOutlineRestaurantMenu } from "react-icons/md";
import { BsFillCupHotFill } from "react-icons/bs";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const offerData = [
  {
    image: "https://th.bing.com/th/id/OIP.W-ctyMIw5v4-y8P5MOgbNAAAAA?pid=ImgDet&w=120&h=120&c=7&dpr=1.3&rs=1",
    heading: "ESPRESSO",
    stars: 4,
    price: "$5.00"
  },
  {
    image: "https://besthomecoffeemachines.com/wp-content/uploads/2022/03/What-is-Cappuccino-Made-of.jpg",
    heading: "MARASCHINO",
    stars: 4.5,
    price: "$6.00"
  },
  {
    image: "https://images.pexels.com/photos/2228889/pexels-photo-2228889.jpeg?auto=compress&cs=tinysrgb&h=627&fit=crop&w=1200",
    heading: "ANTOCCIND",
    stars: 4,
    price: "$5.00"
  }
];

// ⭐ Helper to generate star icons:
const renderStars = (rating) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <>
      {[...Array(fullStars)].map((_, i) => <FaStar key={`full-${i}`} color="orange" />)}
      {halfStar && <FaStarHalfAlt color="orange" />}
      {[...Array(emptyStars)].map((_, i) => <FaRegStar key={`empty-${i}`} color="orange" />)}
    </>
  );
};

export default function Home() {
  const ChooseUsData = [
    {
      icon: <GrUserManager />,
      heading: "Experienced Barista",
      paragraph: "Rolorem, beatae dolorum, praesebtium itaque etquam quaerat."
    },
    {
      icon: <MdOutlineRestaurantMenu />,
      heading: "Menu for every taste",
      paragraph: "Rolorem, beatae dolorum, praesebtium itaque etquam quaerat."
    },
    {
      icon: <BsFillCupHotFill />,
      heading: "Always Quality Beans",
      paragraph: "Rolorem, beatae dolorum, praesebtium itaque etquam quaerat."
    }
  ];




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

      {/* Choose us */}
      <div className="choose-us home-sub-section ">
        {/* heading */}
        <div className="heading">
          <div className="horizontal-line"></div>
          <h3>Features</h3>
        </div>

        {/* ---- */}
        <div>
          <h2>Why people Choose us?</h2>
          <p>
            Porro eveniet, auten ipsum vitae consequent
          </p>
        </div>

        {/* details */}
        <div className="subsection-details-container">

          <div className="subsection-details-box">
            {ChooseUsData.map((item, index) => (
              <div key={index}>
                <h1>{item.icon}</h1>
                <h3>{item.heading}</h3>
                <p>{item.paragraph}</p>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* We Offer You */}
      <div className="offer-you home-sub-section ">
        {/* heading */}
        <div className="heading">
          <div className="horizontal-line"></div>
          <h3>What we Offer You</h3>
        </div>

        <h2>Our Best Offers this Week</h2>

        <div className='subsection-details-box'>
          {offerData.map((item, index) => (
            <div className='card' key={index}>
              <div className="image">
                <img src={item.image} alt="" />
              </div>
              <div className="details">
                <h5>{item.heading}</h5>
                <div className='retings'>{renderStars(item.stars)}</div>
                <p>{item.price}</p>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/*  */}
    </div >
  )
}