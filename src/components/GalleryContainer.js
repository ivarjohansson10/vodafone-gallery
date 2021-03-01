import React from "react";
import ReactDOM from "react-dom";
import Gallery from "./Gallery";
import MyFilterButton from "./MyFilterButton";
import { unmountComponentAtNode } from "react-dom";

/* Create default filters object */
let filters = {
  brands: [],
  os: [],
  maxPrice: 9999,
  sorted: false,
};

let pageNumber = 0;

/* Create input for input file upload */
class GalleryContainer extends React.Component {
  render() {
    return (
      <div>
        <MyFilterButton name="Apple" onClick={() => toggleBrands("Apple")} />
        <MyFilterButton name="Samsung" onClick={() => toggleBrands("Samsung")} />
        <MyFilterButton name="Android" onClick={() => toggleOS("Android")} />
        <MyFilterButton name="iOS" onClick={() => toggleOS("iOS")} />
        <MyFilterButton name="< €500" onClick={() => toggleMaxPrice(500)} />
        <MyFilterButton name="< €300" onClick={() => toggleMaxPrice(300)} />
        <MyFilterButton name="Sort By Price (Low to High)" onClick={() => sortResults()} />
        <div id="gallery"></div>
        <div id="pagination"></div>
      </div>
    );
  }

  componentDidMount() {
    getPhones(0);
  }
}

class MyButton extends React.Component {
  render() {
    return <button onClick={this.props.onClick}>{this.props.name}</button>;
  }
}

const filterResults = (data) => {
  let results = [];

  // Filter results
  for (var i = 0; i < data.products.length; i++) {
    // Display 9 results at max
    const obj = data.products[i];
    let filtered = false;

    // Filter brands
    if (filters.brands.length !== 0 && !filters.brands.includes(obj.brand)) {
      filtered = true;
    }

    // Find os of phone so it can be filtered
    let os = "";

    for (var z = 0; z < obj.specifications.length; z++) {
      if (obj.specifications[z].name === "Operation System") {
        os = obj.specifications[z].value;
      }
    }

    // Find by os
    if (filters.os.length !== 0 && !filters.os.includes(os)) {
      filtered = true;
    }

    // Filter price
    if (filters.maxPrice < parseFloat(obj.initialPhonePrice.value)) {
      filtered = true;
    }

    // If this phone isn't filtered out add it to results array
    if (filtered === false) {
      results.push(obj);
    }
  }

  return results;
};

const sortResultsByPrice = (filtered) => {
  filtered.sort(function (a, b) {
    return a.initialPhonePrice.value - b.initialPhonePrice.value;
  });

  return filtered;
};

/* Function to get phone information */
const getPhones = (pageNumber) => {
	
  fetch(`${process.env.PUBLIC_URL}/api/phones.json`)
    .then((r) => r.json())
    .then((data) => {
	  
      let filtered = filterResults(data);
	  
	  /* Sort results if sorted */
	  if (filters.sorted) {
		filtered = sortResultsByPrice(filtered);
	  }
	  
	  /* Settings for pagination */
	  let start = 0;
	  let end = 9;

	  /* Apply pagination */
	  if (pageNumber !== 0 && filtered.length > 9) {
		start = pageNumber * 9;
		end = start + 9;
	  }
	  
	  const pageResults = filtered.slice(start, end);

	  if (filtered.length > 9 && pageResults.length === 9) {
		ReactDOM.render(
		  <MyButton name="Next Page" onClick={() => nextPage()} />,
		  document.getElementById("pagination")
		);
	  } else if (pageNumber !== 0) {
		ReactDOM.render(
		  <MyButton name="Prev Page" onClick={() => prevPage()} />,
		  document.getElementById("pagination")
		);
	  } else {
		unmountComponentAtNode(document.getElementById("pagination"));
	  }

	  /* Render results */
	  ReactDOM.render(
		<Gallery results={pageResults} />,
		document.getElementById("gallery")
	  );
	  
    });
	
};

/* Filtering functions */
const toggleBrands = (filter) => {
  if (!filters.brands.includes(filter)) {
    filters.brands.push(filter);
  } else {
    filters.brands = filters.brands.filter(function (e) {
      return e !== filter;
    });
  }
  pageNumber = 0;
  getPhones(pageNumber);
};

const toggleOS = (filter) => {
  if (!filters.os.includes(filter)) {
    filters.os.push(filter);
  } else {
    filters.os = filters.os.filter(function (e) {
      return e !== filter;
    });
  }
  pageNumber = 0;
  getPhones(pageNumber);
};

const toggleMaxPrice = (filter) => {
  if (filters.maxPrice !== filter) {
    filters.maxPrice = filter;
  } else {
    filters.maxPrice = 5000;
  }
  pageNumber = 0;
  getPhones(pageNumber);
};

/* Sorting function */
const sortResults = (filter) => {
  if (filters.sorted) {
    filters.sorted = false;
  } else {
    filters.sorted = true;
  }
  getPhones(pageNumber);
};

/* Pagination functions */
const nextPage = () => {
  pageNumber++;
  getPhones(pageNumber);
};

const prevPage = () => {
  pageNumber--;
  getPhones(pageNumber);
};

export default GalleryContainer;
