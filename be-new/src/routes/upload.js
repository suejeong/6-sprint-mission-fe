import express from "express";
import multer from "multer";
const app = express();

const upload = multer({ dest: "uploads/" });

// 다중 이미지 업로드 라우트
app.post("/files", upload.array("images", 5), (req, res) => {
    // 5개까지 허용, "images"는 input의 name 속성
    if (!req.files || req.files.length === 0) {
        return res.status(400).json({ message: "업로드된 파일이 없습니다." });
    }

    // 업로드된 파일 정보
    const uploadedFiles = req.files.map(file => ({
        originalName: file.originalname,
        filename: file.filename,
        path: file.path
    }));

    res.json({
        message: "파일 업로드 완료",
        files: uploadedFiles
    });
});

// 에러 핸들링 미들웨어
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({
        message: "파일 업로드 중 오류 발생",
        error: err.message
    });
});

app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});