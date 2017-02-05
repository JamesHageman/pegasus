class AppointmentsController < ApplicationController
  def record
  end

  def sandbox
  end

  def symptoms_grammar
    @symptoms = Symptom.all
    render :symptoms_grammar, layout: false, content_type: Mime::Text
  end

  def classify
    text = params.require(:text)
    classifier = Symptom.create_classifier
    result = classifier.classify(text)

    render json: {
      text: text,
      classification: result
    }
  end
end
