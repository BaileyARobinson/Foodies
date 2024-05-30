// action type constants

export const LOAD_DISHES = 'LOAD_DISHES'
export const LOAD_DISH = 'LOAD_DISH'

// action creators 

export const loadDishes = (dishes) => ({
    type: LOAD_DISHES, 
    payload: dishes,
})

export const loadDish = (dish) => ({
    type: LOAD_DISH,
    payload: dish,
})

// thunk action creators 

export const getAllDishesThunk = () => async (dispatch) => {
    const res = await fetch('/api/dishes')
    if(res.ok) {
        const dishes = await res.json()
        const normalizedDishes = {};
        dishes.forEach((dish) => (normalizedDishes[dish.id] = dish))
        dispatch(loadDishes(normalizedDishes))
        return dishes
    } else {
        const errors = await res.json()
        return errors 
    }
}

export const getDishThunk = (id) => async (dispatch) => {

    
    const res = await fetch(`/api/dishes/${id}`)
    if (res.ok) {
        const dish = await res.json()
        dispatch(loadDish(dish))
        return dish
    } else {
        const errors = await res.json()
        return errors 
    }
}

// reducer 

const dishesReducer = (state = {}, action) => {
    switch(action.type) {
        case LOAD_DISHES: {
            return {...state,  ...action.payload}
        } case LOAD_DISH: {
            return {...state, ...action.payload}
        }
        default:
            return state;
    } 
    

}

export default dishesReducer