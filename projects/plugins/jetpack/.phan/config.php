<?php
/**
 * This configuration will be read and overlaid on top of the
 * default configuration. Command-line arguments will be applied
 * after this file is read.
 *
 * @package automattic/jetpack
 */

// Require base config.
require __DIR__ . '/../../../../.phan/config.base.php';

$config = make_phan_config(
	dirname( __DIR__ ),
	array(
		'exclude_file_list' => array(
			// Mocks of core classes.
			'tests/php/_inc/lib/mocks/class-simplepie-file.php',
			'tests/php/_inc/lib/mocks/class-simplepie-item.php',
			'tests/php/_inc/lib/mocks/class-simplepie-locator.php',
			'tests/php/_inc/lib/mocks/class-simplepie.php',
		),
	)
);

// This file breaks analysis, Phan gets lost recursing in trying to figure out some types.
// @todo Add type declarations so Phan won't have to do it itself. Or update to a modern less lib.
$config['exclude_analysis_directory_list'][] = './modules/custom-css/custom-css/preprocessors/lessc.inc.php';

return $config;