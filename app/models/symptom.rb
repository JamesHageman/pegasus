class Symptom < ApplicationRecord
  has_many :symptom_equivalents

  def self.create_with_equivalents(name, others = [])
    symptom = Symptom.create!(name: name)

    others.each do |equiv|
      symptom.symptom_equivalents.create(name: equiv)
    end
  end

  def self.create_classifier
    classifier = ClassifierReborn::Bayes.new(
      auto_categorize: true
    )

    Symptom.all.includes(:symptom_equivalents).each do |sym|
      classification = "#{sym.name}"
      sym.names.each do |name|
        puts "training: #{classification}: #{name}"
        classifier.train classification, name
      end
    end

    classifier.train "Unknown", "unknown"

    classifier
  end

  def grammar_name
    "<#{ name }>".html_safe
  end

  def names
    [name].concat(symptom_equivalents.map { |eq| eq.name })
  end
end
