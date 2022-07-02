import React from "react";

class CustomerForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            address: '',
            phoneNumber: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    async handleSubmit(event) {
        event.preventDefault();
        const data = { ...this.state };
        data.phone_number = data.phoneNumber;
        delete data.phoneNumber;

        const customerURL = 'http://localhost:8090/api/customers/'
        const fetchConfig = {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(customerURL, fetchConfig);
        if (response.ok) {
            const newCustomer = await response.json();
            console.log(newCustomer)

            this.setState(this.state);
        }
    }


    handleChange(event) {
        const newState = {};
        newState[event.target.id] = event.target.value;
        this.setState(newState);
      }

    render() {
        return (
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1>Create a new customer</h1>
                        <form onSubmit={this.handleSubmit} id="create-Customer-form">
                            <div className="form-floating mb-3">
                                <input value={this.state.name} onChange={this.handleChange} placeholder="Name" required type="text" name="name" id="name" className="form-control" />
                                <label htmlFor="name">Name</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input value={this.state.address} onChange={this.handleChange} placeholder="address" required type="text" name="address" id="address" className="form-control" />
                                <label htmlFor="address">Address</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input value={this.state.phoneNumber} onChange={this.handleChange} placeholder="phoneNumber" required type="text" name="phoneNumber" id="phone_number" className="form-control" />
                                <label htmlFor="phoneNumber">Phone Number</label>
                            </div>
                            <button className="btn btn-primary">Create</button>
                        </form>
                    </div>

                </div>
            </div >
        );
    }
}

export default CustomerForm;







