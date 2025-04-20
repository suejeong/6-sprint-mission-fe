export const CommentMocks = [
    {
        content: '가격 조금만 더 내려주실 수 있나요?',
        articleId: 1,
    },
    {
        content: '직거래는 어디서 가능할까요?',
        articleId: 1,
    },
    {
        content: '사진 추가 가능할까요?',
        articleId: 2,
    },
    {
        content: '상태 실사용감 많은가요?',
        articleId: 3,
    },
    {
        content: '오늘 바로 거래 가능할까요?',
        articleId: 4,
    },
    {
        content: '내일 오후에 시간 괜찮으세요?',
        articleId: 5,
    },

    // 👉 articleId: 6 ~ 20, 각 3개씩
    ...Array.from({ length: 15 }, (_, i) => {
        const articleId = i + 6;
        return [
            {
                content: `이 게시글 관심 있는데 문의드려요. (${articleId})`,
                articleId,
            },
            {
                content: `상세 설명 조금만 더 부탁드려요. (${articleId})`,
                articleId,
            },
            {
                content: `실사용 기간이 얼마나 되나요? (${articleId})`,
                articleId,
            },
        ];
    }).flat()
];
