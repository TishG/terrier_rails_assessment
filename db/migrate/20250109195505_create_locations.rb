class CreateLocations < ActiveRecord::Migration[8.0]
  def change
    create_table :locations, id: false do |t|
      t.integer :id, primary_key: true
      t.string :name
      t.string :city

      t.timestamps
    end
  end
end
