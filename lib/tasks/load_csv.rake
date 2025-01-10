namespace :csv do
  desc "Load data from a CSV file into the database"
  task import: :environment do
    require 'csv'

    csv_files = {
      locations: 'lib/csv/locations.csv',
      technicians: 'lib/csv/technicians.csv',
      work_orders: 'lib/csv/work_orders.csv'
    }

    csv_files.each do |model, file_path|
      klass = model.to_s.classify.constantize

      puts "Importing data for #{model}..."

      # Read and import data
      CSV.foreach(file_path, headers: true) do |row|
        attributes = row.to_hash.symbolize_keys

        # Ensure we only process valid columns
        valid_attributes = attributes.slice(*klass.column_names.map(&:to_sym))

        klass.find_or_initialize_by(id: attributes[:id]).update!(valid_attributes)
      end

      puts "Finished importing #{model}!"
    end
  end
end
