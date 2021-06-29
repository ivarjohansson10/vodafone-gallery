import React from "react";
import ReactDOM from "react-dom";
import Gallery from "./Gallery";
import MyFilterButton from "./MyFilterButton";
import { unmountComponentAtNode } from "react-dom";

class GalleryContainer extends React.Component {
    
  constructor(props) {
    super(props);
    this.state = {
      filters: {
          brands: [],
          os: [],
          maxPrice: 9999,
          sorted: false,
        },
      pageNumber: 0,
    };
  }
  
  
  render() {
    return (
      <div>
        <MyFilterButton name="Apple" onClick={() => this.toggleBrands("Apple")} />
        <MyFilterButton name="Samsung" onClick={() => this.toggleBrands("Samsung")} />
        <MyFilterButton name="Android" onClick={() => this.toggleOS("Android")} />
        <MyFilterButton name="iOS" onClick={() => this.toggleOS("iOS")} />
        <MyFilterButton name="< €500" onClick={() => this.toggleMaxPrice(500)} />
        <MyFilterButton name="< €300" onClick={() => this.toggleMaxPrice(300)} />
        <MyFilterButton name="Sort By Price (Low to High)" onClick={() => this.sortResults()} />
        <div id="gallery"></div>
        <div id="pagination"></div>
      </div>
    );
  }

  
  componentDidMount() {
    this.getPhones(0);
  }
  
  
  filterResults = (data) => {
    
      let results = [];

      // Filter results
      for (var i = 0; i < data.products.length; i++) {
        // Display 9 results at max
        const obj = data.products[i];
        let filtered = false;

        // Filter brands
        if (this.state.filters.brands.length !== 0 &&!this.state.filters.brands.includes(obj.brand)) {
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
        if (this.state.filters.os.length !== 0 && !this.state.filters.os.includes(os)) {
          filtered = true;
        }

        // Filter price
        if (this.state.filters.maxPrice < parseFloat(obj.initialPhonePrice.value)) {
          filtered = true;
        }

        // If this phone isn't filtered out add it to results array
        if (filtered === false) {
          results.push(obj);
        }
      }

      return results;
    
  }

  
  sortResultsByPrice = (filtered) => {
    
    filtered.sort(function(a, b) {
      return a.initialPhonePrice.value - b.initialPhonePrice.value;
    });

    return filtered;
    
  }

  
  getPhones = (pageNumber) => {
	
    fetch(`${process.env.PUBLIC_URL}/api/phones.json`)
      .then((r) => r.json())
      .then((data) => {

        let filtered = this.filterResults(data);

        /* Sort results if sorted */
        if (this.state.filters.sorted) {
          filtered = this.sortResultsByPrice(filtered);
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
            <PageButton name="Next Page" onClick={() => this.nextPage()} />,
            document.getElementById("pagination")
          );
        } else if (pageNumber !== 0) {
          ReactDOM.render(
            <PageButton name="Prev Page" onClick={() => this.prevPage()} />,
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
	
  }

  /* Function to add or remove brand filter */
  toggleBrands = (filter) => {
    
    const filters = {...this.state.filters}
    
    if (!this.state.filters.brands.includes(filter)) {
      filters.brands.push(filter);
    } else {
      filters.brands = this.state.filters.brands.filter(function (e) {
        return e !== filter;
      });
    }
    
    this.setState({filters})
    this.setState({pageNumber: 0})
    
    this.getPhones(0);
  }

  /* Function to add or remove OS filter */
  toggleOS = (filter) => {
    
    const filters = {...this.state.filters}
    
    if (!this.state.filters.os.includes(filter)) {
      filters.os.push(filter);
    } else {
      filters.os = this.state.filters.os.filter(function (e) {
        return e !== filter;
      });
    }

    this.setState({filters})
    this.setState({pageNumber: 0})
    
    this.getPhones(0);
  }
  
  /* Function to add or remove maximum price filter */
  toggleMaxPrice = (filter) => {
    
    const filters = {...this.state.filters}
    
    if (this.state.filters.maxPrice !== filter) {
      filters.maxPrice = filter;
    } else {
      filters.maxPrice = 5000;
    }
    
    this.setState({filters})
    this.setState({pageNumber: 0})
    this.getPhones(0)
  }

  /* Function to sort results by price */
  sortResults = (filter) => {
    
    const filters = {...this.state.filters}
    
    if (this.state.filters.sorted) {
      filters.sorted = false;
    } else {
      filters.sorted = true;
    }
    
    this.setState({filters})
    this.getPhones(this.state.pageNumber);
  }

  /* Function for pagination to go to next page of results */
  nextPage = () => {
    
    const nextPageNumber = this.state.pageNumber + 1;
    
    this.setState({
        pageNumber: nextPageNumber
    }, () => {
        this.getPhones(this.state.pageNumber);
    });
    
  }

  /* Function for pagination to go to previous page of results */
  prevPage = () => {
    
    const prevPageNumber = this.state.pageNumber - 1;
    
    this.setState({pageNumber: prevPageNumber})

    this.setState({
        pageNumber: prevPageNumber
    }, () => {
        this.getPhones(this.state.pageNumber);
    });
    
  }
    
}

/* Function for pagination to go to previous page of results */
class PageButton extends React.Component {
  render() {
    return <button onClick={this.props.onClick}>{this.props.name}</button>;
  }
}


export default GalleryContainer;
