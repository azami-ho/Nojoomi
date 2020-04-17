(function($) {
	window.custom_animate_element = function ( $element ) {
		var animation_style            = $element.attr('data-animation-style');
		var animation_repeat           = $element.attr('data-animation-repeat');
		var animation_duration         = $element.attr('data-animation-duration');
		var animation_delay            = $element.attr('data-animation-delay');
		var animation_intensity        = $element.attr('data-animation-intensity');
		var animation_starting_opacity = $element.attr('data-animation-starting-opacity');
		var animation_speed_curve      = $element.attr('data-animation-speed-curve');

		// Remove all the animation data attributes once the variables have been set
		custom_remove_animation_data( $element );

		// Opacity can be 0 to 1 so the starting opacity is equal to the percentage number multiplied by 0.01
		var starting_opacity = isNaN( parseInt( animation_starting_opacity ) ) ? 0 : parseInt( animation_starting_opacity ) * 0.01;

		// Check if the animation speed curve is one of the allowed ones and set it to the default one if it is not
		if ( $.inArray( animation_speed_curve, ['linear', 'ease', 'ease-in', 'ease-out', 'ease-in-out'] ) === -1 ) {
			animation_speed_curve = 'ease-in-out';
		}

		$element.css({
			'animation-duration'        : animation_duration,
			'animation-delay'           : animation_delay,
			'opacity'                   : starting_opacity,
			'animation-timing-function' : animation_speed_curve
		});

		var intensity_css        = {};
		var intensity_percentage = isNaN( parseInt( animation_intensity ) ) ? 50 : parseInt( animation_intensity );

		// All the animations that can have intensity
		var intensity_animations = ['slide', 'zoom', 'flip', 'fold', 'roll'];

		var original_animation   = false;
		var original_direction   = false;

		// Check if current animation can have intensity
		for ( var i = 0; i < intensity_animations.length; i++ ) {
			var animation = intensity_animations[i];

			// As the animation style is a combination of type and direction check if
			// the current animation contains any of the allowed animation types
			if ( ! animation_style || animation_style.substr( 0, animation.length ) !== animation ) {
				continue;
			}

			// If it does set the original animation to the base animation type
			var original_animation = animation;

			// Get the remainder of the animation style and set it as the direction
			var original_direction = animation_style.substr( animation.length, animation_style.length );

			// If that is not empty convert it to lower case for better readability's sake
			if ( '' !== original_direction ) {
				original_direction = original_direction.toLowerCase();
			}

			break;
		}

		if ( original_animation !== false && original_direction !== false ) {
			intensity_css = custom_process_animation_intensity( original_animation, original_direction, intensity_percentage );
		}

		if ( ! $.isEmptyObject( intensity_css ) ) {
			$element.css( intensity_css );
		}

		$element.addClass( 'et_animated' );
		$element.addClass( animation_style );
		$element.addClass( animation_repeat );

		// Remove the animation after it completes if it is not an infinite one
		if ( ! animation_repeat ) {
			var animation_duration_ms = parseInt( animation_duration );
			var animation_delay_ms = parseInt( animation_delay );

			setTimeout( function() {
				custom_remove_animation( $element );
			}, animation_duration_ms + animation_delay_ms );
		}
	}

	window.custom_process_animation_data = function( waypoints_enabled ) {
		if ( 'undefined' !== typeof et_animation_data && et_animation_data.length > 0 ) {
			$('body').css('overflow-x', 'hidden');
			$('#page-container').css('overflow-y', 'hidden');

			for ( var i = 0; i < et_animation_data.length; i++ ) {
				var animation_entry = et_animation_data[i];

				if (
					! animation_entry.class ||
					! animation_entry.style ||
					! animation_entry.repeat ||
					! animation_entry.duration ||
					! animation_entry.delay ||
					! animation_entry.intensity ||
					! animation_entry.starting_opacity ||
					! animation_entry.speed_curve
				) {
					continue;
				}

				var $animated = $('.' + animation_entry.class);

				$animated.attr({
					'data-animation-style'           : animation_entry.style,
					'data-animation-repeat'          : 'once' === animation_entry.repeat ? '' : 'infinite',
					'data-animation-duration'        : animation_entry.duration,
					'data-animation-delay'           : animation_entry.delay,
					'data-animation-intensity'       : animation_entry.intensity,
					'data-animation-starting-opacity': animation_entry.starting_opacity,
					'data-animation-speed-curve'     : animation_entry.speed_curve
				});
			}
		}
	}

	window.custom_process_animation_intensity = function( animation, direction, intensity ) {
		var intensity_css = {};

		switch( animation ) {
			case 'slide':
				switch( direction ) {
					case 'top':
						var percentage = intensity * -2;

						intensity_css = {
							transform: 'translate3d(0, ' + percentage + '%, 0)'
						};

						break;

					case 'right':
						var percentage = intensity * 2;

						intensity_css = {
							transform: 'translate3d(' + percentage + '%, 0, 0)'
						};

						break;

					case 'bottom':
						var percentage = intensity * 2;

						intensity_css = {
							transform: 'translate3d(0, ' + percentage + '%, 0)'
						};

						break;

					case 'left':
						var percentage = intensity * -2;

						intensity_css = {
							transform: 'translate3d(' + percentage + '%, 0, 0)'
						};

						break;

					default:
						var scale = ( 100 - intensity ) * 0.01;

						intensity_css = {
							transform: 'scale3d(' + scale + ', ' + scale + ', ' + scale + ')'
						};
						break;
				}
				break;

			case 'zoom':
				var scale = ( 100 - intensity ) * 0.01;

				switch( direction ) {
					case 'top':
						intensity_css = {
							transform: 'scale3d(' + scale + ', ' + scale + ', ' + scale + ')'
						};

						break;

					case 'right':
						intensity_css = {
							transform: 'scale3d(' + scale + ', ' + scale + ', ' + scale + ')'
						};

						break;

					case 'bottom':
						intensity_css = {
							transform: 'scale3d(' + scale + ', ' + scale + ', ' + scale + ')'
						};

						break;

					case 'left':
						intensity_css = {
							transform: 'scale3d(' + scale + ', ' + scale + ', ' + scale + ')'
						};

						break;

					default:
						intensity_css = {
							transform: 'scale3d(' + scale + ', ' + scale + ', ' + scale + ')'
						};
						break;
				}

				break;

			case 'flip':
				switch ( direction ) {
					case 'right':
						var degree = Math.ceil( ( 90 / 100 ) * intensity );

						intensity_css = {
						  transform: 'perspective(2000px) rotateY(' + degree+ 'deg)'
						};
						break;

					case 'left':
						var degree = Math.ceil( ( 90 / 100 ) * intensity ) * -1;

						intensity_css = {
						  transform: 'perspective(2000px) rotateY(' + degree+ 'deg)'
						};
						break;

					case 'top':
					default:
						var degree = Math.ceil( ( 90 / 100 ) * intensity );

						intensity_css = {
						  transform: 'perspective(2000px) rotateX(' + degree+ 'deg)'
						};
						break;

					case 'bottom':
						var degree = Math.ceil( ( 90 / 100 ) * intensity ) * -1;

						intensity_css = {
						  transform: 'perspective(2000px) rotateX(' + degree+ 'deg)'
						};
						break;
				}

				break;

			case 'fold':
				switch( direction ) {
					case 'top':
						var degree = Math.ceil( ( 90 / 100 ) * intensity ) * -1;

						intensity_css = {
						  transform: 'perspective(2000px) rotateX(' + degree + 'deg)'
						};

						break;
					case 'bottom':
						var degree = Math.ceil( ( 90 / 100 ) * intensity );

						intensity_css = {
						  transform: 'perspective(2000px) rotateX(' + degree + 'deg)'
						};

						break;

				 	case 'left':
						var degree = Math.ceil( ( 90 / 100 ) * intensity );

						intensity_css = {
						  transform: 'perspective(2000px) rotateY(' + degree + 'deg)'
						};

						break;
					case 'right':
					default:
						var degree = Math.ceil( ( 90 / 100 ) * intensity ) * -1;

						intensity_css = {
						  transform: 'perspective(2000px) rotateY(' + degree + 'deg)'
						};

						break;
				}

				break;

			case 'roll':
				switch( direction ) {
					case 'right':
					case 'bottom':
						var degree = Math.ceil( ( 360 / 100 ) * intensity ) * -1;

						intensity_css = {
							transform: 'rotateZ(' + degree + 'deg)'
						};

						break;
					case 'top':
					case 'left':
						var degree = Math.ceil( ( 360 / 100 ) * intensity );

						intensity_css = {
							transform: 'rotateZ(' + degree + 'deg)'
						}

						break;
					default:
						var degree = Math.ceil( ( 360 / 100 ) * intensity );

						intensity_css = {
							transform: 'rotateZ(' + degree + 'deg)'
						};

						break;
				}

				break;
		}

		return intensity_css;
	}

	window.custom_has_animation_data = function ( $element ) {
		var has_animation = false;

		if ( 'undefined' !== typeof et_animation_data && et_animation_data.length > 0 ) {
			for ( var i = 0; i < et_animation_data.length; i++ ) {
				var animation_entry = et_animation_data[i];

				if ( ! animation_entry.class ) {
					continue;
				}

				if ( $element.hasClass( animation_entry.class ) ) {
					has_animation = true;
					break;
				}
			}
		}

		return has_animation;
	}

	window.custom_get_animation_classes = function() {
		return [
			'et_animated', 'infinite', 'et-waypoint',
			'fade', 'fadeTop', 'fadeRight', 'fadeBottom', 'fadeLeft',
			'slide', 'slideTop', 'slideRight', 'slideBottom', 'slideLeft',
			'bounce', 'bounceTop', 'bounceRight', 'bounceBottom', 'bounceLeft',
			'zoom', 'zoomTop', 'zoomRight', 'zoomBottom', 'zoomLeft',
			'flip', 'flipTop', 'flipRight', 'flipBottom', 'flipLeft',
			'fold', 'foldTop', 'foldRight', 'foldBottom', 'foldLeft',
			'roll', 'rollTop', 'rollRight', 'rollBottom', 'rollLeft'
		];
	}

	window.custom_remove_animation = function( $element ) {
		var animation_classes = custom_get_animation_classes();

		$element.removeClass( animation_classes.join(' ') );
		$element.css({
			'animation-delay'           : '',
			'animation-duration'        : '',
			'animation-timing-function' : '',
			'opacity'                   : '',
			'transform'                 : ''
		});
	}

	window.custom_remove_animation_data = function( $element ) {
		var attr_name;
		var data_attrs_to_remove = [];
		var data_attrs           = $element.get(0).attributes;

		for ( var i = 0; i < data_attrs.length; i++ ) {
			if ( 'data-animation-' === data_attrs[i].name.substring( 0, 15 ) ) {
				data_attrs_to_remove.push( data_attrs[i].name );
			}
		}

		$.each( data_attrs_to_remove, function( index, attr_name ) {
			$element.removeAttr( attr_name );
		} );
	};
})(jQuery);