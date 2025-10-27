import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl } from '@wordpress/components';

import EditorPreview from './components/EditorPreview';
import './editor.scss';

export default function Edit({ attributes, setAttributes }) {
	// Destructure attributes safely
	const {
		heading,
		slidersMainTitle,
		sliderTitles = [],
		saveLabel,
		description,
		buttonText,
		averageText,
		ateraLabel,
		providerLabel,
		noteText = ''
	} = attributes;

	// Update single slider title by index
	const updateSliderTitle = (index, value) => {
		const newTitles = Array.isArray(sliderTitles) ? [...sliderTitles] : [];
		newTitles[index] = value;
		setAttributes({ sliderTitles: newTitles });
	};

	return (
		<>
			<InspectorControls>
				{/* General Section */}
				<PanelBody title={__('General Text Settings', 'atera')} initialOpen={true}>
					<TextControl
						label="Section Heading"
						value={heading}
						onChange={(val) => setAttributes({ heading: val })}
					/>
				</PanelBody>

				{/* Sliders Section */}
				<PanelBody title={__('Slider Titles', 'atera')} initialOpen={false}>
					<TextControl
						label="Sliders Main Title"
						value={slidersMainTitle}
						onChange={(val) => setAttributes({ slidersMainTitle: val })}
					/>
					{[0, 1, 2].map((i) => (
						<TextControl
							key={i}
							label={`Slider ${i + 1} Title`}
							value={sliderTitles[i] || ''}
							onChange={(val) => updateSliderTitle(i, val)}
						/>
					))}
				</PanelBody>

				{/* Results Section */}
				<PanelBody title={__('Results Calculator Settings', 'atera')} initialOpen={false}>
					<TextControl label="Save Label" value={saveLabel} onChange={(val) => setAttributes({ saveLabel: val })} />
					<TextControl label="Description" value={description} onChange={(val) => setAttributes({ description: val })} />
					<TextControl label="Button Text" value={buttonText} onChange={(val) => setAttributes({ buttonText: val })} />
					<TextControl label="Average Text" value={averageText} onChange={(val) => setAttributes({ averageText: val })} />
					<TextControl label="Atera Label" value={ateraLabel} onChange={(val) => setAttributes({ ateraLabel: val })} />
					<TextControl label="Provider Label" value={providerLabel} onChange={(val) => setAttributes({ providerLabel: val })} />
					<TextControl label="Note Text" value={noteText} onChange={(val) => setAttributes({ noteText: val })} />
				</PanelBody>
			</InspectorControls>

			{/* Gutenberg visual preview */}
            <div {...useBlockProps()}>
                <EditorPreview
                    heading={heading}
                    slidersMainTitle={slidersMainTitle}
                    sliderTitles={sliderTitles}
                    saveLabel={saveLabel}
                    description={description}
                    buttonText={buttonText}
                    averageText={averageText}
                    ateraLabel={ateraLabel}
                    providerLabel={providerLabel}
                    noteText={noteText}
                />
            </div>

		</>
	);
}
