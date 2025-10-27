import apiFetch from '@wordpress/api-fetch';
import { render, useState, useEffect } from '@wordpress/element';

/**
 * Main React component for the Atera Compact Calculator.
 * Handles slider state, calculation logic, and dynamic rendering.
 */
const AteraCalculator = ({
	heading = "Calculate how much you save with Atera",
	buttonText = "Start free trial",
	saveLabel = "Your total save",
	ateraLabel = "Atera:",
	providerLabel = "Current Provider:",
	noteText = "*Prices are illustrative only",
	averageCostTitle = "Average Cost Title ",
	slidersMainTitle = "Sliders Main Title",
	sliderTitles = []
}) => {
	const [sliders, setSliders] = useState([]);
	const [values, setValues] = useState({});
	const [results, setResults] = useState({ atera: 0, provider: 0, save: 0 });

	/**
	 * Fetch slider configuration from the custom REST API endpoint.
	 */
	useEffect(() => {
		apiFetch({ path: '/atera/v1/sliders' }).then((data) => {
			setSliders(data.sliders || []);

			// Initialize default values from JSON config
			const defaults = {};
			data.sliders.forEach((s, i) => (defaults[i] = s.default));
			setValues(defaults);

			// Apply gradient styling for visual progress effect
			setTimeout(() => {
				document.querySelectorAll('.atera-slider').forEach((input) => {
					const val = input.value;
					const min = input.min || 0;
					const max = input.max || 100;
					const percent = ((val - min) * 100) / (max - min);
					input.style.background = `linear-gradient(to right, #D1AD78 ${percent}%, #e1e1e1 ${percent}%)`;
				});
			}, 300);
		});
	}, []);

	/**
	 * Recalculate the results whenever a slider value changes.
	 */
	useEffect(() => {
		if (!sliders.length) return;
		const [t, e, p] = Object.values(values);
		const atera = t * e;
		const provider = e * p * 12;
		const save = provider - atera;
		setResults({ atera, provider, save });
	}, [values]);

	/**
	 * Handle slider change and dynamically update the gradient fill.
	 */
	const handleChange = (index, value, e) => {
		setValues({ ...values, [index]: parseFloat(value) });

		// Update slider fill color for visual feedback
		const input = e?.target;
		if (input) {
			const min = input.min || 0;
			const max = input.max || 100;
			const percent = ((value - min) * 100) / (max - min);
			input.style.background = `linear-gradient(to right, #D1AD78 ${percent}%, #e1e1e1 ${percent}%)`;
		}
	};

	return (
		<div className="atera-calc-wrapper">
			<h2>{heading}</h2>
			<div className="atera-sliders-zone">
				<div className="atera-sliders">
					<h3>{slidersMainTitle}</h3>
					{sliders.map((s, i) => (
						<div key={i} className="slider-group">
							{/* Slider label — editable from the block settings */}
							<label>{sliderTitles[i] || s.label || `Slider ${i + 1}`}</label>

							{/* Range input */}
							<input
								type="range"
								min={s.min}
								max={s.max}
								step={s.step}
								value={values[i] || s.default}
								onChange={(e) => handleChange(i, e.target.value, e)}
								className="atera-slider"
							/>

							{/* Marks below slider */}
							<div className="slider-marks">
								{s.marks?.map((mark, j) => (
									<span key={j}>
										{s.prefix ? `${s.prefix}${mark}` : mark}
									</span>
								))}
							</div>
						</div>
					))}
				</div>

				{/* Results section */}
				<div className="atera-results">
					<div className="top-zone">
						<span>{saveLabel}</span>
						<div className="atera-sum">${results.save.toLocaleString()}</div>
						<p>annually — estimated based on Atera’s Pro Plan</p>
						<a href="https://atera.com" className="cta-btn">{buttonText}</a>
					</div>

					<div className="bottom-zone">
						<p>{averageCostTitle}</p>
						<div className="atera-costs">
							<p><span>{ateraLabel}</span> ${results.atera.toLocaleString()}</p>
							<p><span>{providerLabel}</span> ${results.provider.toLocaleString()}</p>
						</div>
					</div>

					<p className="note">{noteText}</p>
				</div>
			</div>
		</div>
	);
};

/**
 * Initialize the React component for each calculator block on the page.
 * Pulls attributes from the PHP-rendered data-attributes field.
 */
document.addEventListener('DOMContentLoaded', () => { 
	const blocks = document.querySelectorAll('.wp-block-atera-compact-calculator');

	blocks.forEach((el) => {
		const raw = el.getAttribute('data-attributes');
		const data = raw ? JSON.parse(raw) : {};

		const blockData = {
			heading: data.heading || 'Calculate how much you save with Atera',
			description: data.description || 'description',
			buttonText: data.buttonText || 'Start free trial',
			averageText: data.averageText || 'Average Text',
			saveLabel: data.saveLabel || 'Your total save',
            averageCostTitle: data.averageCostTitle || 'Average annual cost',
			ateraLabel: data.ateraLabel || 'Atera:',
			providerLabel: data.providerLabel || 'Current Provider:',
			noteText: data.noteText || '*Prices are illustrative only',
			slidersMainTitle: data.slidersMainTitle || 'sliders Title',
			sliderTitles: data.sliderTitles || []
		};

		render(<AteraCalculator {...blockData} />, el);
	});
});

