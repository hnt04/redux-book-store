import api from "../../apiService.js";

export const fetchBookAPI = async({ page, limit, q }) => {
        try {
            let bookURL = `/books?_page=${page}&_limit=${limit}`;
            if (q) bookURL += `&q=${q}`;
            const res = await api.get(bookURL);
            return res;
          } catch (error) {
            return error;
          }
        }

