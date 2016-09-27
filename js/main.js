$( document ).ready( function() {

	// DECLARE VARS
	var btn = document.getElementById( 'tofs' );

	// EVENTS
	btn.addEventListener( 'click', tofs.init );

	window.addEventListener( 'TOFS_COMPLETE', function( e ) {
		console.log( '`TOFS_COMPLETE` event fired!' );
	} );

} );