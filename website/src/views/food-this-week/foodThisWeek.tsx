import React, { useEffect, useState } from 'react'
import {observer} from 'mobx-react-lite';
import FoodList from '../../components/food-list/food-list.component';
import { useStore } from './../../store/rootStore';
import './foodThisWeek.styles.scss';
import { Category, IFood } from '../../models/food';
import { MDBInput, MDBModal } from 'mdb-react-ui-kit';
import FoodChangeModal from '../../components/food-change-modal/food-change-modal.compenent';


const FoodThisWeek = () => {
    const {foodStore} = useStore();
    const {foodThisWeek} = foodStore;
    const {appStore} = useStore();
    const [foodChangeModalState, setFoodChangeModalState] = useState(false);
    // const [selectedFoodIdToChange, setSelectedFoodIdToChange] = useState<number>();
    
    useEffect(()=> {
        return () => {
            foodStore.saveFoodThisWeek();
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [foodStore, foodThisWeek]);

    const onQuantityForCategoryChange = (e: React.ChangeEvent<HTMLInputElement>, category: Category) => {
        const newQuantity = +e.target.value;
        const minQuantityAllowed = +e.target.min;
        const maxQuantityAllowed = +e.target.max;
        if (newQuantity > maxQuantityAllowed || newQuantity < minQuantityAllowed) {
            //TODO: prevent the user from typing out-of-range value.
            e.preventDefault();
            return;
        };
        foodStore.setQuantityForCategory(category, newQuantity);
        const newFood = foodStore.getRandomFoodForCategory(category, newQuantity);
        foodStore.updateFoodThisWeek(newFood, category);
    }

    window.onbeforeunload = (event) => {
        if(foodStore.foodThisWeek !== null ) {
            foodStore.saveFoodThisWeek(); //TODOL await?
        }
    };

    const onFoodChangeBtnClickedHandler = (foodId: number) => {
        foodStore.setTargetFoodIdToChange(foodId);
        toggleFoodChangeModalState();
    }

    const toggleFoodChangeModalState = () => setFoodChangeModalState(!foodChangeModalState);
    
    const foodToDisplay = foodStore.availableFoodCategories.map(foodCategory =>  {
        console.log(foodCategory);
        const foodThisWeekUnderCategory = foodThisWeek !== null ? foodThisWeek!.filter(food => food.category === foodCategory.category) : [];
        return (
            <div key={foodCategory.category}>
                <div style={{display: "flex", }}>
                    <h3 className="me-3 my-auto">{foodCategory.category}</h3>
                    <MDBInput label={foodThisWeekUnderCategory.length.toString()} id='formControlSm' type='number' min={1} max={6} size='sm'
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onQuantityForCategoryChange(e, foodCategory.category)}/>
                </div>
                {

                    foodThisWeekUnderCategory.length > 0 && foodThisWeekUnderCategory !== undefined 
                    ? <FoodList 
                        key={foodCategory.category} 
                        foodList={foodThisWeekUnderCategory}
                        enableViewDetails
                        enableFoodChange
                        onFoodChangeBtnClicked={onFoodChangeBtnClickedHandler}
                      />
                    : "Loading"
                }
        
            <MDBModal
                staticBackdrop={true} 
                show={foodChangeModalState} 
                getOpenState={(e: any) => setFoodChangeModalState(e)} tabIndex='-1'>
                <FoodChangeModal 
                    // selectedFoodIdToChange={selectedFoodIdToChange!}
                    foodAvailableForChange={
                        foodStore.getAllFoodThisWeek()
                            .filter(eachFoodInAllFood => eachFoodInAllFood.category === foodStore.getFoodForId(foodStore.targetFoodToChangeId)?.category )
                            .filter(eachFoodInAllFood => 
                                !foodThisWeek?.some(eachFoodInFoodThisWeek => eachFoodInFoodThisWeek.id === eachFoodInAllFood.id)
                            )}
                    toggleShow={toggleFoodChangeModalState}
                    />
            </MDBModal>
            </div>
            
        )}    
    )

    return (
        <div className="food-list-container">
            {foodToDisplay}
        </div>
    )
}

export default observer(FoodThisWeek);
