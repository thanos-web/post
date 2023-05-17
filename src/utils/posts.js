import dayjs from "dayjs";
import 'dayjs/locale/ru';

export const isLiked = (likes, userId) => likes?.some(id => id === userId)

export function formattedDate(date) {
    const data = dayjs(date).format("DD MMM YYYY");
    return data.replace('.', "");
}