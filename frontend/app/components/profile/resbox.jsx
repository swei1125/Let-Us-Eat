import React from "react";
import { deleteRes } from "../../util/user_util";
import { css } from "react-emotion";
import { BeatLoader } from "react-spinners";

class ResBox extends React.Component {
  constructor(props) {
    super(props);
  }

  delete(id, yelpId) {
    return (e) => {
      e.preventDefault();
      
      const user = this.props.currentUser;
      
      
      deleteRes({userId: user.id, resId: id, yelpId: yelpId})
    }
  }
  
  render() {
    const list = this.props.currentUser.likedResIds;
    if (list.length !== 0 && !list[0].name) {
      return null;
    }
    
    return (
      <div className="res-list">
        {list.map(res => {
          const { name, phone, location, categories, price, image_url, rating } = res;
          const starPos = { 0: "0 0px", 1: "0 -24px", 1.5: "0 -48px", 2: "0 -72px", 2.5: "0 -96px", 3: "0 -120px", 3.5: "0 -144px", 4: "0 -168px", 4.5: "0 -192px", 5: "0 -216px" };
          const starPx = starPos[rating];
          return <div className="res-outer-wrapper" key={name}>
              <div className="header">
                <h1>{name}</h1>
                <button onClick={this.delete.bind(this)(res._id, res.yelpId)}>
                  <i className="fas fa-trash-alt" />
                </button>
              </div>
              <div className="content">
                <div className="image-box">
                  <img src={image_url} />
                </div>
                <div className="info-box">
                  <h4 className="tags">{categories.join(", ")}</h4>

                  <div className="stars" style={{ backgroundPosition: starPx }} />
                  <div className="price">{price}</div>
                  <h4 className="phone">{phone}</h4>
                  {location.map((el, i) => (
                    <li className="address" key={i}>
                      {el}
                    </li>
                  ))}
                </div>
              </div>
            </div>;
        })}
      </div>
    );
  }
}

export default ResBox;