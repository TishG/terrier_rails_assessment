document.addEventListener('DOMContentLoaded', function () {
	// Define the base height for one hour (60px)
	const baseHeight = 70;

	// Loop through all work-order-blocks and adjust their height
	document.querySelectorAll('.work-order-block').forEach(function (block) {
		// Get duration in minutes
		const duration = parseInt(block.getAttribute('data-duration'), 10);
		// Get start time
		const startTime = block.getAttribute('data-time');

		if (duration) {
			// Calculate height
			const height = (duration / 60) * baseHeight;
			block.style.height = `${height > 70 ? height + 10 : height}px`;

			// Calculate the margin-top based on start time (minutes past the hour)
			// Extract hour and minutes
			const [hour, minutes] = startTime.split(':').map(Number);
			const marginTop = (minutes / 60) * baseHeight;
			block.style.marginTop = `${marginTop}px`;
		}
	});

	// Add event listeners to all empty time slots
	document.querySelectorAll('.time-slot.empty').forEach(function (slot) {
		slot.addEventListener('click', function () {
			// Get the hour and technician ID from the clicked slot
			var hour = this.getAttribute('data-hour');
			var technicianId = this.getAttribute('data-technician-id');

			// Access the work orders from the global JavaScript variable
			var workOrders = window.workOrdersByTechnician;

			// Find the previous and next work orders for the selected technician
			var technicianWorkOrders = workOrders[technicianId] || [];
			var previousWorkOrder = null;
			var nextWorkOrder = null;

			technicianWorkOrders.forEach(function (workOrder, index) {
				var workOrderTime = new Date(workOrder.time);

				if (
					workOrderTime.getHours() < hour &&
					(!previousWorkOrder || workOrder.time > previousWorkOrder.time)
				) {
					previousWorkOrder = workOrder;
				}
				if (
					workOrderTime.getHours() > hour &&
					(!nextWorkOrder || workOrder.time < nextWorkOrder.time)
				) {
					nextWorkOrder = workOrder;
				}
			});

			// Calculate the available time in minutes
			var availableTime = 0;
			if (previousWorkOrder && nextWorkOrder) {
				var previousEndTime = new Date(previousWorkOrder.time);
				previousEndTime.setMinutes(
					previousEndTime.getMinutes() + previousWorkOrder.duration
				);
				var nextStartTime = new Date(nextWorkOrder.time);
				availableTime = Math.max(0, (nextStartTime - previousEndTime) / 60000); // Difference in minutes
			}

			// Show the available time in a popup
			alert('Available time: ' + availableTime + ' minutes');
		});
	});
});
