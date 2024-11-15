export const getRoomId = (userId1, userId2) => {
    const sortedIds = [userId1,userId2].sort();
    const roomId = sortedIds.join('-');
    return roomId
}

export const apikey = "AIzaSyD3qYV4aTbteIixVoXp06yDyOyPtWENPfk"
