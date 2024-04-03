import { SweetAlert } from "./SweetAlert";
import { SweetAlertError } from "./SweetAlert";
import axios from "axios";

async function fetchData(category, setCategoryNotes) {
    const token = JSON.parse(localStorage.getItem("nameAndToken"))?.token;
    const response = await axios({
        method: "get",
        url: `http://localhost:5001/notes/${category}`,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    setCategoryNotes(response.data.data);
}

async function handleDelete(currentId, setAnyChange) {
    const token = JSON.parse(localStorage.getItem("nameAndToken"))?.token;
    await axios({
        method: "delete",
        url: `http://localhost:5001/notes/delete/?id=${currentId}`,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    setAnyChange((prev) => !prev);
    SweetAlert("Note Deleted Successfully!");
}

async function handleMultiDelete(setAnyChange, multiDeleteNotes) {
    const token = JSON.parse(localStorage.getItem("nameAndToken"))?.token;
    await axios({
        method: "delete",
        url: `http://localhost:5001/notes/delete`,
        headers: {
            Authorization: `Bearer ${token}`,
        },
        data: multiDeleteNotes,
    });
    setAnyChange((prev) => !prev);
    SweetAlert("Notes Deleted Successfully!");
}

async function handleHide(currentId, setAnyChange) {
    const token = JSON.parse(localStorage.getItem("nameAndToken"))?.token;
    await axios({
        method: "put",
        url: `http://localhost:5001/notes/hide/?id=${currentId}`,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    setAnyChange((prev) => !prev);
}

async function addTaskApiCall(title, description) {
    const token = JSON.parse(localStorage.getItem("nameAndToken"))?.token;
    const response = await axios({
        method: "post",
        url: `http://localhost:5001/notes/upload`,
        headers: {
            Authorization: `Bearer ${token}`,
        },
        data: { title, description },
    });
    if (response.data.message === 'EXISTS') {
        SweetAlertError("Title Is Already Exists!");
    }
}
async function updateTaskApiCall(title, description, id) {
    const token = JSON.parse(localStorage.getItem("nameAndToken"))?.token;
    const response = await axios({
        method: "put",
        url: `http://localhost:5001/notes/update/?id=${id}`,
        headers: {
            Authorization: `Bearer ${token}`,
        },
        data: { title, description },
    });
    if (response.data.message === 'EXISTS') {
        SweetAlertError("Title Is Already Exists!");
    }
}

async function loginUser(email, password, setAnyChange) {
    const response = await axios({
        method: 'post',
        url: `http://localhost:5001/users/login`,
        data: { email, password }
    });
    if (response.data.message === "MISSING") {
        SweetAlertError('All Fields Are Mandatory!');
        return 0;
    }
    else if (response.data.message === "NOT REGISTERED") {
        SweetAlertError('Your Are Not Registered');
        return 0;
    }
    else if (response.data.message === "UNMATCHED") {
        SweetAlertError('Email or Password is Wrong');
        return 0;
    }
    else if (response.data.accessToken) {
        localStorage.setItem("nameAndToken", JSON.stringify({ token: response.data.accessToken, name: response.data.name }));
        setAnyChange(prev => !prev);
        SweetAlert("Loggin Successfully!");
        return 1;
    }
}

async function registerUser(name, email, phone, password) {
    const response = await axios({
        method: 'post',
        url: `http://localhost:5001/users/register`,
        data: { name, email, phone, password }
    });

    if (response.data.message === "EXISTS") {
        SweetAlertError("User Is Already Exists!");
        return 0;
    }
    if (response.data.message === "MISSING") {
        SweetAlertError("All Fields Are Mandatory!");
        return 0;
    }
    return 1;
}

async function searchItems(searchValue, setCategoryNotes) {
    const token = JSON.parse(localStorage.getItem("nameAndToken"))?.token;
    const response = await axios({
        method: 'get',
        url: `http://localhost:5001/notes/get-notes/?search=${searchValue}`,
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    setCategoryNotes(response.data.data);
}

export {
    fetchData,
    handleDelete,
    handleMultiDelete,
    handleHide,
    addTaskApiCall,
    updateTaskApiCall,
    loginUser,
    registerUser,
    searchItems,
};
