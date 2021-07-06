import React, { Component } from "react";
import { FaMotorcycle, FaShuttleVan } from "react-icons/fa";
import { GiMeal } from "react-icons/gi";
import { CgDesktop } from "react-icons/cg";
import Title from "./Title";

export default class Services extends Component {
  state = {
    services: [
      {
        icon: <GiMeal />,
        title: "Free Breakfast",
        info: "Free",
      },
      {
        icon: <FaShuttleVan />,
        title: "Airport Pick-up / Drop",
        info: "Free",
      },
      {
        icon: <FaMotorcycle />,
        title: "Free Motorcycle parking",
        info: "Free",
      },

      {
        icon: <CgDesktop />,
        title: "24/7 reception",
        info: "Free",
      },
    ],
  };
  render() {
    return (
      <section className="services">
        <Title title="Services/Amenities" />
        <div className="services-center">
          {this.state.services.map((item, index) => {
            return (
              <article key={index} className="service">
                <span>{item.icon}</span>
                <h6>{item.title}</h6>
                <p>{item.info}</p>
              </article>
            );
          })}
        </div>
      </section>
    );
  }
}
