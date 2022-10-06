import { ContextualUpgradeTrigger, ThemeProvider } from '@automattic/jetpack-components';
import { createInterpolateElement } from '@wordpress/element';
import { __, sprintf } from '@wordpress/i18n';
import React from 'react';
import DonutMeterContainer from '../../donut-meter-container';

// import './plan-usage-section.scss';

// TODO: Replace local PlanSummary component with new component when ready.
const PlanUsageSection = props => {
	if ( ! props.isVisible ) {
		return null;
	}
	// TODO: Add logic for plan limits.
	const upgradeMessage = undefined;
	return (
		<div className="jp-search-dashboard-wrap jp-search-dashboard-meter-wrap">
			<div className="jp-search-dashboard-row">
				<div className="lg-col-span-2 md-col-span-1 sm-col-span-0"></div>
				<div className="jp-search-dashboard-meter-wrap__content lg-col-span-8 md-col-span-6 sm-col-span-4">
					<PlanSummary />
					<UsageMeters />
					<CUTWrapper type={ upgradeMessage } />
					<AboutPlanLimits />
				</div>
				<div className="lg-col-span-2 md-col-span-1 sm-col-span-0"></div>
			</div>
		</div>
	);
};

const PlanSummary = () => {
	return (
		<h2>
			{ createInterpolateElement(
				sprintf(
					// translators: %1$s: usage period, %2$s: plan name
					__( 'Your usage <s>%1$s (%2$s)</s>', 'jetpack-search-pkg' ),
					'Sep 28-Oct 28',
					__( 'Free plan', 'jetpack-search-pkg' )
				),
				{
					s: <span />,
				}
			) }
		</h2>
	);
};

const getCUTMessages = () => {
	const CUTMessages = {
		records: {
			description: __(
				"You’re close to exceeding this plan's number of records.",
				'jetpack-search-pkg'
			),
			cta: __(
				'Upgrade now to increase your monthly records limit and to avoid interruption!',
				'jetpack-search-pkg'
			),
		},
		requests: {
			description: __(
				"You’re close to exceeding this plan's number of requests.",
				'jetpack-search-pkg'
			),
			cta: __(
				'Upgrade now to increase your monthly requests limit and to avoid interruption!',
				'jetpack-search-pkg'
			),
		},
		both: {
			description: __(
				'You’re close to exceeding the number of records and search requests available in the free plan.',
				'jetpack-search-pkg'
			),
			cta: __(
				'Upgrade now to increase your limits and to avoid interruption!',
				'jetpack-search-pkg'
			),
		},
	};
	return CUTMessages;
};

const CUTWrapper = props => {
	// TODO: Replace this callback with prop.
	const callbackForwarder = event => {
		event.preventDefault();
		// callback();
		// eslint-disable-next-line no-console
		console.log( 'CUT clicked...' );
	};
	const messages = props.type && getCUTMessages()[ props.type ];
	const trigger = messages && { ...messages, onClick: callbackForwarder };
	return (
		<>
			{ trigger && (
				<ThemeProvider>
					<ContextualUpgradeTrigger { ...trigger } />
				</ThemeProvider>
			) }
		</>
	);
};

const UsageMeters = () => {
	return (
		<div className="usage-meter-group">
			<DonutMeterContainer
				title={ __( 'Site records', 'jetpack-search-pkg' ) }
				current={ 1250 }
				limit={ 5000 }
			/>
			<DonutMeterContainer
				title={ __( 'Search requests', 'jetpack-search-pkg' ) }
				current={ 125 }
				limit={ 500 }
			/>
		</div>
	);
};

const AboutPlanLimits = () => {
	return (
		<div className="usage-meter-about">
			{ createInterpolateElement(
				__( 'Tell me more about <u>record indexing and request limits</u>.', 'jetpack-search-pkg' ),
				{
					u: <u />,
				}
			) }
		</div>
	);
};

export default PlanUsageSection;
