//action type constants

export const CREATE_COMMENT ='CREATE REVIEW'
export const UPDATE_COMMENT = 'UPDATE COMMENT'
export const USER_COMMENTS = 'USER_COMMENTS'
export const DELETE_COMMENT = 'DELETE_COMMENT'

//action creators

export const createComment = (newComment) => ({
    type: CREATE_COMMENT,
    payload: newComment    
})

export const updateComment = (comment) => ({
    type: UPDATE_COMMENT,
    payload: comment
})

export const userComments = (comments) => ({
    type: USER_COMMENTS,
    payload: comments
})

export const deleteComment = (id) => ({
    type: DELETE_COMMENT,
    payload: id 
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

export const updateCommentThunk = (comment, comment_id) => async (dispatch) => {
    const res = await fetch(`/api/comments/${comment_id}/update`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(comment)
    })
    console.log(res)
    if (res.ok) {
        const updatedComment = await res.json()
        console.log(updatedComment)
        dispatch(updateComment(updatedComment))
        return updatedComment
    } else {
        const errors = await res.json()
        return errors
    }

}

export const usersCommentsThunk = () => async (dispatch) => {
    const res = await fetch(`/api/comments/current`)
    if (res.ok) {
        const comments = await res.json();
        const normalizedComments = {}
        comments.forEach((comment) => normalizedComments[comment.id] = comment)
        dispatch(userComments(normalizedComments))
        return comments
    } else {
        const errors = await res.json()
        return errors 
    }
    
}

export const deleteCommentThunk = (id) => async (dispatch) => {
    const res = await fetch(`/api/comments/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (res.ok) {
        dispatch(deleteComment(id))
        return res.json({message: 'Successfully deleted'})
    } else {
        const errors = await res.json()
        return errors
    }

}

// reducer 

const commentReducer = (state = {}, action) => {
    let newState= {}
    switch (action.type) {
        case CREATE_COMMENT: {
            newState[action.payload.id] = action.payload
            return {...state, ...newState}
        } case UPDATE_COMMENT: {
            return {...state, [action.payload.id]: action.payload}
        } case USER_COMMENTS: {
            return {...state, ...action.payload}
        } case DELETE_COMMENT: {
            newState = {...state}
            delete newState[action.payload]
            return newState
        }
        default: 
            return state
    } 
}

export default commentReducer