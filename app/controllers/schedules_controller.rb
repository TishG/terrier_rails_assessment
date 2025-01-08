class SchedulesController < ApplicationController
  def index
    # Fetch all technicians and work orders for the day
    @technicians = Technician.all
    @work_orders = WorkOrder.where(start_time: Time.zone.now.beginning_of_day..Time.zone.now.end_of_day).includes(:technician, :location).order(:start_time)
    
    # Group work orders by technician
    @work_orders_by_technician = @technicians.each_with_object({}) do |technician, hash|
      hash[technician.id] = @work_orders.select { |wo| wo.technician_id == technician.id }
    end
  end
end
