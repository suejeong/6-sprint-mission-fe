"use client";

import React, { useEffect, useState } from 'react'
import axios from 'axios';
import PageLayout from '@/components/common/PageLayout'
import WriteReply from '@/components/ui/article/detail/WriteReply'
import CommentList from '@/components/ui/article/detail/CommentList'
import { useParams } from 'next/navigation';
import ItemBox from '@/components/ui/item/ItemBox';
import { useRouter } from 'next/navigation';
import BtnPrimaryBig from '@/components/common/BtnPrimaryBig';


function page() {
    const { id } = useParams();
    const [product, setProduct] = useState({});
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/product/${id}`);

                if (!res.ok) throw new Error('상품 정보를 불러오지 못했습니다');

                const data = await res.json(); // JSON 파싱
                setProduct(data); // 상태에 저장
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
        fetchProduct();
    }, [id])

    return (
        <PageLayout>
            <ItemBox product={product} />
            <WriteReply />
            {/* <CommentList comments={comments} id={id} /> */}
            <div className="flex justify-center mt-10">
                <BtnPrimaryBig type="button" px="px-8" onClick={() => router.back()}>목록으로 돌아가기</BtnPrimaryBig>
            </div>
        </PageLayout>
    )
}

export default page