class SchedulesController < ApplicationController
  def index
    # Fetch all technicians and work orders for the day
    @technicians = Technician.all
    @work_orders = WorkOrder.includes(:location).all
    
    # Group work orders by technician
    @work_orders_by_technician = @technicians.each_with_object({}) do |technician, hash|
      hash[technician.id] = @work_orders.where(technician_id: technician.id)
    end
  end
end
