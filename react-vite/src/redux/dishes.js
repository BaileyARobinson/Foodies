// action type constants

export const LOAD_DISHES = 'LOAD_DISHES'
export const LOAD_DISH = 'LOAD_DISH'
export const CREATE_DISH = 'CREATE_DISH'
export const USER_DISHES = 'USER_DISHES'
export const UPDATE_DISH = 'UPDATE_DISH'

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

export const usersDishes = (dishes) => ({
    type: USER_DISHES,
    payload: dishes
})

export const updateDish = (dish) => ({
    type: UPDATE_DISH,
    payload: dish
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
    const res = await fetch('/api/dishes/new', {
        method: 'POST',
        body: newDishData
    })
    if (res.ok) {
        const newDish = await res.json()
        dispatch(createDish(newDish))
        return newDish
    } else {
        const errors = await res.json()
        return errors 
    }

}

export const usersDishesThunk = () => async (dispatch) => {
    const res = await fetch('/api/dishes/current')
    if (res.ok) {
        const dishes = await res.json() 
        console.log(dishes)
        const normalizedDishes = {}
        dishes.forEach((dish) => normalizedDishes[dish.id] = dish)
        dispatch(usersDishes(normalizedDishes))
        return dishes 
    } else {
        const errors = await res.json()
        return errors
    }
}

export const updateDishThunk = (updatedDishData, id) => async (dispatch) => {
    const res = await fetch(`/api/dishes/${id}/update`, {
        method: 'PUT',
        body: updatedDishData
    }) 
    if (res.ok) {
        const updatedDish = res.json()
        dispatch(updateDish(updatedDish))
        return updatedDish
    } else {
        const errors = await res.json()
        return errors
    }
}
export const updateDishWOAWSThunk = (updateDishData, id) => async (dispatch) => {
    const res = await fetch(`/api/dishes/${id}/noaws/update`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateDishData)
    })
    if (res.ok) {
        const updateDish = res.json()
        dispatch(updateDish(updateDish))
        return updateDish
    } else {
        const errors = await res.json()
        return errors
    }
}

// reducer 

const dishesReducer = (state = { allDishes: {}, dishesByUser: {}, dish: {} }, action) => {
    switch(action.type) {
        case LOAD_DISHES: {
            return {...state,  allDishes: {...action.payload}}
        } case LOAD_DISH: {
            return {...state, dish:{...action.payload}}
        } case CREATE_DISH: {
            newState[action.payload.id] = action.payload
            return {...state, ...newState}
        } case USER_DISHES: {
            return {...state, dishesByUser: {...action.payload}}
        } case UPDATE_DISH: {
            newState[action.payload.id] = action.payload
            return {...state, ...newState}
        }
        default:
            return state;
    } 
    

}

export default dishesReducer