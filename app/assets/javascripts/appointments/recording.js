import React from 'react';

class Recording extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedIndex: 0
    };
  }

  handleChange(e) {
    if (e.target.value !== "") {
      this.setState({
        selectedIndex: parseInt(e.target.value, 10)
      });
    }
  }

  render() {
    const { results } = this.props;
    const { transcript, confidence } = results[0][this.state.selectedIndex];

    return <li className="recording">
      { transcript }
      <span className="pull-right">
        <select defaultValue="" onChange={this.handleChange.bind(this)}>
          <option value="">({ (confidence * 100).toFixed(0) }% sure)</option>
          {
            ([].slice.call(results[0])).map((result, i) =>
              <option key={result.transcript} value={i}>
                ({(result.confidence * 100).toFixed(0)}%) {result.transcript}
              </option>
            )
          }
        </select>
      </span>
    </li>
  }
}

export default Recording;
