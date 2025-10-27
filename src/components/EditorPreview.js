import React from 'react';

/**
 * Static Gutenberg editor preview for the Atera Compact Calculator block.
 * This replicates the frontend layout without functional interactivity.
 */
export default function EditorPreview({
	heading,
	slidersMainTitle,
	sliderTitles = [],
	saveLabel,
	description,
	buttonText,
	averageText,
	ateraLabel,
	providerLabel,
	noteText,
}) {
	return (
		<div className="atera-calc-wrapper">
			<h2>{heading || 'Calculate how much you save with Atera'}</h2>

			<div className="atera-sliders-zone">
				<div className="atera-sliders">
					<h3>{slidersMainTitle || 'Adjust the scales below to see your savings:'}</h3>

					{[0, 1, 2].map((i) => (
						<div key={i} className="slider-group">
							<label>{sliderTitles[i] || `Slider ${i + 1}`}</label>
							<div className="atera-slider">
								<div
									className="atera-slider-fill"
									style={{ width: `${(i + 1) * 20}%` }}
								></div>
							</div>
							<div className="slider-marks">
								<span>0</span>
								<span>50%</span>
								<span>100%</span>
							</div>
						</div>
					))}
				</div>

				<div className="atera-results">
					<div className="top-zone">
						<span>{saveLabel || 'You save'}</span>
						<div className="atera-sum">$12,450</div>
						<p>{description || 'annually — estimated based on Atera’s Pro Plan'}</p>
						<a href="#" className="cta-btn">
							{buttonText || 'Start free trial'}
						</a>
					</div>

					<div className="bottom-zone">
						<p>{averageText || 'Average annual cost'}</p>
						<p>
							<span>{ateraLabel || 'Atera:'}</span> $5,000 <br />
							<span>{providerLabel || 'Current Provider:'}</span> $17,450
						</p>
					</div>

					<p className="note">{noteText || '*Prices are illustrative only'}</p>
				</div>
			</div>
		</div>
	);
}
