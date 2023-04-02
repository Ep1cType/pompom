import React from 'react';

export const AuthModal = () => {
	return (
		<>
			<input type="checkbox" id="auth-modal" className="modal-toggle" />
			<label htmlFor="auth-modal" className="modal cursor-pointer">
				<label className="modal-box relative" htmlFor="">
					<h3 className="text-lg font-bold">Congratulations random Internet user!</h3>
					<p className="py-4">You have been selected for a chance to get one year of subscription to use Wikipedia for free!</p>
				</label>
			</label>
		</>
	);
};
