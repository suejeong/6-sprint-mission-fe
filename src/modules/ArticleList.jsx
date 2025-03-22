import { useState } from "react";
import { getArticles } from "../api/articles.api";

export function ArticleList() {
    const [list , setList ] = useState();
    const [loading, setLoading ] = useState(false);


    const handleRefresh = async () => {
        // e.preventDefault(); form 안에서 submit 이벤트를 막기 위해 쓰는 것이므로 여기서는 안해도 된다
        setLoading(true); // 상태를 true로 바꿔서 게시글 로딩 중에 버튼을 중복 클릭하는 것을 방지
    }
    return(
        <div>
            <div>
                <button type="button" disabled={loading} onClick ="{handleRefresh}">
                    { loading ? '게시글 로드 중..' : '새로고침'}
                </button>
            </div>
        </div>
    );
}
