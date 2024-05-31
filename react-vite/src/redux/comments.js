//action type constants

export const CREATE_COMMENT ='CREATE REVIEW'
export const UPDATE_COMMENT = 'UPDATE COMMENT'

//action creators

export const createComment = (newComment) => ({
    type: CREATE_COMMENT,
    payload: newComment    
})

export const updateComment = (comment) => ({
    type: UPDATE_COMMENT,
    payload: comment
})

export const createCommentThunk = (newCommentData, dishId) => async(dispatch) => {
    const res = await fetch(`/api/dishes/${dishId}/comments/new`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }, 
        body: JSON.stringify(newCommentData)
    })
    if (res.ok) {
        const newComment = await res.json()
        dispatch(createComment(newComment))
        return newComment
    } else {
        const errors = await res.json()
        return errors 
    }

}

export const updateReviewThunk = (comment) => async (dispatch) => {
    const res = await fetch(`/api/comments/${comment.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(comment)
    })
    if (res.ok) {
        const comment = await res.json()
        dispatch(updateComment(comment))
        return comment
    } else {
        const errors = await res.json()
        return errors
    }

}

// reducer 

const commentReducer = (state = {}, action) => {
    switch (action.type) {
        case CREATE_COMMENT: {
            const newState = {}
            newState[action.payload.id] = action.payload
            return {...state, ...newState}
        }
        default: 
            return state
    } 
}

export default commentReducer