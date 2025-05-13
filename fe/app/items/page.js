"use client";

import React from 'react'
import axios from 'axios';
import H2Title from '@/components/common/H2Title'
import ItemBoxList from '@/components/ui/item/ItemBoxList'
import PageLayout from '@/components/common/PageLayout'

import { useEffect, useState } from "react";
import Search from '@/components/ui/article/Search';
import Sorting from '@/components/ui/article/Sorting';
import BtnPrimarySmall from '@/components/ui/article/BtnPrimarySmall';
import { useRouter } from 'next/navigation';

export default function MarketPage() {

    const [products, setProducts] = useState({ recent: [], favorite: [] });
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const [recentRes, favoriteRes] = await Promise.all([
                    axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/products?orderBy=recent`),
                    axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/products?orderBy=favorite`)
                ]);

                setProducts({
                    recent: recentRes.data.list,
                    favorite: favoriteRes.data.list
                });
            } catch (e) {
                console.error(e);
                alert("서버 에러 입니다")
            } finally {
                setLoading(false);
            }
        }
        fetchProducts();
    }, [])

    return (
        <PageLayout>
            <H2Title>베스트 상품</H2Title>
            <ItemBoxList products={products.recent} section="best" num="3" />
            <div className="flex justify-between gap-2 items-center mb-6">
                <Search />
                <BtnPrimarySmall onClick={() => router.push(`/items/write`)}>상품 등록하기</BtnPrimarySmall>
                <Sorting />
            </div>
            <H2Title>판매 중인 상품</H2Title>
            <ItemBoxList products={products.favorite} section="recent" />
        </PageLayout>
    )
}

