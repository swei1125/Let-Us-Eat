import React from 'react';
import { withRouter } from 'react-router-dom';

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state= {
            term: "",
            location: "",
            radius: 12,
            price: "",
            selected: [false, false, false, false]
        }
    }

    update(field, e) {
        this.setState({
            [field]: e.currentTarget.value
        });
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

        this.props.fetchrestaurants(this.state)
            .then(() => {
                this.props.history.push(
                    `/search/${this.state.term}&${this.state.location}&${this.state.radius}&${this.state.price}`
                );
            });
    }

    render(){
        return (
            <form onSubmit={this.handleSubmit.bind(this)} className="search_form">

              <div className="what">
                <div className="inputs">
                    <h2>Find</h2>
                    <input type="text" onChange={this.update.bind(this, "term")} value={this.state.term} placeholder="restaurants, food, burguers..." />
                </div>
                <ul className="price">
                  <li onClick={this.handleClick.bind(this, 0)} className={this.state.selected[0] ? "checked" : ""}>$</li>
                  <li onClick={this.handleClick.bind(this, 1)} className={this.state.selected[1] ? "checked" : ""}>$</li>
                  <li onClick={this.handleClick.bind(this, 2)} className={this.state.selected[2] ? "checked" : ""}>$</li>
                  <li onClick={this.handleClick.bind(this, 3)} className={this.state.selected[3] ? "checked" : ""}>$</li>
                </ul>
              </div>

              <div className="where">
                <div className="inputs">
                    <h2>Near</h2>
                    <input type="text" onChange={this.update.bind(this, "location")} value={this.state.location} placeholder="Downtown Berkeley, Berkeley, CA" />
                </div>
                    <div className="slidecontainer">
                        <label>
                        Max. Distance
                        <input type="range" min="2" max="24" step="1" className="slider" list="tickmarks" onChange={this.update.bind(this, "radius")} value={this.state.radius} />
                        <datalist id="tickmarks">
                            <option value="2" />
                            <option value="4" />
                            <option value="8" />
                            <option value="12" />
                            <option value="16" />
                            <option value="20" />
                            <option value="24" />
                        </datalist>
                        </label>
                    </div>
              </div>



              <input type="submit" value="search" />
            </form>
          );
    }
}

export default Search;