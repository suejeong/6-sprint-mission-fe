import { useEffect, useState } from "react";
import { getArticles } from "../api/articles.api";

export function ArticleList() {
    const [articles , setArticles ] = useState([]);
    
    useEffect(()=>{
            const fetchArticles = async() =>{
        try {
            const data = await getArticles();
            setArticles(data);
        } catch (e) {
            console.error(e);
            alert("서버 에러")
        }
    }
        fetchArticles();
    },[]) // 처음 한 번만 실행되는 코드, 의존성 배열에 아무것도 없으므로 '처음 마운트 될 때만 실행'
    
    return(
        <div>
            <h2>게시글 목록</h2>
            <div>
                <ul>
                    {articles.map((article) => (
                        <li key={article.id}>
                            <h3>[ {article.id}번 ]</h3>
                            <h2>타이틀 : {article.title}</h2>
                            <h3>내용</h3>
                            <p>{article.content}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}


export default ArticleList;
