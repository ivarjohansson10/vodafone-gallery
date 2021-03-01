import React from "react";
import ReactDOM from "react-dom";
import PhoneThumbnails from "../components/PhoneThumbnails";

class PhoneDetails extends React.Component {
  renderColours() {
    return Object.entries(this.props.data.variants).map(
      ([key, variants], i) => {
        return (
          <div key={key} className={variants.pricingOptions[0].outOfStock ? "strikethrough" : ""}>
            <label
              className="radio-button-label"
              key={key}
              htmlFor={variants.colour.replace("#", "").toLowerCase()}
            >
              {variants.colour}
              <input
                type="radio"
                name="colour"
                id={variants.colour.replace("#", "").toLowerCase()}
                value={variants.colour.replace("#", "").toLowerCase()}
                onChange={() => renderThumbnails(variants.phoneImages)}
                defaultChecked={i === 0}
              />
              {i === 0 ? renderThumbnails(variants.phoneImages) : ""}
            </label>
          </div>
        );
      }
    );
  }

  render() {
    return (
      <div>
        <img
          className="main-image"
          src={this.props.data.imageSrc}
          alt={this.props.data.name}
        />
        <h2>{this.props.data.name}</h2>
        <div id="thumbnails"></div>
        <div>
          {this.renderColours()}
          <div
            dangerouslySetInnerHTML={{ __html: this.props.data.summary }}
          ></div>
          {Object.entries(this.props.data.variants).map(
            ([key, variants], i) => {
              return (
                <div key={key}>
                  <div>
                    {Object.entries(variants.pricingOptions).map(
                      ([key, pricingOptions]) => {
                        return (
                          <div key={key}>
                            <div className={"grey-background"}>
                              <span className={pricingOptions.outOfStock ? "strikethrough" : ""}>
                                <b>Colour: </b>
                                {variants.colour} <b>Capacity: </b>
                                {pricingOptions.capacity}
                              </span>
                            </div>
                            <div>
                              {Object.entries(pricingOptions.price).map(
                                ([key, price], j) => {
                                  return (
                                    <label
                                      key={key}
                                      className="radio-button-label"
                                      htmlFor={
                                        pricingOptions.capacity
                                          .replace(" ", "-" ) +
                                        variants.colorCode
                                          .replace("#", "") +
                                        price.planName
                                          .replace(" ", "-")
                                          .toLowerCase()
                                      }
                                    >
                                      <input
                                        type="radio"
                                        name="plan"
                                        id={
                                          pricingOptions.capacity
                                            .replace(" ", "-") +
                                          variants.colorCode
                                            .replace("#", "") +
                                          price.planName
                                            .replace(" ", "-")
                                            .toLowerCase()
                                        }
                                        value={
                                          pricingOptions.capacity
                                            .replace(" ", "-") +
                                          variants.colorCode
                                            .replace("#", "") +
                                          price.planName
                                            .replace(" ", "-")
                                            .toLowerCase()
                                        }
                                      />
                                      <div>
                                        <b>Plan Name: </b>
                                        {price.planName}
                                      </div>
                                      <div>
                                        <b>Plan Price: </b>
                                        {price.planPrice}
                                      </div>
                                      <div>
                                        <b>Phone Price: </b>
                                        {price.phonePrice === "0.00"
                                          ? "Free"
                                          : price.phonePrice}
                                      </div>
                                      <div>
                                        <b>Data Allowance: </b>
                                        {price.dataAllowance}
                                      </div>
                                    </label>
                                  );
                                }
                              )}
                            </div>
                          </div>
                        );
                      }
                    )}
                  </div>
                </div>
              );
            }
          )}
          <div dangerouslySetInnerHTML={{ __html: this.props.data.fieldItems }}></div>
          <hr />
          <ul>
            <li>
              <h4>{this.props.data.name}</h4>
            </li>
            <li>
              <b>Once Off Price: </b>
              {this.props.data.initialPhonePrice.value === "0.00"
                ? "Free"
                : "€" + this.props.data.initialPhonePrice.value}
            </li>
            <li>
              <b>Monthly Plan Name: </b>
              {this.props.data.initialPlan.planName}
            </li>
            <li>
              <b>Monthly Plan Price: </b>€
              {this.props.data.initialPlan.planPrice}
            </li>
          </ul>
        </div>
      </div>
    );
  }

  componentWillUnmount() {
    document.getElementById("phone-details").style.display = "none";
    document.getElementById("overlay").style.display = "none";
  }
}

const renderThumbnails = (images) => {
  setTimeout(function () {
    ReactDOM.render(
      <PhoneThumbnails images={images} />,
      document.getElementById("thumbnails")
    );
  }, 100);
};

export default PhoneDetails;
