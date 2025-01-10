class CreateTechnicians < ActiveRecord::Migration[8.0]
  def change
    create_table :technicians, id: false do |t|
      t.integer :id, primary_key: true
      t.string :name

      t.timestamps
    end
  end
end
