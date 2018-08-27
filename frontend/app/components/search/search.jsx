import React from 'react';
import { withRouter } from 'react-router-dom';

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state= {
            term: "restaurants",
            location: "",
            radius: 25,
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
        return(
            <div>
                <form onSubmit={this.handleSubmit.bind(this)}>

                    <label>Where?
                        <input type="text" onChange={this.update.bind(this, 'zip')} value={this.state.zip} />
                    </label>

                    <label>Max. Distance
                        <input type="number" onChange={this.update.bind(this, 'radius')} value={this.state.radius} />
                    </label>

                    <label>Price
                        <input type="text" onChange={this.update.bind(this, 'price')} value={this.state.price} />
                    </label>
                    
                    <input type="submit" value="search" />
                </form>
            </div>
        )
    }
}

export default Search;