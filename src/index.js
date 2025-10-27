import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';
import Edit from './edit';
import './style.scss';
import './editor.scss';

registerBlockType('atera/compact-calculator', {
	title: __('Atera Compact Calculator', 'atera'),
	icon: 'calculator',
	category: 'widgets',
	edit: Edit,
	save: () => null,
});
