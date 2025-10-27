<?php
/**
 * Registers a custom REST API endpoint for calculator sliders.
 * Fetches JSON data from a local file.
 */

add_action( 'rest_api_init', function () {
    register_rest_route( 'atera/v1', '/sliders', [
        'methods'  => 'GET',
        'callback' => 'atera_get_sliders',
        'permission_callback' => '__return_true',
    ] );
});

/**
 * Fetch JSON data from a local file and return it.
 */
function atera_get_sliders() {
    // ✅ Correct path to the JSON file
    $json_path = plugin_dir_path( __DIR__ ) . 'includes/calc-sliders.json';

    if ( ! file_exists( $json_path ) ) {
        return new WP_Error( 'not_found', 'calc-sliders.json not found', [ 'status' => 404 ] );
    }

    $content = file_get_contents( $json_path );

    if ( empty( $content ) ) {
        return new WP_Error( 'empty_response', 'calc-sliders.json is empty', [ 'status' => 500 ] );
    }

    $data = json_decode( $content, true );

    if ( json_last_error() !== JSON_ERROR_NONE ) {
        return new WP_Error( 'json_error', 'Invalid JSON format', [ 'status' => 500 ] );
    }

    return rest_ensure_response( $data );
}
