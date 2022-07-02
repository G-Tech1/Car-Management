import React from "react";

class SalesForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            employeeNumber: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    async handleSubmit(event) {
        event.preventDefault();
        const data = { ...this.state };
        data.employee_number = data.employeeNumber;
        delete data.employeeNumber;

        const customerURL = 'http://localhost:8090/api/sales/'
        const fetchConfig = {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(customerURL, fetchConfig);
        if (response.ok) {
            const newEmployee = await response.json();
            console.log(newEmployee)

            this.setState(this.state)
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
                        <h1>Create a new employee</h1>
                        <form onSubmit={this.handleSubmit} id="create-Sales-form">
                            <div className="form-floating mb-3">
                                <input value={this.state.name} onChange={this.handleChange} placeholder="Name" required type="text" name="name" id="name" className="form-control" />
                                <label htmlFor="name">Name</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input value={this.state.employeeNumber} onChange={this.handleChange} placeholder="employeeNumber" required type="text" name="employeeNumber" id="employee_number" className="form-control" />
                                <label htmlFor="phoneNumber">Employee Number</label>
                            </div>
                            <button className="btn btn-primary">Create</button>
                        </form>
                    </div>

                </div>
            </div >
        );
    }
}

export default SalesForm;