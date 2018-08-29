import React from 'react';
import { withRouter } from 'react-router-dom';
import NavBar from '../navbar/navbar';

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state= {
            term: "",
            location: "",
            radius: 12 * 1600,
            price: "1",
            selected: [false, false, false, false]
        }
    }

    update(field, e) {
        if (field === 'radius') {
            this.setState({
                [field]: parseInt(e.currentTarget.value)
            });
        }else{
            this.setState({
              [field]: e.currentTarget.value
            });
        }
    }

    handleClick(index, e) {
        const arr = [];
        let str = ""
        for(let i = 0; i < 4; i ++){
            arr[i] = i <= index;
            str = str + (i<index ? `${i+1}, ` : "")
        }
        str = str + `${index+1}`;
        this.setState({selected: arr, price: str})
    }

    handleSubmit(e) {  
        e.preventDefault();

        let input = {limit: 50, term: this.state.term, location: this.state.location, radius: this.state.radius, price: this.state.price}

        this.props.fetchRestaurants(input).then(() => {
          this.props.history.push(`/search/${this.state.term}&${this.state.location}&${this.state.radius}&${this.state.price}`);
        });
    }

    componentDidMount(){
      document.getElementById("initialInput").focus();
    }

    render(){
        return (

          <div className="search_form" >
              <NavBar />
              <form onSubmit={this.handleSubmit.bind(this)} className="search_form2">
                <h3>Leave the simple things in life to us</h3>
                <div className="what">
                  <div className="inputs">
                    <h2>Find</h2>
                    <input id="initialInput" type="text" onChange={this.update.bind(this, "term")} value={this.state.term} placeholder="restaurants, food, burguers..." />
                  </div>
                  <ul className="price">
                    <li onClick={this.handleClick.bind(this, 0)} className={this.state.selected[0] ? "checked" : ""}>
                      $
                    </li>
                    <li onClick={this.handleClick.bind(this, 1)} className={this.state.selected[1] ? "checked" : ""}>
                      $
                    </li>
                    <li onClick={this.handleClick.bind(this, 2)} className={this.state.selected[2] ? "checked" : ""}>
                      $
                    </li>
                    <li onClick={this.handleClick.bind(this, 3)} className={this.state.selected[3] ? "checked" : ""}>
                      $
                    </li>
                  </ul>
                </div>

                <div className="where">
                  <div className="inputs">
                    <h2>Near</h2>
                    <input type="text" onChange={this.update.bind(this, "location")} value={this.state.location} placeholder="city, area, state or/and zip" />
                  </div>
                  <div className="slidecontainer">
                    <input type="range" min="3200" max="38400" step="1600" className="slider" list="tickmarks" onChange={this.update.bind(this, "radius")} value={this.state.radius} />
                    <datalist id="tickmarks">
                      <option value="3200" />
                      <option value="6400" />
                      <option value="12800" />
                      <option value="20200" />
                      <option value="26600" />
                      <option value="32000" />
                      <option value="38400" />
                    </datalist>
                    <p>
                      {Math.floor(this.state.radius / 1600)} miles
                      around
                    </p>
                  </div>
                </div>

                <input type="submit" value="" id="submitInput" />
              </form>
            </div>
        )
    }
}

export default Search;