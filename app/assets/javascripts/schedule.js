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
			alert(
				`How much time is available between the previous and next work orders goes here.`
			);
		});
	});
});
