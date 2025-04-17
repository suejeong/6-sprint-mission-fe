"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ArticleList({
  flex,
  companies,
  fields,
  unitSuffixes = [],
}) {
  const router = useRouter();

  const handleDetail = (companyId) => {
    router.push(`/article/${companyId}`);
  };

  return (
    <div className="rounded-[4px] overflow-hidden">
      <ul className="[&_*]:text-gray100 [&_*]:text-sm [&>li]:bg-black300">
        {companies?.map((company, index) => {
          return (
            <li
              key={index}
              className="flex items-center  min-h-16 border-b last:border-b-0  hover:cursor-pointer hover:bg-[#2a2a2a] "
              style={{ borderBottomColor: "#4B4B4B" }}
              onClick={() => handleDetail(company.id)}
            >
              <p
                className={`${flex[0]} flex items-center justify-center font-normal`}
              >
                {company.rank}위
              </p>

              {fields.map((field, idx) => {
                const isSecondOrThirdColumn = idx === 0 || idx === 1;
                let value = company[field];

                if (
                  [
                    "viewTotalInvestAmount",
                    "totalInvestment",
                    "totalProfit",
                  ].includes(field)
                ) {
                  value = ChangeToNumber(value);
                }

                return (
                  <p
                    key={idx}
                    className={`
        ${isSecondOrThirdColumn ? "text-left" : "text-center"}
        ${flex[idx + 1]}
        ${idx === 0 ? "flex items-center gap-x-3 " : ""}
        font-normal
        line-clamp-2
        overflow-hidden
        text-ellipsis
      `}
                  >
                    {idx === 0 && (
                      <img
                        src={getCompanyImage(company[field])}
                        alt="기업이미지"
                        className="size-8 rounded-full object-cover ml-4"
                      />
                    )}
                    {value}
                    {unitSuffixes[idx]}
                  </p>
                );
              })}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
