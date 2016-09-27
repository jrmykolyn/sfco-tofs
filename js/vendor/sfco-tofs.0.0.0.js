try {

	( function( window, document, $) {
		/* -------------------------------------------------- */
		/* DECLARE VARS */
		/* -------------------------------------------------- */
		var tofs_attr_base = 'data-tofs-';
		var tofs_item_attrs = [
			'title',
			'link'
		];


		/* -------------------------------------------------- */
		/* DECLARE FUNCTIONS */
		/* -------------------------------------------------- */
		/**
		 *
		 */
		function tofs() {
			// Initialize 'filesystem' object.
			var fs = {};

			// Query document for all elems. with necessary data attrs.
			var elems = document.querySelectorAll( '[data-tofs-category]' ) || [];

			// Look over `elems` to build `filesystem` object.
			elems.forEach( function( el, i, arr ) {
				var category = el.getAttribute( 'data-tofs-category' ) || null;

				// If the current elem. hasToFS `category` data:
				if ( category ) {

					// Add `category` to `fs` obj. if it does not already exist.
					if ( typeof fs[category] === 'undefined' ) {
						fs[category] = {
							name: category,
							items: []
						};
					}

					// Build object from data attributes;
					// Add resulting updates to current `category` `items` prop.
					fs[category].items.push( buildToFSItemObject( el ) );

				}
			} );

			// Start building'output' markup.
			var table = document.createElement( 'table' );
			var tbody = document.createElement( 'tbody' );

			// Add supplementary classes to outermost markup.
			table.classList = 'tofs-table';

			// Loop over `filesystem` object:
			for ( var key in fs ) {

				if ( fs.hasOwnProperty( key ) ) {
					// Create 'category row' elems.
					var cat_tr = document.createElement( 'tr' );
					var cat_td = document.createElement( 'td' );
					var cat_h2 = document.createElement( 'h2' );

					// Add supplementary classes to 'category row' elems.
					cat_tr.classList = 'tofs-table__row';
					cat_h2.classList = 'tofs-category-title';

					// Assemble 'category row':
					cat_h2.appendChild( document.createTextNode( toTitleCase( fs[key].name ) ) );
					cat_td.appendChild( cat_h2 );
					cat_tr.appendChild( cat_td );

					// TODO:
					// Add descriptive comment.
					if ( Array.isArray(fs[key].items) && fs[key].items.length ) {
						var items = fs[key].items,
							item,
							table_tr = document.createElement( 'tr' ),
							table_inner = document.createElement( 'table' ),
							tbody_inner = document.createElement( 'tbody' );

							table_tr.classList = 'tofs-table__row';
							table_inner.classList = 'tofs-table--inner';

						// TODO:
						// Add descriptive comment.
						for ( var i = 0, x = items.length; i < x; i++ ) {
							item = items[i];

							tbody_inner.appendChild( buildInnerTableRow( item ) );
						}

						table_inner.appendChild( tbody_inner );
						table_tr.appendChild( table_inner );
					}

					tbody.appendChild( cat_tr );
					tbody.appendChild( table_tr );
				}
			}

			// Complete markup assembly; blow away existing document HTML; insert markup into doc.
			table.appendChild( tbody );
			document.body.innerHTML = '';
			document.body.appendChild( table );			
		}


		/**
		 *
		 */
		function buildToFSItemObject( elem ) {
			var obj  = {};

			for ( var i = 0, x = tofs_item_attrs.length; i< x; i++ ) {
				var attr = tofs_item_attrs[i],
					compound_attr = tofs_attr_base + tofs_item_attrs[i],
					val = elem.getAttribute( compound_attr );

				if ( val !== 'undefined' && val !== null ) { obj[attr] = val; }
			}
			
			return obj;
		}


		/**
		 *
		 */
		function getToFSIcon() {
			try {

				if ( navigator.userAgent.indexOf( 'Macintosh' ) !== -1 ) {
					return '/icons/folder.gif';	
				}

				throw( new Error( 'Tripping error in order to trigger placeholder image.' ) );

			} catch ( err ) {
				return 'https://placeholdit.imgix.net/~text?txtsize=10&txt=DIR&w=16&h=16';
			}
		}


		/**
		 *
		 */
		function buildInnerTableRow( data ) {
			// Create row:
			var tr = document.createElement( 'tr' );

			tr.setAttribute( 'class', 'tofs-table--inner__row' );

			// Create 'image':
			var td_img = document.createElement( 'td' )
			var elem_img = document.createElement( 'img' );

			td_img.setAttribute( 'class', 'tofs-img');
			elem_img.setAttribute( 'src', getToFSIcon() );

			td_img.appendChild( elem_img );

			// Create 'title':
			var td_title = document.createElement( 'td' );
			var link_title = document.createElement( 'a' );

			td_title.setAttribute( 'class', 'tofs-title');
			link_title.setAttribute( 'href', data.link );

			link_title.appendChild( document.createTextNode( data.title ) );
			td_title.appendChild( link_title );

			// Create 'date':
			var td_date = document.createElement( 'td' );
			var span_date = document.createElement( 'span' );

			td_date.setAttribute( 'class', 'tofs-date');

			span_date.appendChild( document.createTextNode( new Date() ) );
			td_date.appendChild( span_date );

			// Create 'size':
			var td_size = document.createElement( 'td' );
			var span_size = document.createElement( 'span' );

			td_size.setAttribute( 'class', 'tofs-size');

			span_size.appendChild( document.createTextNode( '-') );
			td_size.appendChild( span_size );

			// Create 'desc':
			var td_desc = document.createElement( 'td' )
			var span_desc = document.createElement( 'span' );

			td_desc.setAttribute( 'class', 'tofs-desc');

			span_desc.appendChild( document.createTextNode( '') );
			td_desc.appendChild( span_desc );

			// Assemble markup:
			tr.appendChild( td_img );
			tr.appendChild( td_title );
			tr.appendChild( td_date );
			tr.appendChild( td_size );
			tr.appendChild( td_desc );

			return tr;
		}


		/**
		 *
		 */
		function toTitleCase( string ) {
			if ( typeof string === 'string' ) {
				return string.substring( 0, 1 ).toUpperCase() + string.substring( 1 );
			} else {
				return string;
			}
		}


		/* -------------------------------------------------- */
		/* PUBLIC API */
		/* -------------------------------------------------- */
		window.tofs = {
			init: tofs
		};
	} )( window, document, jQuery );

} catch ( err ) {

	console.log( 'FAILED TO LOAD "Short Future Co. - ToFS' );
	console.log( err );

}
