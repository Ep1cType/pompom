import React, { useEffect } from 'react';
import { CharacterApi } from 'shared/api/character';
import axios from 'axios';

const Api = new CharacterApi();

export default function HomePage() {
	useEffect(() => {
		axios.post("http://localhost:3000/", {link: "https://api-os-takumi.mihoyo.com/common/gacha_record/api/getGachaLog?authkey_ver=1&sign_type=2&lang=ru&authkey=BlrThK98eqi%2fXOljyErRrGWoWOkn1f8eaS4YpjJaGWqo%2b2D22385W2%2by24BKvAwFo6%2f2JkWwypRl1uIwcP0WQu%2bcvFI1KuM8E24HjZsZkMNAEsJ9Y5GP2dXgIX4eKtRVQeTGKLdzZrq1cp4ebqzaNYNghxoG%2f1Y8jS8Ihw3RElf8aEy1au5T9KPrhStnpGikv14tV00iOI6iw%2f5Fg7wqQ9t2zvQat%2feItdomj6Bj9%2fe0ivRMBG29hs%2bi9D71KaB4hg042o3VpfxWVoSPi%2bGvgNXuDwbbzlSfH0A9o8E1q6MqGtSLOTJeQSz0aEhwovJpm2OtBxo4vuCmpeUXMKk6pQJUKRVxjd8L6lg0RaamKn2l0uwidpCKScHY4apmmKCcaUJqym08usct68D67h%2b%2f7UbufYtPQlqCsKXN4Dx5oZv8lWc3kv5qcjLm%2bGwdeUrItnNjuyauFFyqP0FiQn4s4spJXRwqe3WQ84SZ09QX9%2bpdtruKPeNQtKWJIpfeKdudxKTJaCpBySc1RPbuE%2bKtQsjOKumraLDnJJm4Zmty3H9WwRYyltBEuJ%2fd0o%2bas%2fXbmWbZxAkklFQF4HK6q5XHLgF0yxaBOsAscxUh4HAy1c6Py6zsXrQ%2fTNWoIBo6C%2fGGgPpcbFLKIoiFiAxsDvn9%2bDShyCRPjUODJDFTetY0wwA%3d&game_biz=hkrpg_global&gacha_type=1&page=1&end_id=0&size=20"})
			.then((res) => console.log(res))
	}, [])

	return (
		<div className="container mx-auto px-4">
			<h1>Welcome</h1>
		</div>
	);
}
