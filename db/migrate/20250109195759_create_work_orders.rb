class CreateWorkOrders < ActiveRecord::Migration[8.0]
  def change
    create_table :work_orders, id: false do |t|
      t.integer :id, primary_key: true
      t.integer :technician_id
      t.integer :location_id
      t.time :time
      t.integer :duration
      t.integer :price

      t.timestamps
    end
  end
end
