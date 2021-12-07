import React from 'react'
import { useHistory } from "react-router-dom";

// var history = useHistory();

export function getWithExpiry(key, email) {
    const itemStr = sessionStorage.getItem(key)
    // if the item doesn't exist, return null
    if (!itemStr) {
        return null
    }
    const item = JSON.parse(itemStr)
    const now = new Date()
    // compare the expiry time of the item with the current time
    if (now.getTime() > item.expiry) {
        // If the item is expired, delete the item from storage
        // and return null
        sessionStorage.removeItem(key)
        sessionStorage.removeItem(email)
        // useHistory.push('/');
        return null
    }
    return (item.value)
}