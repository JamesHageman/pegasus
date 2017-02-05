# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Symptom.all.each do |s|
  s.destroy!
end

Symptom.create_with_equivalents("pain", ["painful"])
Symptom.create_with_equivalents("fatigue", ["fatigued"])
Symptom.create_with_equivalents("infection", ["infected"])
Symptom.create_with_equivalents("itch", ["itchy"])
Symptom.create_with_equivalents("headache", ["headaches", "head hurts"])
Symptom.create_with_equivalents("insomnia", ["can't sleep"])
Symptom.create_with_equivalents("fever", ["fevers"])
Symptom.create_with_equivalents("weight loss", ["lost weight"])
Symptom.create_with_equivalents("weight gain", ["gained weight", "put on weight"])
Symptom.create_with_equivalents("swelling")
Symptom.create_with_equivalents("hot")
Symptom.create_with_equivalents("cold")
Symptom.create_with_equivalents("stress")
Symptom.create_with_equivalents("breathing")
Symptom.create_with_equivalents("nausea", ["sick"])
Symptom.create_with_equivalents("rash")
Symptom.create_with_equivalents("vomit", ["puke"])
Symptom.create_with_equivalents("anxiety", ["anxious"])
Symptom.create_with_equivalents("diarrhrea")
Symptom.create_with_equivalents("irritable")
Symptom.create_with_equivalents("allergy")
Symptom.create_with_equivalents("depression")
Symptom.create_with_equivalents("sad")
Symptom.create_with_equivalents("cough")
Symptom.create_with_equivalents("confusion", ["confused"])
Symptom.create_with_equivalents("inflammation")
Symptom.create_with_equivalents("dizzy", ["dizziness"])
Symptom.create_with_equivalents("bleeding")
Symptom.create_with_equivalents("constipation", ["constipated", "s***", "can't poop"])
Symptom.create_with_equivalents("heartburn")
Symptom.create_with_equivalents("tremor")
Symptom.create_with_equivalents("vision")
Symptom.create_with_equivalents("indigestion")
Symptom.create_with_equivalents("cramp")
Symptom.create_with_equivalents("bloating")
