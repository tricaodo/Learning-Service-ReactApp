/* eslint jsx-a11y/anchor-is-valid: 0 */
import React from "react";
const Hero = () => {
    return (
        <section className="section mt-6" style={{ paddingTop: "150px" }}>
            <div className="container">
                <div className="columns">
                    <div className="column">
                        <div className="tile is-parent ">
                            <div className="tile is-child box">
                                <p className="title has-text-grey-dark has-text-centered">Getting stuck???</p>
                                <p className="has-text-grey">
                                    Our service is affordable and a great value! We make it easy to invest in your child’s
                                    future with a variety of proven programs and competitive pricing that fit your budget.
                    </p>
                            </div>
                        </div>
                    </div>
                    <div className="column">
                        <img src={process.env.PUBLIC_URL + "kid.png"} style={{ width: "70%" }} alt="hero" />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Hero;