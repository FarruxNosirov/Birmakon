import { CartItemResponse } from "@novomarkt/api/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../configureStore";
export interface ProductItemProps {
	[key: string]: any;
}
export interface CartItemProps {
	data: ProductItemProps;
	count: number;
}
export interface CartItemProps {
	data: ProductItemProps;
	count: number;
}

interface InitialState {
	[key: string]: CartItemResponse;
	// items: [];
}

let initialState: InitialState = {};

const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		addToCart: (state, { payload }: PayloadAction<CartItemResponse>) => {
			state[payload.product.id?.toString() || ""] = payload;
			return state;
		},
		removeFromCart: (state, action: PayloadAction<string>) => {
			let st = Object.keys(state).reduce((p, c) => {
				if (c === action.payload) {
					return p;
				}
				return { ...p, [c]: state[c] };
			}, {});
			return st;
		},
		clearCart: () => initialState,

		loadCart: (state, action: any) => {
			let obj = action.payload.reduce((previous: any, current: any) => {
				if (!previous) {
					return { [current.id]: current };
				}
				return { ...previous, [current.id]: current };
			}, {});
			return obj;
		},
	},
});

export const cartSelector = (state: RootState) => state.cart;

export const cartArraySelector = (state: RootState) =>
	Object.keys(state.cart).map((e) => {
		return state.cart[e];
	});

export const cartTotalSelector = (state: RootState) => {
	let keys = Object.keys(state.cart);
	let count = keys.length;
	let total = keys.reduce((prev, current) => {
		return prev + state.cart[current].price;
	}, 0);

	return { count, total };
};

export const { loadCart, addToCart } = cartSlice.actions;

export default cartSlice.reducer;
