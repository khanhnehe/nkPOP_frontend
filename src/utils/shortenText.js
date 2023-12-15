// Hàm rút ngắn văn bản
export const shortenText = (text, n) => {
    // Kiểm tra nếu độ dài của văn bản lớn hơn ngưỡng n
    if (text.length > n) {
        // Rút ngắn văn bản bằng cách lấy các ký tự từ đầu đến vị trí n
        // và sau đó thêm vào chuỗi "..." để chỉ ra rằng văn bản đã được rút ngắn
        const shortenedText = text.substring(0, n).concat("...");
        // Trả về văn bản đã được rút ngắn
        return shortenedText;
    }
    // Trả về văn bản nguyên bản nếu độ dài không vượt quá ngưỡng n
    return text;
};

// 2:28phuts