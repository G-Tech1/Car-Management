import React from "react";

class NewSaleForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            auto: '',
            salesPerson: '',
            customer: '',
            salesPrice: '',
            customers: [],
            salesPersons: [],
            autos: [],
        };
        this.handleAutoChange = this.handleAutoChange.bind(this);
        this.handleSalesPersonChange = this.handleSalesPersonChange.bind(this);
        this.handleCustomerChange = this.handleCustomerChange.bind(this);
        this.handleSalesPriceChange = this.handleSalesPriceChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    async componentDidMount() {
        const url = 'http://localhost:8090/api/sales/';
        const customerURL = 'http://localhost:8090/api/customers/';
        const autoURl = 'http://localhost:8100/api/automobiles/';

        const response = await fetch(autoURl);
        const response2 = await fetch(url);
        const response3 = await fetch(customerURL);

        if (response.ok) {
            const data = await response.json();
            console.log(data)
            this.setState({
                autos: data.autos,


            });
            
        }
        if (response2.ok) {
            const data = await response2.json();
            console.log(data)
            this.setState({
                salesPersons: data.sales_person,
            })
        }
        if (response3.ok) {
            const data = await response3.json();
            console.log(data)
            this.setState({
                customers: data.customer
            })
        }
    }





    async handleSubmit(event) {
        event.preventDefault();
        const data = { ...this.state };
        data.sales_person = data.salesPerson;
        data.sales_price = data.salesPrice;
        delete data.salesPerson;
        delete data.salesPersons;
        delete data.autos;
        // delete data.auto;
        // delete data.customer;
        delete data.customers;
        delete data.salesPrice;

        const recordURL = 'http://localhost:8090/api/records/'
        const fetchConfig = {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(recordURL, fetchConfig);
        if (response.ok) {
            const newRecord = await response.json();
            console.log(newRecord)

            const cleared = {
                auto: '',
                salesPerson: '',
                customer: '',
                salesPrice: '',
            }
            this.setState(cleared)
        }
    }
    handleAutoChange(event) {
        const value = event.target.value;
        this.setState({ auto: value });
    }

    handleSalesPersonChange(event) {
        const value = event.target.value;
        this.setState({ salesPerson: value });
    }

    handleCustomerChange(event) {
        const value = event.target.value;
        this.setState({ customer: value });
    }
    handleSalesPriceChange(event) {
        const value = event.target.value;
        this.setState({ salesPrice: value });
    }



    render() {
        return (
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1>Record a new sale</h1>
                        <form onSubmit={this.handleSubmit} id="create-NewSale-form">
                            <div className="form-floating mb-3">
                                <select onChange={this.handleAutoChange} required name="auto" id="auto" className="form-select">
                                    <option value="">Choose a car</option>
                                    {this.state.autos.map(car => {
                                        return (
                                            <option key={car.id} value={car.id}>{car.vin}</option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div className="form-floating mb-3">
                                <select onChange={this.handleSalesPersonChange} required name="sales_person" id="sales_person" className="form-select">
                                    <option value="">Choose a sales person</option>
                                    {/* {console.log(this)} */}
                                    {this.state.salesPersons.map(person => {
                                        return(
                                            <option key={person.id} value={person.id}>{person.name}</option>
                                        )
                                    })}
                                </select>
                                </div>
                                <div className="form-floating mb-3">
                                    <select onChange={this.handleCustomerChange} required name="customer" id="customer" className="form-select">
                                        <option value="">Choose a customer</option>
                                        {this.state.customers.map(customer => {
                                            return(
                                                <option key={customer.id} value={customer.id}>{customer.name}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                                <div className="form-floating mb-3">
                                <input value={this.state.salesPrice} onChange={this.handleSalesPriceChange} placeholder="sales_price" required type="text" name="sales_price" id="sales_price" className="form-control" />
                                <label htmlFor="phoneNumber">Sales Price</label>
                            </div>

                            <button className="btn btn-primary">Create</button>
                        </form>
                    </div>
                </div>
            </div >
        );
    };
};


export default NewSaleForm;