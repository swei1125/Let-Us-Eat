import React from 'react';
import { withRouter } from 'react-router-dom';
import NavBar from '../navbar/navbar_container';

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state= {
            term: "restaurant",
            location: "",
            radius: 12 * 1600,
            price: "1",
            open_now: false,
            selected: [false, false, false, false],
            submitted: false
        }
    }

    update(field, e) {
        if (field === 'radius') {
            this.setState({
                [field]: parseInt(e.currentTarget.value)
            });
        }else if (field === 'open_now'){
          document.getElementById("open_now").checked ? this.setState(
                { [field]: true }
              ) : this.setState({ [field]: false });
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

        let input = {limit: 50, term: this.state.term, location: this.state.location, radius: this.state.radius, price: this.state.price, open_now: this.state.open_now}

        this.props.fetchRestaurants(input).then(() => {
          this.props.history.push(`/search/${this.state.term}&${this.state.location}&${this.state.radius}&${this.state.price}&${this.state.open_now}&0`);
        });
      this.setState({ submitted: true })
    }

    componentDidMount(){
      document.getElementById("initialInput").focus();
    }

    render(){
        return (

          <div className="search_form" >
              <NavBar />
              <form onSubmit={this.handleSubmit.bind(this)} className="search_form2">
                <div className="search_form3">
                  <h3>Don't worry, we'll pick a restaurant for you!</h3>
                  <div className="where">
                    <div className="inputs">
                      <h2>Near</h2>
                      <input id="initialInput" required type="text" onChange={this.update.bind(this, "location")} value={this.state.location} placeholder="city, area, state or/and zip" />
                    </div>
                    <div className="slidecontainer">
                      <input type="range" min="3200" max="38400" step="1600" className="slider" list="tickmarks" onChange={this.update.bind(this, "radius")} value={this.state.radius}
                        style={{ background: `linear-gradient(to left, #ffffff, #ffffff ${100 - Math.floor((this.state.radius - 3200) * 100 / 35200)}%, #f44141 ${100 - Math.floor((this.state.radius - 3200) * 100 / 35200)}%, #4143f4)` }}
                      />
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
                    <div className="extra">
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
                      <div className="OpenNow">
                        <input type="checkbox" id="open_now"
                          onChange={this.update.bind(this, "open_now")} value={this.state.open_now} />
                        <label htmlFor="open" className="open_now">Open Now</label>
                      </div>
                    </div>
                  </div>
                  <div className="inputDiv">
                    {this.state.submitted ? <div className="loader"></div> : <input type="submit" value="" id="submitInput" />}
                  </div> 
                </div>               
                <footer className="authors">
                  <img src="./images/split.png" />
                  <a href="https://www.linkedin.com/in/jose-martinez-517a29149/">
                    Jose Martinez
                  </a>
                  <img src="./images/split.png" />
                  <a href="https://www.linkedin.com/in/nmenares/?locale=en_US">
                    Nataly Menares
                  </a>
                  <img src="./images/split.png" />
                  <a href="https://www.linkedin.com/in/shiyuwei1125">
                    Natasha Wei
                  </a>
                  <img src="./images/split.png" />
                </footer> 
              </form>
            </div>
        )
    }
}

export default Search;
