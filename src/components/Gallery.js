import React from "react";
import ReactDOM from "react-dom";
import PhoneDetails from "../components/PhoneDetails";
import { unmountComponentAtNode } from "react-dom";

/* Gallery to display phones */

class Gallery extends React.Component {

  render() {
    return (
      <div>
        <div
          id="overlay"
          className="overlay"
          onClick={() => this.closeOverlay()}
        ></div>
        <ul>
          {this.props.results.map((item) => (
            <li key={item.id} className="phone-cell">
              <img src={item.imageSrc} alt={item.name} />
              <h2>{item.name}</h2>
              <b>
                {item.initialPhonePrice.value === "0.00"
                  ? "Free"
                  : "€" + item.initialPhonePrice.value}
              </b>
              <ul>
                <li>
                  <b>Plan Name: </b>
                  {item.initialPlan.planName}
                </li>
                <li>
                  <b>Plan Price: </b>€{item.initialPlan.planPrice}
                </li>
              </ul>
              {this.checkIfSoldOut(item.variants) ? <b>Sold Out</b> : <b>In Stock</b>}
              <button onClick={() => this.getDetails(item.id)}>Show details</button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  
  getDetails = (id) => {
	
    fetch(`${process.env.PUBLIC_URL}/api/phones.json`)
      .then((r) => r.json())
      .then((data) => {
        const item = this.findId(data, id);
        ReactDOM.render(
          <PhoneDetails data={item} />,
          document.getElementById("phone-details")
        );
        document.getElementById("phone-details").style.display = "block";
        document.getElementById("overlay").style.display = "block";
        window.scroll({ top: 0, behavior: "smooth" });
      });

  }
  
  findId = (data, idToFind) => {
    var categoryArray = data.products;
    for (var i = 0; i < categoryArray.length; i++) {
      if (categoryArray[i].id === idToFind) {
        return categoryArray[i];
      }
    }
  }
  
  checkIfSoldOut(array) {
    let variantsInStock = 0;

    for (var i = 0; i < array.length; i++) {
      if (array[i].pricingOptions[0].outOfStock === false) {
        variantsInStock++;
      }
    }

    if (variantsInStock === array.length) {
      return false;
    } else {
      return true;
    }
  };
  
  closeOverlay = () => {
    unmountComponentAtNode(document.getElementById("phone-details"));
  };
  
};



export default Gallery;
