import PricingSection from '@/components/PricingSection'
import Scenarios from '@/components/Scenarios'
import ThankYouPopup from '@/components/ThankyouPopUp'
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { getSubscriptionByUserId } from '../api/actions'

export default async function Dashboard() {
	const user = await currentUser()

	if (!user.id) {
		redirect('/sign-in')
	}

	const sub = await getSubscriptionByUserId(user.id)
	const isInactive = sub ? sub?.sub_status !== 'active' : true

	if (isInactive) {
		redirect('/processing-page')
	}

	return (
		<div>
			{isInactive ? (
				<PricingSection />
			) : (
				<div>
					<Scenarios />
					<ThankYouPopup />
				</div>
			)}
		</div>
	)
}
