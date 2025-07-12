import axios from "axios";

const API_URL = "http://localhost:8080/api/reviews";

export const submitReview = (review) => axios.post(API_URL, review);
export const fetchReviews = () => axios.get(API_URL);
