import React from "react";

class PhoneThumbnails extends React.Component {
  render() {
    return (
      <div>
        <ul>
          {this.props.images.map((item) => (
            <li key={item} className="thumbnail">
              <img src={item} alt={item} />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default PhoneThumbnails;
