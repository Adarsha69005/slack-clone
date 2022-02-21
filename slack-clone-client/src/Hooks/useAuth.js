import React, { useState, createContext, useContext, useEffect } from 'react';

export const useAuth = () => {

    let authed = false;

    const token = localStorage.getItem('token');
    const refreshToken = localStorage.getItem('refreshToken');

    if(token) {
        authed = true;
    }

    return authed


}

