$(document).ready(function() {
	console.log('ready');
	$(".light-box").magnificPopup({ 
		type: 'image',
		removalDelay: 300,
		mainClass: 'mfp-with-fade',
		closeOnContentClick: true
	});
});