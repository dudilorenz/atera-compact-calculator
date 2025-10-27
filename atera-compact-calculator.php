<?php
/**
 * Plugin Name: Atera Compact Calculator
 * Description: Gutenberg block calculator for estimating annual cost savings with Atera.
 * Version: 1.0.0
 * Author: Dudi Lorenz
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Prevent direct access
}

/**
 * Include REST API file
 */

add_action('plugins_loaded', function() {
    require_once plugin_dir_path(__FILE__) . 'includes/rest-api.php';
});


/**
 * Register the Gutenberg block with a render callback.
 * The callback returns a <div> placeholder so frontend.js can attach React here.
 */
add_action('init', function() {
    register_block_type(
        plugin_dir_path(__FILE__) . 'build',
        [
            'render_callback' => 'atera_render_calculator_block'
        ]
    );
});

function atera_render_calculator_block($attributes) {
    //Default values
    $defaults = [
        'heading' => 'Calculate how much you save with Atera',
        'description' => 'annually — estimated based on Atera’s Pro Plan',
        'buttonText' => 'Start free trial',
        'saveLabel' => 'Your total save',
        'ateraLabel' => 'Atera:',
        'providerLabel' => 'Current Provider:',
        'averageText' => 'Average annual cost',
        'noteText' => '*Prices are illustrative only',
        'slidersMainTitle' => 'Adjust the scales below to see your savings:',
        'sliderTitles' => [
            'How many technicians are in your company?',
            'How many endpoints do you manage?',
            'How much are you charged per endpoint per month?'
        ]
    ];

    $attributes = wp_parse_args($attributes, $defaults);

    // Build a JSON object to inject as a data attribute
    $json = wp_json_encode($attributes, JSON_UNESCAPED_SLASHES);
    $data_json = esc_attr($json);

    return '<div class="wp-block-atera-compact-calculator" data-attributes="' . $data_json . '"></div>';
}


/**
 * Enqueue frontend React app and styles.
 */
add_action( 'enqueue_block_assets', function() {
	if ( ! is_admin() ) {

		// React app for frontend rendering
		wp_enqueue_script(
			'atera-calc-frontend',
			plugins_url( 'build/frontend.js', __FILE__ ),
			array( 'wp-element', 'wp-api-fetch' ),
			filemtime( plugin_dir_path( __FILE__ ) . 'build/frontend.js' ),
			true
		);

		// Frontend styles
		wp_enqueue_style(
			'atera-calc-style',
			plugins_url( 'build/style-index.css', __FILE__ ),
			array(),
			filemtime( plugin_dir_path( __FILE__ ) . 'build/style-index.css' )
		);
	}
});
