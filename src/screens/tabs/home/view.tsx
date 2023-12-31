import SearchHeader from "@novomarkt/components/navigation/SearchHeader";
import { WINDOW_WIDTH } from "@novomarkt/constants/sizes";
import { STRINGS } from "@novomarkt/locales/strings";
import React from "react";
import { ScrollView, View } from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import CarouselItem from "./components/CarouselItem";
import NewsList from "./components/NewsList";
import ProductsList from "./components/ProductsList";
import RedItem from "./components/RedItem";
import BrandsList from "./components/brand/BrandsList";
import ShopsList from "./components/shops/ShopsList";
import { useHomeScreenHooks } from "./hooks";
import { styles } from "./style";

const HomeView = () => {
	let { setActiveSlide, activeSlide, slide } = useHomeScreenHooks();
	return (
		<View style={styles.topContainer}>
			<SearchHeader autoFocus={true} />
			<ScrollView style={styles.scroll}>
				<View style={styles.container}>
					<Carousel
						onSnapToItem={(index: any) => setActiveSlide(index)}
						itemWidth={WINDOW_WIDTH}
						windowSize={WINDOW_WIDTH}
						sliderWidth={WINDOW_WIDTH}
						itemHeight={200}
						sliderHeight={200}
						data={slide}
						renderItem={CarouselItem}
						pagingEnabled
					/>
					<Pagination activeDotIndex={activeSlide} dotsLength={slide.length} />
				</View>
				<BrandsList />
				<ShopsList />
				<ProductsList title={STRINGS.popularProducts} />
				<ProductsList title={STRINGS.productsOnSale} sort={"price_down"} />
				<NewsList />
				<ProductsList title={"Недавно добавленные"} sort="recently" />
				<RedItem />
				<RedItem />
			</ScrollView>
		</View>
	);
};

export default HomeView;
