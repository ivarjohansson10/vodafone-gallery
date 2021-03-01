import React from "react";
import ReactDOM from "react-dom";
import PhoneDetails from "../components/PhoneDetails";
import { unmountComponentAtNode } from "react-dom";

/* Gallery to display phones */
const Gallery = (props) => {
  const results = props.results;

  return (
    <div>
      <div
        id="overlay"
        className="overlay"
        onClick={() => closeOverlay()}
      ></div>
      <ul>
        {results.map((item) => (
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
            {checkIfSoldOut(item.variants) ? <b>Sold Out</b> : <b>In Stock</b>}
            <button onClick={() => getDetails(item.id)}>Show details</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

/* Close overlay when modal view is closed */
const getDetails = (id) => {
	
  fetch(`${process.env.PUBLIC_URL}/api/phones.json`)
    .then((r) => r.json())
    .then((data) => {
      const item = findId(data, id);
      ReactDOM.render(
        <PhoneDetails data={item} />,
        document.getElementById("phone-details")
      );
	  document.getElementById("phone-details").style.display = "block";
	  document.getElementById("overlay").style.display = "block";
	  window.scroll({ top: 0, behavior: "smooth" });
    });

};

/* Close overlay when modal view is closed */
const closeOverlay = () => {
  unmountComponentAtNode(document.getElementById("phone-details"));
};

/* To get the phone data by using its unique ID */
const findId = (data, idToFind) => {
  var categoryArray = data.products;
  for (var i = 0; i < categoryArray.length; i++) {
    if (categoryArray[i].id === idToFind) {
      return categoryArray[i];
    }
  }
};

/* To check if phone variant is sold out */
function checkIfSoldOut(array) {
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
}

export default Gallery;
