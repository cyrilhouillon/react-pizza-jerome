import { AUTH_TOKEN } from "./constant";

export const getToken = () => {
    return localStorage.getItem(AUTH_TOKEN);
};

export const setToken = (token) => {
    if (token) {
        localStorage.setItem(AUTH_TOKEN, token);
    }
};

export const removeToken = () => {
    localStorage.removeItem(AUTH_TOKEN);
};

export const getPizzas = () => {
    return localStorage.getItem("pizzas");
};

export const setPizzas = (pizzas) => {
    if (pizzas) {
        localStorage.setItem("pizzas", JSON.stringify(pizzas));
    }
}
export const removePizzas = () => {
    localStorage.removeItem("pizzas");
};

export const setRole = (role) => {
    localStorage.setItem("role", role);
}

export const getRole = () => {
    return localStorage.getItem("role"); 
};

export const removeRole = () => {
    localStorage.removeItem("role");
};

