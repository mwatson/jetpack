<?php
/**
 * Template functions.
 *
 * @package automattic/jetpack-mu-wpcom
 */

namespace Automattic\Jetpack\Jetpack_Mu_Wpcom\A8C_Posts_List;

/**
 * OUTPUT BUFFERED LOAD TEMPLATE PART.
 *
 * Loads a given template using output buffering.
 * Optionally including $data to be passed into template.
 *
 * @param string $template_name Name of the template to be located.
 * @param array  $data          Optional. Associative array of data to be passed into the template. Default empty array.
 * @return string
 */
function render_template( $template_name, $data = array() ) {
	if ( ! strpos( $template_name, '.php' ) ) {
		$template_name .= '.php';
	}

	$template_file = __DIR__ . '/templates/' . $template_name;

	if ( ! file_exists( $template_file ) ) {
		return '';
	}

	// Optionally provided an assoc array of data to pass to template
	// and it will be extracted into variables.
	if ( is_array( $data ) ) {
		foreach ( $data as $name => $value ) {
			$GLOBALS[ $name ] = $value;
		}
	}

	ob_start();
	require_once $template_file;
	$content = ob_get_contents();
	ob_end_clean();

	return $content;
}
