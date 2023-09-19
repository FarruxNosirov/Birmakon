import requests from "@novomarkt/api/requests";
import { ProductItemResponse } from "@novomarkt/api/types";

import { useEffect, useState, useCallback } from "react";

export const useSearchHook = () => {
	let [result, setResult] = useState<ProductItemResponse[]>([]);
	const [state, setState] = useState({
		text: "",
	});
	const [loading, setLoading] = useState(false);

	const searchWithQuery = useCallback(async () => {
		setLoading(true);
		try {
			let res = await requests.products.searchProducts(state.text);
			console.log(JSON.stringify(res.data, null, 2));
			setResult(res.data.data);
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	}, [state.text]);

	let onStateChange = (key: string) => (value: string) => {
		setState({ ...state, [key]: value });
	};

	useEffect(() => {
		searchWithQuery();
	}, [searchWithQuery]);

	return { result, onStateChange, loading };
};
