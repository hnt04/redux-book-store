import api from "../../apiService.js";
import { fetchBookAPI } from "./fetchBookAPI.js";
import { createSlide, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
    books: [],
    readingList: [],
    bookDetail: null,
    status: null,
}

export const addToFavList = createAsyncThunk(
    'books/addToFavList',
    async(book) => {
        const res = await api.post(`/favorites`, book)
        return res.data;
    }
);

export const getFavList = createAsyncThunk(
    'books/getFavList',
    async() => {
        const res = await api.post(`/favorites`)
        return res.data;
    }
);

export const removeList = createAsyncThunk(
    'books/removeList',
    async(removeBookId) => {
        const res = await api.post(`/favorites/${removeBookId}`)
        return res.data;
    }
);

export const getBookDetail = createAsyncThunk(
    "book/getBookDetail",
    async (bookId) => {
      const res = await api.get(`/books/${bookId}`);
      return res.data;
    }
);

export const fetchData = createAsyncThunk(
    'books/fetchData',
    async (props) => {
        const res = await fetchBookAPI(props)
        return res.data;
    }
);

export const bookSlice = createSlide({
    name: "book",
    initialState,
    extraReducer: (builder) => {
        builder
        .addCase(fetchData.pending, (state) => {
            state.status = "loading";
        })
        .addCase(fetchData.fulfill,(state,action) => {
            state.status = null;
            state.books = action.payload;
        })
        .addCase(fetchData.reject,(state,action) => {
            state.status = "failed";
        })

        builder
        .addCase(addToFavList.pending, (state) => {})
        .addCase(addToFavList.fulfill, (state,action) => {
            console.log(action.payload)
            state.status = null;
            toast.success("The book has been added!");
        })
        .addCase(addToFavList.reject, (state,action) => {
            toast.error(action.error.message);
        });
        
        builder
        .addCase(getFavList.pending, (state) => {
            state.status = "pending";
        })
        .addCase(getFavList.fulfill, (state,action) => {
            state.status = null;
            state.readingList = action.payload;
        })
        .addCase(getFavList.reject, (state,action) => {
            state.status = "failed";
        });

        builder
        .addCase(removeList.pending, (state) => {
            state.status = "pending";
        })
        .addCase(removeList.fulfill, (state,action) => {
            state.status = null;
            toast.success("The book has been removed!"); 
        })
        .addCase(removeList.reject, (state,action) => {
            state.status("Remove failed!");
        });

        builder
        .addCase(getBookDetail.pending, (state) => {
            state.status = "pending";
        })
        .addCase(getBookDetail.fulfill, (state,action) => {
            state.status = null;
            state.bookDetail = action.payload;
        })
        .addCase(getBookDetail.reject, (state,action) => {
            state.status("Remove failed!")
        });
    },
});

export default bookSlice.extraReducer;