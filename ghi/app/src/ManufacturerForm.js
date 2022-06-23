import React from 'react';

class ManufacturerForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  async handleSubmit(event) {
    event.preventDefault();
    const data = { ...this.state };
    console.log(data)



    const manufacturerUrl = 'http://localhost:8100/api/manufacturers/';
    const fetchOptions = {
      method: 'post',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await fetch(manufacturerUrl, fetchOptions);
    if (response.ok) {
      const newManufacturer = await response.json();
      console.log(newManufacturer);

      const cleared = {
        name: '',
      };
      this.setState(cleared);
    }
  }


  handleChange(event) {
    const newState = {}
    newState[event.target.id] = event.target.value;
    this.setState(newState);
  }


  render() {
    return (
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Create A Manufacturer</h1>
            <form onSubmit={this.handleSubmit} id="create-technician-form">
              <div className="form-floating mb-3">
                <input value={this.state.name} onChange={this.handleChange} placeholder="Name" required type="text" name="name" id="name" className="form-control" />
                <label htmlFor="name">Name</label>
              </div>
              <button className="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
      </div>
    );
  }

}

export default ManufacturerForm;
