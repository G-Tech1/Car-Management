import React from 'react';

class VehicleModelForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      pictureUrl: '',
      manufacturer_id: '',
      manufacturers: [],
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  async componentDidMount() {
    const url = 'http://localhost:8100/api/manufacturers/'
    const response = await fetch (url);
    if (response.ok) {
        const data = await response.json();
        this.setState({ manufacturers: data.manufacturers});
        console.log(data);
    }
  }

  async handleSubmit(event) {
    event.preventDefault();
    const data = {...this.state};
    data.picture_url = data.pictureUrl;
    delete data.pictureUrl;
    delete data.manufacturers
    console.log(data);



    const vehicleModelUrl = 'http://localhost:8100/api/models/';
    const fetchOptions = {
      method: 'post',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const vehicleModelResponse = await fetch(vehicleModelUrl, fetchOptions);
    if (vehicleModelResponse.ok) {
        const newVehicleModel = await vehicleModelResponse.json();
        console.log(newVehicleModel);
        
        const cleared = {
            name: '',
            pictureUrl: '',
            manufacturer_id: '',
        };
        this.setState(cleared);
    }
  }


  handleChange(event) {
    const newState = {};
    newState[event.target.id] = event.target.value;
    this.setState( newState );
  }


  render() {
    return (
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Create A Vehicle Model</h1>
            <form onSubmit={this.handleSubmit} id="create-technician-form">
              <div className="form-floating mb-3">
                <input value={this.state.name} onChange={this.handleChange} placeholder="Name" required type="text" name="name" id="name" className="form-control" />
                <label htmlFor="name">Name</label>
              </div>
              <div className="form-floating mb-3">
                <input value={this.state.pictureUrl} onChange={this.handleChange} placeholder="Name" required type="url" name="pictureUrl" id="pictureUrl" className="form-control" />
                <label htmlFor="pictureUrl">Picture URL</label>
              </div>
              <div className="mb-3">
                <select value={this.state.manufacturer_id} onChange={this.handleChange} required name="manufacturer_id" id="manufacturer_id" className="form-select">
                    <option value="">Choose a manufacturer</option>
                    {this.state.manufacturers.map(manufacturer => {
                        return (
                        <option key={manufacturer.id} value={manufacturer.id}>
                            {manufacturer.name}
                        </option>
                        );
                    })}
                    </select>
              </div>
              <button className="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
  
}

export default VehicleModelForm;
