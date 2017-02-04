# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170204164132) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "symptom_equivalents", force: :cascade do |t|
    t.string  "name",       null: false
    t.integer "symptom_id"
    t.index ["symptom_id"], name: "index_symptom_equivalents_on_symptom_id", using: :btree
  end

  create_table "symptoms", force: :cascade do |t|
    t.string   "name",       null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name"], name: "index_symptoms_on_name", unique: true, using: :btree
  end

end
