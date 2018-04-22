export default function updateRating(rating=0){
    return {
        type: "UPDATE_RATING",
        rating
    }
}
