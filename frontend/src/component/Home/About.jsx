import React from "react";
import ABOUTIMG from "../../images/aboutus.jpg";
import "./about.css"

const About = () => {
  return (
    <>
      <section className="about-section">
        <div className="container">
          <div className="row mb-5">
            <div className="content-column col-lg-6 col-md-12 col-sm-12 order-2">
              <div className="inner-column">
                <div className="sec-title">
                  <span className="title">About AvtarFashion</span>
                  <h2>We are Creative Tech Enthusiast working since 2015</h2>
                </div>
                <div className="text">
                  Every online shopping experience is precious. Hence, a
                  cashless reward-based customer loyalty program called Myntra
                  Insider was introduced to enhance your online experience. The
                  program is applicable to every registered customer and
                  measures rewards in the form of Insider Points.
                </div>
                <div className="text">
                  There are four levels to achieve in the program, as the
                  Insider Points accumulate. They are - Insider, Select, Elite
                  or Icon. Apart from offering discounts on Myntra and partner
                  platform coupons, each tier comes with its own special perks.
                </div>
                <div className="btn-box">
                  <a href="#" className="theme-btn btn-style-one">
                    Contact Us
                  </a>
                </div>
              </div>
            </div>

            <div className="image-column col-lg-6 col-md-12 col-sm-12">
              <div className="inner-column wow fadeInLeft">
                <div className="author-desc">
                  <h2> AVTARFASHION INSIDER</h2>
                  <span>ONLINE SHOPPING MADE EASY</span>
                </div>
                {/* imagehere */}
                <figure className="image-1">
                  <a href="#" className="lightbox-image" data-fancybox="images">
                    <img title="Rahul Kumar Yadav" src={ABOUTIMG} alt="" />
                  </a>
                </figure>
              </div>
            </div>
          </div>
          <div className="sec-title mt-5">
            <span className="title pt-5">Our Future Goal</span>
            <h2>We want to lead in innovation & Technology</h2>
          </div>
          <div className="text">
            Be it clothing, footwear or accessories, Myntra offers you the ideal
            combination of fashion and functionality for men, women and kids.
            You will realise that the sky is the limit when it comes to the
            types of outfits that you can purchase for different occasions.
          </div>
          <div className="text">
            Myntra is one of the best online shopping sites for classNamey
            accessories that perfectly complement your outfits. You can select
            smart analogue or digital watches and match them up with belts and
            ties. Pick up spacious bags, backpacks, and wallets to store your
            essentials in style. Whether you prefer minimal jewellery or grand
            and sparkling pieces, our online jewellery collection offers you
            many impressive options.
          </div>
          <div className="text">
            Online shopping for kids at Myntra is a complete joy. Your little
            princess is going to love the wide variety of pretty dresses,
            ballerina shoes, headbands and clips. Delight your son by picking up
            sports shoes, superhero T-shirts, football jerseys and much more
            from our online store. Check out our lineup of toys with which you
            can create memories to cherish.
          </div>
          <div className="text">
            Here you can also share the content you create, if our technical
            team likes it, then we will also share it on our blog.
          </div>
          <div className="text">
            In the end, I would say keep visiting our website and enjoy the
            quality content.
          </div>
        </div>
      </section>
    </>
  );
};

export default About;