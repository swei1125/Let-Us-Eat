import React from 'react';
import { withRouter } from 'react-router-dom';

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state= {
            term: "restaurants",
            location: "",
            radius: 12,
            price: ""
        }
    }

    update(field) {
        return e => this.setState({
            [field]: e.currentTarget.value
        });
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
        return <div>
            <form onSubmit={this.handleSubmit.bind(this)}>
              <label>
                Where?
                <input type="text" onChange={this.update.bind(this, "zip")} value={this.state.zip} />
              </label>

              <div className="slidecontainer">
                <label>
                  Max. Distance
                    <input type="range" min="2" max="24" step="1" className="slider" list="tickmarks" onChange={this.update.bind(this, "radius")} value={this.state.radius} />
                    <datalist id="tickmarks">
                        <option value="2"/>
                        <option value="4"/>
                        <option value="8"/>
                        <option value="12"/>
                        <option value="16"/>
                        <option value="20"/>
                        <option value="24"/>
                    </datalist>
                </label>
              </div>

              <label>
                Price
                <input type="text" onChange={this.update.bind(this, "price")} value={this.state.price} />
              </label>

              <input type="submit" value="search" />
            </form>
          </div>;
    }
}

export default Search;