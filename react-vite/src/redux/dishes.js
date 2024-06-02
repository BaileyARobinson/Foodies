// action type constants

export const LOAD_DISHES = 'LOAD_DISHES'
export const LOAD_DISH = 'LOAD_DISH'
export const CREATE_DISH = 'CREATE_DISH'

// action creators 

export const loadDishes = (dishes) => ({
    type: LOAD_DISHES, 
    payload: dishes,
})

export const loadDish = (dish) => ({
    type: LOAD_DISH,
    payload: dish,
})

export const createDish = (dish) => ({
    type: CREATE_DISH,
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

export const createDishThunk = (newDishData) => async (dispatch) => {
    console.log(newDishData)
    const res = await fetch('/api/dishes/new', {
        method: 'POST',
        body: newDishData
    })
    if (res.ok) {
        const { newDish } = await res.json()
        dispatch(createDish(newDish))
    } else {
        const errors = await res.json()
        return errors 
    }

}

// reducer 

const dishesReducer = (state = {}, action) => {
    let newState={}
    switch(action.type) {
        case LOAD_DISHES: {
            return {...state,  ...action.payload}
        } case LOAD_DISH: {
            return {...state, ...action.payload}
        } case CREATE_DISH: {
            newState[action.payload.id] = action.payload
            return {...state, ...newState}
        }
        default:
            return state;
    } 
    

}

export default dishesReducer