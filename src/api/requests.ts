import { LoginState } from "@novomarkt/screens/auth/login/hooks";
import { RegisterState } from "@novomarkt/screens/auth/register/hooks";
import { store } from "@novomarkt/store/configureStore";
import { userLoggedOut } from "@novomarkt/store/slices/userSlice";
import axios, { AxiosResponse } from "axios";
import {
	BaseResponse,
	CardItem,
	CardTypeItem,
	CartItemResponse,
	DeliveryMethodResponse,
	LoginResponse,
	NewsItemResponse,
	OrderItemResponse,
	OrderSend,
	ProductItemResponse,
	QuestionsResponse,
	SendQuestionValue,
	SendReviewProps,
	SliderTypes,
} from "./types";

export let url = "https://admin.birmakon.uz/api";
export let assetUrl = "https://admin.birmakon.uz";

// const tokenBTC = "8b9841c071a863dc468fadd9d511c4e8f214fb7f";

axios.interceptors.request.use((config) => {
	let token = store.getState().user.token;
	console.log("token----", token);

	if (token) {
		config.headers = {
			...config.headers,
			Authorization: `Bearer ${token}`,
		};
	}
	return config;
});

axios.interceptors.response.use(
	(config) => {
		console.log(config.config.url);

		return config;
	},
	(error) => {
		if (error && error.response && error.response.status === 401) {
			//@ts-ignore
			store.dispatch(userLoggedOut());
		}
		return error;
	}
);

export const appendUrl = (str: string) => {
	return `${assetUrl}${str}`;
};

export const formData = (data: any): FormData => {
	let form = new FormData();
	for (let key in data) {
		form.append(key, data[key]);
	}
	return form;
};

let requests = {
	auth: {
		login: (credentials: LoginState) =>
			axios.post<LoginState, AxiosResponse<LoginResponse>>(
				`${url}/user/sign-in`,
				credentials
			),

		register: (credentials: RegisterState) =>
			axios.post<
				{ token: string; code: string },
				AxiosResponse<{
					data: { token: string; code: string };
				}>,
				RegisterState
			>(`${url}/user/sign-up`, credentials),
		verify: (credentials: { code: string; phone: string }, token: string) =>
			axios.post(`${url}/user/send-code`, credentials, {
				headers: { Authorization: `Bearer ${token}` },
			}),
		forgetPassword: (carcredentials: { phone: any }) =>
			axios.post(`${url}/user/recover-password`, carcredentials),
		resedSms: (code: any) =>
			axios.post<any>(`${url}/user/accept-recover-code`, code),
	},
	btc: {
		// getBTCRegions: () =>
		// 	axios.get(`https://api.bts.uz/index.php?r=directory/regions`, {
		// 		headers: { Authorization: `Bearer ${tokenBTC}` },
		// 	}),
		// getBTCCities: (id: any) =>
		// 	axios.get(
		// 		`https://api.bts.uz/index.php?r=directory/cities&regionId=${id}`,
		// 		configBTC
		// 	),
		// postCalculateBtc: (params: any) =>
		// 	axios.post(
		// 		"https://api.bts.uz/index.php?r=v1/order/calculate",
		// 		packageData(params),
		// 		configBTC
		// 	),
		// postSendBTC: (params: any) =>
		// 	axios.post(
		// 		`http://api.bts.uz:8080/index.php?r=v1/order/add`,
		// 		packageData(params),
		// 		configBTC
		// 	),
	},
	profile: {
		getProfile: () => axios.get<{ data: LoginResponse }>(`${url}/user/profile`),
		editProfile: (data: Partial<LoginResponse>) =>
			axios.post<any, any, FormData>(`${url}/user/update`, formData(data)),
		addCard: (creds: any) => axios.post(`${url}/card/send`, creds),
		codeCart: (data: any) => axios.post(`${url}/card/send-verify-code`, data),
		getCardTypes: () =>
			axios.get<{ data: CardTypeItem[] }>(`${url}/category?type=card`),
		getCards: () => axios.get<{ data: CardItem[] }>(`${url}/user/cards`),
		removeCard: (data: { card_id: number }) =>
			axios.post<{ data: CardItem[] }>(`${url}/user/card-remove`, data),
		getUploadPhoto: () =>
			axios.get<{ data: string }>(`${url}/user/upload-photo`),
		getTransaction: () => axios.get(`${url}/transaction`),
		removAcount: () => axios.post(`${url}/user/remove-account`),
	},
	categories: {
		getCategories: () => axios.get(`${url}/category?type=product`),
		getSubCategories: (id: number) =>
			axios.get(`${url}/category/sub-category?id=${id}`),
		getRegions: () => axios.get(`${url}/category?type=region`),
		getLogistSort: (params: any) => axios.get(`${url}/logist/sort`, { params }),
		storeAddresses: (shop_id?: number) =>
			axios.get(`${url}/category/addresses?shop_id=${shop_id}`),
	},

	brands: {
		getBrands: () => axios.get(`${url}/category?type=brand`),
		getAllBrands: () => axios.get(`${url}/brand`),
	},
	shops: {
		getShops: () => axios.get(`${url}/shop`),
	},
	frequentQuestions: {
		getQuestions: () =>
			axios.get<{ data: QuestionsResponse[] }>(`${url}/question`),
		sendQuestion: (creds: SendQuestionValue) =>
			axios.post(`${url}/feedback/send`, creds),
	},

	products: {
		getProducts: (sort?: string, skip?: number) =>
			axios.get<BaseResponse<ProductItemResponse>>(
				`${url}/product?sort=${sort ? sort : "popular"}&page=${skip}`
			),
		relatedProducts: (id: number) =>
			axios.get(`${url}/product/related-products?product_id=${id}`),

		getProductsWithID: (id: number, page?: number) =>
			axios.get<BaseResponse<ProductItemResponse>>(
				`${url}/product/by-category?id=${id}&page=${page ? page : 1}`
			),

		getProductWithShopID: (id: number, page?: number) =>
			axios.get<BaseResponse<ProductItemResponse>>(
				`${url}/product/by-shop?id=${id}&page=${page ? page : 1}`
			),
		getProductDetailID: (id: number) =>
			axios.get<BaseResponse<ProductItemResponse>>(
				`${url}/product/detail?id=${id}`
			),

		getProductsWithBrand: (id: number, page?: number) =>
			axios.get<BaseResponse<ProductItemResponse>>(
				`${url}/product/by-brand?id=${id}&page=${page ? page : 1}`
			),
		getProductPayment: () =>
			axios.get<BaseResponse<ProductItemResponse>>(
				`${url}/category?type=payment`
			),
		searchProducts: (query: string) =>
			axios.get<BaseResponse<ProductItemResponse>>(
				`${url}/product/search?query=${query}`
			),
		getCarts: () => axios.get<{ data: CartItemResponse[] }>(`${url}/cart`),

		addToCart: (creds: { product_id: number; amount: number }) =>
			axios.post(`${url}/cart/add`, creds),

		clearCart: () => axios.post(`${url}/cart/clear`),

		increaseItem: (creds: { product_id: number; amount: number }) =>
			axios.post(`${url}/cart/add`, creds),

		decreaseItem: (creds: { product_id: number }) =>
			axios.post(`${url}/cart/minus`, creds),

		removeItem: (creds: { product_id: number }) =>
			axios.post(`${url}/cart/remove`, creds),

		deliveryMethods: () =>
			axios.get<BaseResponse<DeliveryMethodResponse>>(`${url}/delivery`),

		getReviews: (product_id: number) =>
			axios.get(`${url}/product/reviews?product_id=${product_id}`),

		sendReview: (data: SendReviewProps) =>
			axios.post(`${url}/product/set-review`, data),

		colorItem: () => axios.get(`${url}/color`),
	},

	news: {
		getNews: () => axios.get<BaseResponse<NewsItemResponse>>(`${url}/news`),
		getNewsDetails: (id: number) =>
			axios.get<BaseResponse<NewsItemResponse>>(`${url}/news/detail?id=${id}`),
	},

	favorites: {
		addFavorite: (creds: { product_id: number }) =>
			axios.post(`${url}/product/set-favorite`, creds),

		getFavorites: () =>
			axios.get<BaseResponse<ProductItemResponse>>(`${url}/product/favorites`),
	},

	slider: {
		getSliders: () =>
			axios.get<BaseResponse<SliderTypes>>(`${url}/slider?type=mobile`),
	},

	sort: {
		getSort: (data: any) =>
			axios.get(`${url}/product?sort=${data.sort}&by-brand?id=${data.brand}`),
		getRecently: () => axios.get(`${url}/product?sort=recently`),
		getNewAdded: () => axios.get(`${url}/product?sort=new`),
		getExpensive: () => axios.get(`${url}/product?sort=price_up`),
		getCheap: () => axios.get(`${url}/product?sort=price_down`),
		getPopular: () => axios.get(`${url}/product?sort=popular`),
	},

	order: {
		sendOrder: (credentials: OrderSend) =>
			axios.post(`${url}/order/send`, credentials),
		getOrders: (params?: any) =>
			axios.get<BaseResponse<OrderItemResponse>>(`${url}/order`, { params }),
		octoSendOrder: (order_id: number) =>
			axios.post(`${url}/octo`, { order_id }),
		paymendId: (order_id: any) =>
			axios.post(`${url}/payment/pay`, { order_id }),
	},

	chat: {
		sendAdminMessege: (sendingMsg?: any, file?: any) =>
			axios.post(`${url}/chat/send`, {
				getter_id: 1,
				message: sendingMsg,
				file: file,
				product_id: "",
				type_user: "admin",
			}),
		sendUserMessege: (sendingMsg: any, file: any) =>
			axios.post(`${url}/chat/send`, {
				getter_id: 100,
				message: sendingMsg,
				file: file,
				product_id: 604,
				type_user: "user",
			}),
		sendShopMessege: (sendingMsg: any, file: any, id: any) =>
			axios.post(`${url}/chat/send`, {
				getter_id: 114,
				message: sendingMsg,
				file: file,
				product_id: id,
				type_user: "shop",
			}),
		shopGetProduct: () => axios.get(`${url}/chat/users?type_user=shop`),
	},
	filter: {
		catalogFilter: (id: number) =>
			axios.get(`${url}/category/filter?category_id=${id}`),
		productFilter: (
			filter: any,
			priceMin: any,
			priceMax: any,
			categoryId: any
		) =>
			axios.get(
				`${url}/product/by-filter?filter[${filter}]=${filter}&price_min=${priceMin}&price_max=${priceMax}&category_id=${categoryId} `
			),
		productFilter2: (categoryId: any, page?: number, newQuery?: any) =>
			axios.get<BaseResponse<ProductItemResponse>>(
				`${url}/product/by-filter?category_id=${categoryId}&page=${page}${newQuery}`
			),
	},
	chek: {
		createCheck: (order_id: number) =>
			axios.post(`${url}/order/set-receipt`, order_id),
		payaCheck: (order_receipt_id?: number, card_id?: number) =>
			axios.post(`${url}/order/pay-receipt`, { order_receipt_id, card_id }),
	},
};
export default requests;
