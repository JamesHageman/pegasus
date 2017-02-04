import React from 'react';
import { render } from 'react-dom';
import Recording from './recording';

class RecordPage extends React.Component {
  constructor() {
    super();
    const recognition = new (window.SpeechRecognition || webkitSpeechRecognition || mozSpeechRecognition || msSpeechRecognition)();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 5;
    recognition.onresult = this.handleSpeechRecognitionResult.bind(this);
    recognition.onend = this.handleSpeechEnd.bind(this);

    this.recognition = recognition;
    this.state = {
      isRecording: false,
      records: []
    };
  }

  handleSpeechRecognitionResult(event) {
    console.log(event);
    this.setState({
      records: this.state.records.concat(event.results)
    });
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

  render() {
    return <div>
      { this.state.isRecording ?
          <div>
            <button
              className="btn btn-primary"
              onClick={this.stopRecording.bind(this)}
            >
              Stop
            </button>
          </div>
        :
          <div>
            <button
               className="btn btn-primary"
               onClick={this.startRecording.bind(this)}
            >
              Start
            </button>
          </div>
      }
      { this.state.records.length } recordings.
      <ol>
        { this.state.records.map((results, i) =>
          <Recording key={i} results={results} />
        ) }
      </ol>
    </div>
  }
}

render(<RecordPage />, document.getElementById('react-mount'))
