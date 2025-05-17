"use client";

import React, { useState, useRef } from 'react'
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

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [message, setMessage] = useState("");

    const [selectedFiles, setSelectedFiles] = useState([]);
    const [response, setResponse] = useState(null);

    const tagInputRef = useRef(null); // 태그 입력 필드 참조 생성

    // 파일 선택 핸들러
    const handleFileChange = (e) => {
        setSelectedFiles(Array.from(e.target.files)); // FileList → 배열로 변환
    };

    // 업로드 요청 핸들러
    const handleUpload = async () => {
        if (selectedFiles.length === 0) {
            alert("파일을 선택해주세요.");
            return;
        }

        const formData = new FormData();
        // 서버에서 expect하는 name: 'images'
        selectedFiles.forEach((file) => {
            formData.append("images", file);
        });

        try {
            const res = await fetch("http://localhost:3000/files", {
                method: "POST",
                body: formData, // 헤더 설정 필요 없음. fetch가 자동 처리
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "업로드 실패");
            }

            console.log("✅ 업로드 결과:", data);
            setResponse(data); // 서버 응답 저장

        } catch (err) {
            console.error("❌ 업로드 실패:", err.message);
            alert("업로드 중 오류가 발생했습니다.");
        }
    };


    const handleKeyDown = (e) => {
        if (e.isComposing) return;
        if (e.key === 'Enter' && input.trim()) {
            e.preventDefault(); // 기본 동작 방지
            e.stopPropagation(); // 이벤트 전파 방지

            console.log("태그 추가 시도:", input);
            const formatted = `#${input.trim()}`;

            if (!tags.includes(formatted)) {
                setTags([...tags, formatted]);
            }

            setInput('');
            tagInputRef.current?.focus(); // 태그 입력 필드에 포커스 유지
        }
    };

    const handleRemove = (tagToRemove) => {
        setTags(tags.filter(tag => tag !== tagToRemove));
    }



    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/product`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, description, price: Number(price), tags })
        });

        if (res.ok) {
            const result = await res.json();
            router.push(`/items/${result.id}`);
        } else {
            alert("등록 실패");
        }
    }

    return (
        <ArticleLayout>
            <PageLayout>
                <form onSubmit={(e) => {
                    if (document.activeElement === targetInputRef.current) {
                        e.preventDefault(); // Enter 키가 태그 입력 필드에서 눌렸을 때 폼 제출 방지
                        return;
                    }
                    handleSubmit(e);
                }}>
                    <div className="flex justify-between items-center mb-5">
                        <H2Title className="flex-1">상품 등록하기</H2Title>
                        <BtnPrimarySmall type="submit">등록</BtnPrimarySmall>
                    </div>
                    {/* <div>
                        <div>이미지 업로드</div>
                        <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleFileChange}
                        />
                        <button
                            onClick={handleUpload}
                            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
                        >
                            업로드하기
                        </button>
                        {response && (
                            <div className="mt-6">
                                <h3 className="font-semibold mb-2">업로드된 파일 목록</h3>
                                <ul className="list-disc pl-6">
                                    {response.files.map((file, index) => (
                                        <li key={index}>
                                            {file.originalName} → <code>{file.filename}</code>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                    </div> */}
                    <WriteInput
                        name="name"
                        type="text"
                        value={name}
                        placeholder="상품명을 입력해 주세요"
                        onChange={(e) => setName(e.target.value)}
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
                        ref={tagInputRef} // 태그 입력 필드에 ref 연결
                        type="text"
                        name="tags"
                        value={input}
                        placeholder="태그를 입력해 주세요"
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
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

