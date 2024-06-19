import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { tokendata } from '../utils/user'
function Provider(props) {
    const { Components } = props
    const navigate = useNavigate()

    useEffect(() => {
        if (!tokendata()) {
            navigate("/login");
        } else {
            navigate("/");
        }

    }, [tokendata()])

    return (
        <Components />
    )
}

export default Provider