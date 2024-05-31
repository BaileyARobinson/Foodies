import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
//import { deleteCommentThunk } from "../../redux/comments";
import { useState } from 'react'

function DeleteComment () {

    const dispatch = useDispatch()
    const { closeModal } = useModal()


    return (
        <h1>hello</h1>
    )

}

export default DeleteComment