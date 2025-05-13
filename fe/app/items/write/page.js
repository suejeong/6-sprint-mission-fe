"use client";

import React, { useState } from 'react'
import H2Title from '@/components/common/H2Title'
import { useRouter } from 'next/navigation';
import WriteInput from '@/components/common/WriteInput';
import ArticleLayout from '@/app/article/layout';
import PageLayout from '@/components/common/PageLayout';
import BtnPrimarySmall from '@/components/ui/article/BtnPrimarySmall';



export default function Page() {

    const router = useRouter();
    const [input, setInput] = useState('');
    const [tags, setTags] = useState([]);
    const [isSummiting, setIsSummiting] = useState(false);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [message, setMessage] = useState("");

    const handleKeyUp = (e) => {
        if (e.isComposing) return;
        if (e.key == 'Enter' && input.trim()) {
            e.preventDefault();
            console.log("태그 추가 시도:", input);
            const formatted = `#${input.trim()}`;

            if (!tags.includes(formatted)) {
                setTags([...tags, formatted]);
            }

            setInput('');
        }
    }

    const handleRemove = (tagToRemove) => {
        setTags(tags.filter(tag => tag !== tagToRemove));
    }



    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/product`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title, description, price, tags })
        });

        if (res.ok) {
            const result = await res.json();
            router.push(`/products/${result.id}`);
        } else {
            alert("등록 실패");
        }
    }



    // const handleCloseModal = () => {
    //     setIsOpen(false);
    //     if (comment === "회원가입 성공") {
    //         router.push("/items");
    //     }
    // };

    return (
        <ArticleLayout>
            <PageLayout>
                <form action={handleSubmit} onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit();
                }}>
                    <div className="flex justify-between items-center mb-5">
                        <H2Title className="flex-1">상품 등록하기</H2Title>
                        <BtnPrimarySmall type="submit">등록</BtnPrimarySmall>
                    </div>
                    <WriteInput
                        name="title"
                        type="text"
                        value={title}
                        placeholder="상품명을 입력해 주세요"
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                    <h3 className="mb-3 font-[700] text-lg mt-6">상품 소개</h3>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="상품 소개를 입력해주세요" className="bg-[#F3F4F6] w-full min-h-60 p-6 flex mb-5 text-left align-top rounded-xl  text-[16px]" required />
                    <WriteInput
                        name="price"
                        type="number"
                        value={price}
                        placeholder="판매 가격을 입력해 주세요"
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />
                    <WriteInput
                        type="text"
                        title="태그"
                        value={input}
                        placeholder="태그를 입력해 주세요"
                        onChange={(e) => setInput(e.target.value)}
                        onKeyUp={handleKeyUp}
                    />
                    {tags.length > 0 &&
                        (
                            <div className="flex gap-1">
                                {tags.map((tag, index) => (
                                    <span key={index} className=" bg-blue-200 px-1 py-0.5 items-center flex gap-1 rounded" >
                                        {tag}
                                        <button className="rounded bg-white cursor-pointer  w-4 h-4 flex items-center  justify-center" onClick={() => handleRemove(tag)}>&times;</button>
                                    </span>
                                ))}
                            </div>
                        )
                    }
                </form>
            </PageLayout>
        </ArticleLayout>
    )
}

