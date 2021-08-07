import { createContext, useContext } from "react";
import AppStore from "./appStore";
import FoodStore from "./foodStore";
import ToBuyListStore from "./toBuyListStore";

interface RootStore {
    foodStore: FoodStore;
    appStore: AppStore;
    toBuyListStore: ToBuyListStore;
}

export const store: RootStore = {
    appStore: new AppStore(),
    foodStore: new FoodStore(),
    toBuyListStore: new ToBuyListStore()
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext)
}