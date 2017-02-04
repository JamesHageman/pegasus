class CreateSymptoms < ActiveRecord::Migration[5.0]
  def change
    create_table :symptoms do |t|
      t.string :name, null: false
      t.timestamps

      t.index :name, unique: true
    end

    create_table :symptom_equivalents do |t|
      t.string :name, null: false

      t.belongs_to :symptom
    end
  end
end
