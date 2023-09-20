import requests from "@novomarkt/api/requests";
import { useIsFocused } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";

const MyPaymentsHooks = () => {
	const [payments, setPayments] = useState<any>([]);
	const [state, setState] = useState();
	const isFucsed = useIsFocused();
	const transaction = async () => {
		try {
			let res = await requests.profile.getTransaction();
			setState(res.data.data);
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		transaction();
	}, []);

	const getPayments = useCallback(async () => {
		try {
			let res = await requests.products.getProductPayment();
			setPayments(res.data.data);
		} catch (error) {
			console.log(error);
		}
	}, []);

	useEffect(() => {
		isFucsed ? getPayments() : null;
	}, [getPayments, isFucsed]);

	console.log("payments", JSON.stringify(payments, null, 2));

	return {
		payments,
		state,
	};
};

export default MyPaymentsHooks;
