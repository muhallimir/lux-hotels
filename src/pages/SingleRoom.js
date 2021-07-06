// Class based component
import React, { Component } from "react";
import defBackground from "../images/room-2.jpeg";

import Banner from "../components/Banner";
import { Link } from "react-router-dom";
import { RoomContext } from "../context";
import StyledImg from "../components/Styled";

export default class SingleRoom extends Component {
  constructor(props) {
    super(props);
    // console.log(this.props);
    this.state = {
      slug: this.props.match.params.slug,
      defBackground,
    };
  }
  static contextType = RoomContext;
  // componentDidMount() {}
  render() {
    const { getRoom } = this.context;
    const room = getRoom(this.state.slug);

    // error handling if no room was found
    if (!room) {
      return (
        <div className="error">
          <h3>Room not found...</h3>
          <Link to="/rooms" className="btn-primary">
            Back to Room Selection
          </Link>
        </div>
      );
    }
    // console.log(room);
    const {
      name,
      description,
      capacity,
      size,
      price,
      extras,
      breakfast,
      pets,
      images,
    } = room;
    // destructuring of images
    const [mainImg, ...defaultImg] = images;

    return (
      <>
        <StyledImg img={images[0] || this.state.defBackground}>
          <Banner title={`${name} room`}>
            <Link to="/rooms" className="btn-primary">
              View Other Rooms
            </Link>
          </Banner>
        </StyledImg>
        <section className="single-room">
          <div className="single-room-images">
            {defaultImg.map((item, index) => {
              return <img key={index} src={item} alt={name} />;
            })}
          </div>
          <div className="single-room-info">
            <article className="desc">
              <h3>details</h3>
              <p>{description}</p>
            </article>
            <article className="info">
              <h3>info</h3>
              <h6> price: ₱{price}</h6>
              <h6> size: {size} SQFT</h6>
              <h6>
                {" "}
                max capacity:{" "}
                {capacity > 1 ? `${capacity} people` : `${capacity} person`}
              </h6>
              <h6>{pets ? "pets allowed" : "no pets allowed"}</h6>
              <h6>{breakfast && "free breakfast"}</h6>
            </article>
          </div>
          <section className="room-extras">
            <h6>extras</h6>
            <ul className="extras">
              {extras.map((item, index) => {
                return <li key={index}>-{item}</li>;
              })}
            </ul>
          </section>
        </section>
      </>
    );
  }
}
