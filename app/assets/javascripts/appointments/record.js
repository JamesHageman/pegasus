import React from 'react';
import { render } from 'react-dom';
import Recording from './recording';

class RecordPage extends React.Component {
  constructor() {
    super();
    const recognition = new (window.SpeechRecognition ||
      webkitSpeechRecognition ||
      mozSpeechRecognition ||
      msSpeechRecognition)();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 5;

    recognition.onresult = this.handleSpeechRecognitionResult.bind(this);
    recognition.onend = this.handleSpeechEnd.bind(this);

    this.recognition = recognition;
    this.state = {
      isRecording: false,
      records: [],
      symptoms: {},
    };
  }

  handleSpeechRecognitionResult(event) {
    console.log(event);
    this.setState({
      records: this.state.records.concat(event.results),
    });
    $('.transcript').scrollTop($('.transcript')[0].scrollHeight);
  }

  handleSpeechEnd(event) {
    console.log('end');
    if (this.state.isRecording) {
      this.recognition.start();
    }
  }

  startRecording() {
    this.setState({
      isRecording: true,
    });
    this.recognition.start();
  }

  stopRecording() {
    this.setState({
      isRecording: false,
    });
    this.recognition.stop();
  }

  handleClassification(index, { classification }) {
    console.log(classification);
    if (classification === 'Unknown') return;

    const newSymptoms = {
      ...this.state.symptoms,
      [classification]: (
        this.state.symptoms[classification]
          ? {
              count: this.state.symptoms[classification].count + 1,
              indices: this.state.symptoms[classification].indices.concat(
                this.state.records.length - 1,
              ),
            }
          : {
              count: 1,
              indices: [this.state.records.length - 1],
            }
      ),
    };

    this.setState({
      symptoms: newSymptoms,
    });
  }

  render() {
    console.log(this.state.symptoms);
    return (
      <div className="row">
        <div className="col-md-12">
          <p />
          <h2>Transcribe</h2>
          <p>To begin recording, press the Start button.</p>
          <div className="row">
            <div className="col-md-12 top15">
              <button
                type="button"
                className="btn btn-info btn-lg"
                onClick={this.startRecording.bind(this)}
              >
                Start
              </button>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 top15 transcript">
              {this.state.records.map((results, i) => (
                <Recording
                  key={i}
                  results={results}
                  onClassify={this.handleClassification.bind(this, i)}
                />
              ))}
            </div>
          </div>
          <div className="row">
            <div className="col-md-2 top15">
              <button type="button" className="btn btn-info btn-lg">
                Pause
              </button>
            </div>
            <div className="col-md-2 top15">
              <button
                type="button"
                className="btn btn-info btn-lg"
                onClick={this.stopRecording.bind(this)}
              >
                Stop
              </button>
            </div>
            <div className="col-md-8 top15" />
          </div>
          <div className="row">
            <p />
          </div>
          <hr />
          <h2>Review</h2>
          <p>Please review the results of the appointment:</p>
          <div className="row">
            <h3>Symptoms</h3>
          </div>
          <div className="row">
            <div
              className="pillbox btn-warning"
              data-initialize="pillbox"
              id="symptomsPillbox"
            >
              <ul className="clearfix pill-group">
                {Object.keys(this.state.symptoms)
                  .map(symptom => ({
                    ...this.state.symptoms[symptom],
                    name: symptom,
                  }))
                  .sort((a, b) => b.count - a.count)
                  .map(symptom => (
                    <li
                      className="btn pill"
                      data-value="foo"
                      key={symptom.name}
                    >
                      <span>{symptom.name} (x{symptom.count})</span>
                      <span className="glyphicon glyphicon-close">
                        <span className="sr-only">Remove</span>
                      </span>
                    </li>
                  ))}
                <li className="pillbox-input-wrap btn-group">
                  <input
                    type="text"
                    className="form-control pillbox-add-item btn-danger"
                    placeholder="more"
                  />
                </li>
              </ul>
            </div>
          </div>
          <div className="row">
            <h3>Areas Affected</h3>
          </div>
          <div className="row">
            <div
              className="pillbox btn-warning"
              data-initialize="pillbox"
              id="areasPillbox"
            >
              <ul className="clearfix pill-group">
                <li className="pillbox-input-wrap btn-group">
                  <input
                    type="text"
                    className="form-control pillbox-add-item btn-danger"
                    placeholder="more"
                  />
                </li>
              </ul>
            </div>
          </div>
          <div className="row">
            <h3>Diagnosis</h3>
          </div>
          <div className="row">
            <div
              className="pillbox btn-warning"
              data-initialize="pillbox"
              id="diagnosisPillbox"
            >
              <ul className="clearfix pill-group">
                <li className="pillbox-input-wrap btn-group">
                  <input
                    type="text"
                    className="form-control pillbox-add-item btn-danger"
                    placeholder="more"
                  />
                </li>
              </ul>
            </div>
          </div>
          <div className="row">
            <h3>Prescription</h3>
          </div>
          <div className="row">
            <div
              className="pillbox btn-warning"
              data-initialize="pillbox"
              id="prescriptionPillbox"
            >
              <ul className="clearfix pill-group">
                <li className="pillbox-input-wrap btn-group">
                  <input
                    type="text"
                    className="form-control pillbox-add-item btn-danger"
                    placeholder="more"
                  />
                </li>
              </ul>
            </div>
          </div>
          <hr />
          <h2>Report</h2>
          <p>
            Click these buttons to generate custom reports for the doctor or patient.
          </p>
          <div className="row">
            <div className="col-md-4 top15">
              <button type="button" className="btn btn-info btn-lg">
                Generate Doctor's Report
              </button>
            </div>
            <div className="col-md-4 top15">
              <button type="button" className="btn btn-info btn-lg">
                Generate Patient's Report
              </button>
            </div>
            <div className="col-md-4 top15" />
          </div>
          <p />
        </div>
      </div>
    );
  }
}

render(<RecordPage />, document.getElementById('react-mount'));
