import React from 'react';

class AutomobileForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      color: '',
      year: '',
      vin: '',
      model_id: '',
      models: [],
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  async componentDidMount() {
    const url = 'http://localhost:8100/api/models/'
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      this.setState({ models: data.models });
      console.log(data);
    }
  }

  async handleSubmit(event) {
    event.preventDefault();
    const data = { ...this.state };
    delete data.models
    console.log(data);



    const automobileUrl = 'http://localhost:8100/api/automobiles/';
    const fetchOptions = {
      method: 'post',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const automobileResponse = await fetch(automobileUrl, fetchOptions);
    if (automobileResponse.ok) {
      const newAutomobile = await automobileResponse.json();
      console.log(newAutomobile);

      const cleared = {
        color: '',
        year: '',
        vin: '',
        model_id: '',
      };
      this.setState(cleared);
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
            <h1>Add an Automobile to Inventory</h1>
            <form onSubmit={this.handleSubmit} id="create-technician-form">
              <div className="form-floating mb-3">
                <input value={this.state.color} onChange={this.handleChange} placeholder="Name" required type="text" name="color" id="color" className="form-control" />
                <label htmlFor="color">Color</label>
              </div>
              <div className="form-floating mb-3">
                <input value={this.state.year} onChange={this.handleChange} placeholder="Year" required type="number" name="year" id="year" className="form-control" />
                <label htmlFor="year">Year</label>
              </div>
              <div className="form-floating mb-3">
                <input value={this.state.vin} onChange={this.handleChange} placeholder="VIN" required type="text" name="vin" id="vin" className="form-control" />
                <label htmlFor="vin">VIN</label>
              </div>
              <div className="mb-3">
                <select value={this.state.model_id} onChange={this.handleChange} required name="model_id" id="model_id" className="form-select">
                  <option value="">Choose a model</option>
                  {this.state.models.map(model => {
                    return (
                      <option key={model.id} value={model.id}>
                        {model.name}
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

export default AutomobileForm;
