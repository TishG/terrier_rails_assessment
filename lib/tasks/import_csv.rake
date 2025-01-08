namespace :import do
    desc "Import technicians, locations, and work orders from CSV files"
    task :csv => :environment do
      # Import Technicians
      if Technician.count == 0
        puts "Importing technicians..."
        CSV.foreach('lib/csv/technicians.csv', headers: true) do |row|
          Technician.create!(name: row['name'])
        end
      else
        puts "Technicians already imported"
      end
  
      # Import Locations
      if Location.count == 0
        puts "Importing locations..."
        CSV.foreach('lib/csv/locations.csv', headers: true) do |row|
          Location.create!(name: row['name'], city: row['city'])
        end
      else
        puts "Locations already imported"
      end
  
      # Import Work Orders
      if WorkOrder.count == 0
        puts "Importing work orders..."
        CSV.foreach('lib/csv/work_orders.csv', headers: true) do |row|
          technician = Technician.find_by(name: row['technician_name'])
          location = Location.find_by(name: row['location_name'])
          WorkOrder.create!(technician: technician, location: location, start_time: row['start_time'], duration_minutes: row['duration_minutes'], price: row['price'])
        end
      else
        puts "Work orders already imported"
      end
    end
  end
  